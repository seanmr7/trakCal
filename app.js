const App = (function() {
  const uiSelectors = UICtrl.getUISelectors();

  // Load event Listeners
  function assignEventListeners() {
    document.querySelector(uiSelectors.addBtn).addEventListener('click', addItem);
    document.querySelector(uiSelectors.itemList).addEventListener('click', editItemState);
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', updateItem);
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', deleteItem)
    document.querySelector(uiSelectors.backBtn).addEventListener('click', clearEditState)
    document.querySelector(uiSelectors.clearAllBtn).addEventListener('click', clearAll)
  }

  function init() {
    UICtrl.clearEditItemState();

    const items = ItemsCtrl.getAllItems();
    const totalCalories = ItemsCtrl.getTotalCalories();

    if(items.length === 0) {

    } else {
      UICtrl.populateItemList(items);
      UICtrl.updateCalories(totalCalories);
    }
    assignEventListeners();
  }

  function addItem() {
    const input = UICtrl.getItemInput();

    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemsCtrl.addItem(input.name, input.calories);

      UICtrl.addItemUI(newItem);
      UICtrl.clearItemInput();

      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
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
      UICtrl.populateItemList(ItemsCtrl.getAllItems());
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
  
      UICtrl.clearEditItemState();
    }
  }

  function deleteItem() {
    // Delete the item being edited
    ItemsCtrl.deleteItem();

    // Repopulate item list and update calories
    UICtrl.populateItemList(ItemsCtrl.getAllItems());
    UICtrl.updateCalories(ItemsCtrl.getTotalCalories());

    UICtrl.clearEditItemState();
  }

  function clearEditState() {
    ItemsCtrl.resetCurrentItem();
    UICtrl.clearEditItemState();
  }

  function clearAll() {
    ItemsCtrl.clearAllItems();
    UICtrl.populateItemList(ItemsCtrl.getAllItems());
    UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
  }

  return {
    init: init
  }
})();

App.init();