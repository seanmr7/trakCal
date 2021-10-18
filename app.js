const App = (function() {
  const uiSelectors = UICtrl.getUISelectors();

  // Load event Listeners
  function assignEventListeners() {
    document.querySelector(uiSelectors.addBtn).addEventListener('click', addItem);

    // Prevent form submission with enter
    document.addEventListener('keypress', function(e) {
      if(e.key === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })
    document.querySelector(uiSelectors.itemList).addEventListener('click', editItemState);
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', updateItem);
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', deleteItem);
    document.querySelector(uiSelectors.backBtn).addEventListener('click', clearEditState);
    document.querySelector(uiSelectors.clearAllBtn).addEventListener('click', clearAll);
    document.querySelector(uiSelectors.addUserFormBtn).addEventListener('click', addUserSubmit);
    document.querySelector(uiSelectors.declineBtn).addEventListener('click', declineProfile);
    document.querySelector(uiSelectors.userNav).addEventListener('click', changeCurrentUser);
    document.querySelector(uiSelectors.addUserBtn).addEventListener('click', showUserForm);
    document.querySelector(uiSelectors.editUserBtn).addEventListener('click', showUserForm);
    document.querySelector(uiSelectors.cancelUserSubmitBtn).addEventListener('click', cancelUserForm);
    document.querySelector(uiSelectors.editUserSubmitBtn).addEventListener('click', updateUser);
    document.querySelector(uiSelectors.deleteUserBtn).addEventListener('click', deleteUser);
  }

  function init() {
    UICtrl.clearEditItemState();

    const items = StorageCtrl.getLocalItems();
    const users = StorageCtrl.getUsers();

    if(users.currentUser === 'declined') {
      ItemsCtrl.populateItemList(items);
      UICtrl.clearUserFormState(false);
      UICtrl.populateItemList(ItemsCtrl.getItems(false));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(false));
    } else if(items.length === 0 && users.currentUser === false) {
      UICtrl.initialUserState();
    } else {
      // Set the Users data structure from local storage
      UserCtrl.populateUsers(users.usersArr, users.currentUser);

      // Clear the create user form
      UICtrl.clearUserFormState(UserCtrl.getCurrentUser());
      
      // Set Items data structure to local storage items
      ItemsCtrl.populateItemList(items);

      // Populate the UI elements
      UICtrl.populateUserList(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
      UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()))
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()))
    }
    assignEventListeners();
  }

  function addItem() {
    const input = UICtrl.getItemInput();
    
    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemsCtrl.addItem(input.name, input.calories, UserCtrl.getCurrentUser());

      UICtrl.addItemUI(newItem);
      UICtrl.clearItemInput();

      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()));
      StorageCtrl.setLocalItems(ItemsCtrl.getAllItems());
    }
  }

  function editItemState(e) {
    if(e.target.classList.contains('fa')) {
      const item = ItemsCtrl.getItem(e.target.parentElement.parentElement.id);
      UICtrl.editItemState(item);
    }
  }

  function updateItem() {
    const input = UICtrl.getItemInput();

    if(input.name !== '' && input.calories !== '') {
      // Update the item being edited
      ItemsCtrl.updateItem(input.name, input.calories);

      // Repopulate item list and update calories
      UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()));
  
      UICtrl.clearEditItemState();
      StorageCtrl.setLocalItems(ItemsCtrl.getAllItems());
    }
  }

  function deleteItem() {
    // Delete the item being edited
    ItemsCtrl.deleteItem();

    // Repopulate item list and update calories
    UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
    UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()));

    UICtrl.clearEditItemState();
    StorageCtrl.setLocalItems(ItemsCtrl.getAllItems());
  }

  function clearEditState() {
    ItemsCtrl.resetCurrentItem();
    UICtrl.clearEditItemState();
  }

  function clearAll() {
    ItemsCtrl.clearAllItems();
    UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
    UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
    StorageCtrl.setLocalItems(ItemsCtrl.getItems(false));
  }

  function addUserSubmit() {
    const input = UICtrl.getUserFormInput();
    if(input.name === '' || input.age === '' || input.height === '' || input.weight === '') { } 
    else { 
      UserCtrl.addUser(input.name, input.age, input.height, input.weight);
      UICtrl.clearUserFormState(UserCtrl.getCurrentUser());
      UICtrl.addUserUI(UserCtrl.getCurrentUser());
      UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()));

      StorageCtrl.setUsers(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
    }
  }

  function declineProfile() {
    UICtrl.clearUserFormState(false);
    StorageCtrl.setUsers('declined', 'declined');
  }

  function changeCurrentUser(e) {
    if(e.target.classList.contains('user')) {
      // Change the current user
      UserCtrl.changeCurrentUser(e.target.id);

      // Update the header, calories, and food items
      UICtrl.updateUserHeader(UserCtrl.getCurrentUser());
      UICtrl.updateNavHighlight(UserCtrl.getCurrentUser());
      UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()));
    }

    if(e.target.parentElement.classList.contains('user')) {
      UserCtrl.changeCurrentUser(e.target.parentElement.id);
      UICtrl.updateUserHeader(UserCtrl.getCurrentUser());
      UICtrl.updateNavHighlight();
    }

    StorageCtrl.setUsers(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
  }

  function showUserForm(e) {
    UICtrl.showUserFormState(UserCtrl.getCurrentUser(), e.target);
  }

  function cancelUserForm() {
    UICtrl.clearUserFormState(UserCtrl.getCurrentUser());
  }

  function updateUser() {
    const input = UICtrl.getUserFormInput();
    if(input.name === '' || input.age === '' || input.height === '' || input.weight === '') { } 
    else { 
      UserCtrl.updateUser(input.name, input.age, input.height, input.weight);
      UICtrl.clearUserFormState(UserCtrl.getCurrentUser());
      UICtrl.updateUserUI(UserCtrl.getCurrentUser());

      StorageCtrl.setUsers(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
    }
  }

  function deleteUser() {
    UICtrl.deleteUserUI(UserCtrl.getCurrentUser());
    UserCtrl.deleteUser();
    UICtrl.clearUserFormState(UserCtrl.getCurrentUser());

    StorageCtrl.setUsers(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
  }

  return {
    init: init
  }
})();

App.init();