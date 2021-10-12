const App = (function() {
  const uiSelectors = UICtrl.getUISelectors();

  // Load event Listeners
  function assignEventListeners() {
    document.querySelector(uiSelectors.addBtn).addEventListener('click', addItem);
    document.querySelector(uiSelectors.itemList).addEventListener('click', editItemState);
    document.querySelector(uiSelectors.updateBtn).addEventListener('click', updateItem);
    document.querySelector(uiSelectors.deleteBtn).addEventListener('click', deleteItem);
    document.querySelector(uiSelectors.backBtn).addEventListener('click', clearEditState);
    document.querySelector(uiSelectors.clearAllBtn).addEventListener('click', clearAll);
    document.querySelector(uiSelectors.addUserFormBtn).addEventListener('click', addUserSubmit);
    document.querySelector(uiSelectors.declineBtn).addEventListener('click', declineProfile);
    document.querySelector(uiSelectors.userNav).addEventListener('click', changeCurrentUser);
  
  }

  function init() {
    UICtrl.clearEditItemState();

    const items = StorageCtrl.getLocalItems();
    const users = StorageCtrl.getUsers();

    // Populates the users array prior to setting the home page state
    if(users != undefined && users.length > 0) {
      UserCtrl.populateUsers(users);
    }

    if(UserCtrl.getCurrentUser() === 'declined') {
      ItemsCtrl.populateItemList(items);
      UICtrl.clearEditUserState(false);
      UICtrl.populateItemList(ItemsCtrl.getItems(false));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
    } else if(items.length === 0 && UserCtrl.getCurrentUser() === false) {
      ItemsCtrl.populateItemList(items);
      UICtrl.editUserState(false);
      UICtrl.populateItemList(ItemsCtrl.getItems(false));
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
    } else {
      UICtrl.clearEditUserState(UserCtrl.getCurrentUser());
      UICtrl.populateItemList(items);
      UICtrl.populateUserList(UserCtrl.getUsers(), UserCtrl.getCurrentUser());
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
      //UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()))
      //UICtrl.populateItemList(ItemsCtrl.getTotalCalories(UserCtrl.getCurrentUser()))
    }
    assignEventListeners();
  }

  function addItem() {
    const input = UICtrl.getItemInput();
    
    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemsCtrl.addItem(input.name, input.calories, UserCtrl.getCurrentUser());

      UICtrl.addItemUI(newItem);
      UICtrl.clearItemInput();

      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
      StorageCtrl.setLocalItems(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
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
      UICtrl.updateCalories(ItemsCtrl.getTotalCalories());
  
      UICtrl.clearEditItemState();
      StorageCtrl.setLocalItems(ItemsCtrl.getItems(false));
    }
  }

  function deleteItem() {
    // Delete the item being edited
    ItemsCtrl.deleteItem();

    // Repopulate item list and update calories
    UICtrl.populateItemList(ItemsCtrl.getItems(UserCtrl.getCurrentUser()));
    UICtrl.updateCalories(ItemsCtrl.getTotalCalories());

    UICtrl.clearEditItemState();
    StorageCtrl.setLocalItems(ItemsCtrl.getItems(false));
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
    UserCtrl.addUser(input.name, input.age, input.height, input.weight);
    UICtrl.clearEditUserState(UserCtrl.getCurrentUser());
  }

  function declineProfile() {
    UICtrl.clearEditUserState(false);
    StorageCtrl.setUsers('declined');
  }

  function changeCurrentUser(e) {
    if(e.target.classList.contains('user')) {
      // Change the current user
      UserCtrl.changeCurrentUser(e.target.id);

      // Update the header, calories, and food items
      UICtrl.updateUserHeader(UserCtrl.getCurrentUser());
      UICtrl.updateNavHighlight(UserCtrl.getCurrentUser());
    }

    if(e.target.parentElement.classList.contains('user')) {
      UserCtrl.changeCurrentUser(e.target.parentElement.id);
      UICtrl.updateUserHeader(UserCtrl.getCurrentUser());
      UICtrl.updateNavHighlight();
    }
  }

  return {
    init: init
  }
})();

App.init();