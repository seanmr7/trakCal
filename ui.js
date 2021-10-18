const UICtrl = (function() {
  // Define UI variables
  const uiSelectors = {
    itemList: '#item-list',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    userName: '#user-name', 
    userAge: '#user-age',
    userHeight: '#user-height', 
    userWeight: '#user-weight', 
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearAllBtn: '.clear-btn',
    addUserFormBtn: '.form-add-user-btn',
    addUserBtn: '.add-user-btn',
    changeUserbtn: '.change-user-btn',
    totalCalories: '.total-calories',
    userFormField: '.user-form-fields',
    itemFormField: '.item-form-fields',
    mealCard: '.meal-card',
    profileCard: 'profile-card',
    currentUserHeader: '.current-user',
    declineBtn: '.decline-profile-btn',
    editUserSubmitBtn: '.form-edit-user-btn',
    editUserBtn: '.edit-user-btn',
    deleteUserBtn: '.delete-user-btn',
    cancelUserSubmitBtn: '.cancel-user-btn',
    collectionHeader: '.collection-header',
    userNav: '.side-nav'
  }

  function populateItemList(items) {
    let output = '';
    
    items.forEach(item => {
      output += `
      <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
          </a>
        </li>`
    });

    document.querySelector(uiSelectors.itemList).innerHTML = output;
  }

  function addItemUI(item) {
    const itemUI = document.createElement('li');
    itemUI.classList.add('collection-item');
    itemUI.id = `item-${item.id}`
    itemUI.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>`;
    document.querySelector(uiSelectors.itemList).appendChild(itemUI);
  }

  function updateCalories(calories) {
    document.querySelector(uiSelectors.totalCalories).innerText = `${calories}`;
  }
  
  function getItemInput() {
    return {
      name: document.querySelector(uiSelectors.itemName).value,
      calories: document.querySelector(uiSelectors.itemCalories).value
    }
  }
  function clearItemInput() {
    document.querySelector(uiSelectors.itemName).value = ''
    document.querySelector(uiSelectors.itemCalories).value = ''
  }

  function getUISelectors() {
    return uiSelectors;
  }

  function editItemState(item) {
    // Hide Add Meal button
    document.querySelector(uiSelectors.addBtn).style.display = 'none';

    // Show Update Meal and Delete Meal buttons
    document.querySelector(uiSelectors.updateBtn).style.display = 'inline';
    document.querySelector(uiSelectors.deleteBtn).style.display = 'inline';
    document.querySelector(uiSelectors.backBtn).style.display = 'inline';
    
    // Update form fields with item name and calories
    document.querySelector(uiSelectors.itemName).value = `${item.name}`
    document.querySelector(uiSelectors.itemCalories).value = `${item.calories}`
  
  }

  function clearEditItemState() {
    clearItemInput();

    // Hide Update Meal and Delete Meal buttons
    document.querySelector(uiSelectors.updateBtn).style.display = 'none';
    document.querySelector(uiSelectors.deleteBtn).style.display = 'none';
    document.querySelector(uiSelectors.backBtn).style.display = 'none';

    // Display Add Meal button
    document.querySelector(uiSelectors.addBtn).style.display = 'inline';
  }


  // User UI methods
  function populateUserList(users, currentUser) {
    let output = ''
    users.forEach(user => {
      if(user.id === currentUser.id) {
        output += `
        <li>
          <a href="#!" id="user-${user.id}" class="collection-item active white-text user">
            <strong>${user.name}</strong> <em>Age: ${user.age} BMI: ${user.bmi}</em>
          </a>
        </li>`
      } else {
      output += `
      <li>
          <a href="#!" id="user-${user.id}" class="collection-item black-text user user-${user.id}">
            <strong>${user.name}</strong> <em>Age: ${user.age} BMI: ${user.bmi}</em>
          </a>
        </li>
      `
      }
    })
    document.querySelector(uiSelectors.collectionHeader).insertAdjacentHTML('afterend', output);
  }

  function getUserFormInput() {
    return {
      name: document.querySelector(uiSelectors.userName).value,
      age: document.querySelector(uiSelectors.userAge).value,
      height: document.querySelector(uiSelectors.userHeight).value,
      weight: document.querySelector(uiSelectors.userWeight).value
    }
  }

  function clearUserForm() {
      document.querySelector(uiSelectors.userName).value = '';
      document.querySelector(uiSelectors.userAge).value = '';
      document.querySelector(uiSelectors.userHeight).value = '';
      document.querySelector(uiSelectors.userWeight).value = '';
  }

  function updateUserHeader(input) {
    if(typeof input === 'string') {
      document.querySelector(uiSelectors.currentUserHeader).innerText = input;
      document.querySelector(uiSelectors.editUserBtn).style.display = 'none';
    } else {
      document.querySelector(uiSelectors.currentUserHeader).innerHTML = `
      Hi <b>${input.name}</b> <em>(Age: ${input.age}, Height: ${input.height}", Weight: ${input.weight} lb, BMI: ${input.bmi})</em>
      `;
      document.querySelector(uiSelectors.editUserBtn).style.display = '';
    }
  }

  function addUserUI(currentUser) {
    // Remove highlight from previous user
    updateNavHighlight(currentUser)

    // Create new user list item
    const li = `<li>
      <a href="#!" id="user-${currentUser.id}" class="collection-item active white-text user">
        <strong>${currentUser.name}</strong> <em>Age: ${currentUser.age} BMI: ${currentUser.bmi}</em>
      </a>
    <li>`

    // Insert list item before Add User button
    document.querySelector(uiSelectors.userNav).lastElementChild.insertAdjacentHTML('beforebegin', li);
  }

  function updateNavHighlight(currentUser) {
    const elements = Array.from(document.querySelector(uiSelectors.userNav).getElementsByTagName('a'));
    elements.forEach(element => {
      // Identify previous current user
      if(element.classList.contains('active')) {
        element.classList.remove('active');
        element.classList.remove('white-text');
        element.classList.add('black-text');
      }
      // Identify the list item containing the current user.
      if(Number(element.id.split('-')[1]) === currentUser.id) {
        element.classList.add('active');
        element.classList.add('white-text');
        element.classList.remove('black-text');
      }
    })
  }

  function updateUserUI(currentUser) {
    const elements = Array.from(document.querySelector(uiSelectors.userNav).getElementsByTagName('a'));
    elements.forEach(element => {
      // Identify the list item containing the current user.
      if(Number(element.id.split('-')[1]) === currentUser.id) {
        element.innerHTML = `<strong>${currentUser.name}</strong> <em>Age: ${currentUser.age} BMI: ${currentUser.bmi}</em>`
      }
    })
  }

  function deleteUserUI(currentUser) {
    const elements = Array.from(document.querySelector(uiSelectors.userNav).getElementsByTagName('a'));
    elements.forEach(element => {
      // Identify the list item containing the current user.
      if(Number(element.id.split('-')[1]) === currentUser.id) {
        element.remove();
      }
    })
  }

  function initialUserState() { 
    updateUserHeader(`You Haven't Made any Profiles`);
    // Hide Item input fields
    clearEditItemState();

    // Hide unused buttons
    document.querySelector(uiSelectors.editUserSubmitBtn).style.display = 'none';
    document.querySelector(uiSelectors.cancelUserSubmitBtn).style.display = 'none';
    document.querySelector(uiSelectors.deleteUserBtn).style.display = 'none';

  }

  function clearUserFormState(currentUser) {
    // Hide User input fields
    document.querySelector(uiSelectors.userFormField).style.display = 'none';
    document.querySelector(uiSelectors.addUserFormBtn).style.display = 'none';
    document.querySelector(uiSelectors.cancelUserSubmitBtn).style.display = 'none';
    document.querySelector(uiSelectors.editUserSubmitBtn).style.display = 'none';
    document.querySelector(uiSelectors.declineBtn).style.display = 'none';
    clearUserForm();

    document.querySelector(uiSelectors.mealCard).innerText = `Add Meal / Food Item`

    if(currentUser === false) {
      updateUserHeader(`No Profile Selected`)
    } else {
      updateUserHeader(currentUser);
    }
  }

  function showUserFormState(currentUser, state) {
    clearUserForm();
    clearEditItemState();
  
    // Show User input fields
    document.querySelector(uiSelectors.userFormField).style.display = 'block';
    document.querySelector(uiSelectors.cancelUserSubmitBtn).style.display = 'inline';
    if(state.classList.contains('edit-user-btn')) {
      document.querySelector(uiSelectors.userName).value = `${currentUser.name}`;
      document.querySelector(uiSelectors.userAge).value = `${currentUser.age}`;
      document.querySelector(uiSelectors.userHeight).value = `${currentUser.height}`;
      document.querySelector(uiSelectors.userWeight).value = `${currentUser.weight}`;

      document.querySelector(uiSelectors.editUserSubmitBtn).style.display = 'inline';
      document.querySelector(uiSelectors.deleteUserBtn).style.display = 'inline';
    } else {
      updateUserHeader('Add a New Profile');
      document.querySelector(uiSelectors.addUserFormBtn).style.display = 'inline';
      document.querySelector(uiSelectors.editUserBtn).style.display = 'none';
      document.querySelector(uiSelectors.deleteUserBtn).style.display = 'none';
    }
  }

  return {
    populateItemList: populateItemList,
    addItemUI: addItemUI,
    getUISelectors: getUISelectors,
    getItemInput: getItemInput,
    clearItemInput: clearItemInput,
    updateCalories: updateCalories,
    clearEditItemState: clearEditItemState,
    editItemState: editItemState,
    // Public User UI Methods
    initialUserState: initialUserState,
    populateUserList: populateUserList,
    getUserFormInput: getUserFormInput,
    clearUserFormState: clearUserFormState,
    showUserFormState: showUserFormState,
    updateUserHeader: updateUserHeader,
    updateNavHighlight: updateNavHighlight,
    addUserUI: addUserUI,
    updateUserUI: updateUserUI,
    deleteUserUI: deleteUserUI
  }
})()