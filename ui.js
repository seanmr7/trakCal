const UICtrl = (function() {
  // Define UI variables
  const uiSelectors = {
    itemList: '#item-list',
    itemName: '#item-name',
    itemCalories: '#item-calories', 
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearAllBtn: '.clear-btn',
    totalCalories: '.total-calories'
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

  function removeItemUI() {
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

  return {
    populateItemList: populateItemList,
    addItemUI: addItemUI,
    removeItemUI: removeItemUI,
    getUISelectors: getUISelectors,
    getItemInput: getItemInput,
    clearItemInput: clearItemInput,
    updateCalories: updateCalories,
    clearEditItemState: clearEditItemState,
    editItemState: editItemState
  }
})()