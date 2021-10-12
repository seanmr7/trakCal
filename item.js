const ItemsCtrl = (function() {
  const Item = function(id, userID, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.userID = userID;
  }

  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Egg', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  function populateItemList(array) {
    array.forEach(item => {
      const newItem = new Item(item.id, item.userID, item.name, item.calories);
      data.items.push(newItem);
    })
  }

  function addItem(name, calories, user) {
    let userID;
    if (user === false) {
      userID = -14;
    } else { userID = user.id }
    
    let ID;
    if(data.items.length > 0) {
      ID = data.items[data.items.length - 1].id + 1
    } else {
      ID = 0;
    }
    // Convert form input to number
    calories = parseInt(calories);

    // Create new item object
    const item = new Item(ID, userID, name, calories);
    // Add new item object into data
    data.items.push(item);

    return item;
  }

  function getItem(id) {
    // Parse item ID from UI ID
    const ID = Number(id.split('-')[1]);

    // Compare item ids with ID and set matching item
    data.items.forEach(item => {
      if(item.id === ID) {
        data.currentItem = item;
      }
    })

    return data.currentItem;
  }

  function updateItem(name, calories) {
    // Update the current items name and calories
    data.currentItem.name = name;
    data.currentItem.calories = parseInt(calories);

    // Return current item to null
    resetCurrentItem();
  }

  function deleteItem() {
    const ID = data.currentItem.id;

    // Remove item from data structure
    data.items.splice(ID, 1);

    // Update ids for remaining items
    data.items.forEach(item => {
      if(item.id > ID) {
        item.id -= 1;
      }
    })

    // Return current item to null
    resetCurrentItem();
  }

  function resetCurrentItem() {
    data.currentItem = null;
  }

  function getItems(user) {
    if(user === false) {
      return data.items
    } else { 
      let userItems = []
      data.items.forEach(item => {
        if(item.userID === user.id) {
          userItems.push(item)
        }
      })
      return userItems;
    }
  }

  function clearAllItems() {
    data.items = [];
  }

  function getTotalCalories() {
    let total = 0;

    data.items.forEach(function(item) {
      total += item.calories;
    })
    data.totalCalories = total;
    return data.totalCalories;
  }

  return {
    populateItemList: populateItemList,
    addItem: addItem,
    getItem: getItem,
    getItems: getItems,
    clearAllItems: clearAllItems,
    getTotalCalories: getTotalCalories,
    updateItem: updateItem,
    deleteItem: deleteItem,
    resetCurrentItem: resetCurrentItem
  };
})()