const App = (function() {
  const uiSelectors = UICtrl.getUISelectors();

  // Load event Listeners
  function assignEventListeners() {
  document.querySelector(uiSelectors.addBtn).addEventListener('click', addItem);
  }

  function init() {
    const items = ItemsCtrl.getAllItems();
    const totalCalories = ItemsCtrl.getTotalCalories();
    
    UICtrl.populateItemList(items);
    UICtrl.updateCalories(totalCalories);

    assignEventListeners();
  }

  function addItem(e) {
    e.preventDefault();

    const input = UICtrl.getItemInput();

    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemsCtrl.addItem(input.name, input.calories);

      UICtrl.addItemUI(newItem);
      UICtrl.clearItemInput();

      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
    }
  }

  function clearAll() {
    UICtrl.clearAll();
    ItemsCtrl.clearAllItems();
  }

  return {
    init: init
  }
})();

App.init();