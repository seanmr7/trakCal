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
    console.log(data.currentItem)
    // Update the current items name and calories
    data.currentItem.name = name;
    data.currentItem.calories = parseInt(calories);

    data.items.forEach(item => {
      if(item.id === data.currentItem.id) {
        // Update the items name and calories in the data structure
        item.name = name;
        item.calories = parseInt(calories);
      }
    })
    // Return current item to null
    resetCurrentItem();
  }

  function deleteItem() {
    const ID = data.currentItem.id;

    // Remove item from data structure
    data.items.forEach((item, index) => {
      if(item.id === ID) {
        data.items.splice(index, 1);
      }
    })

    // Return current item to null
    resetCurrentItem();
  }

  function resetCurrentItem() {
    data.currentItem = null;
  }

  function getAllItems() {
    return data.items;
  }

  function getItems(user) {
    if(user === false) {
      return _getItemsUtility(-14);
    } else { 
      return _getItemsUtility(user.id);
    }
  }

  function _getItemsUtility(id) {
    let items = [];
    data.items.forEach(item => {
      if(item.userID === id) {
        items.push(item)
      }
    })
    return items;
  }

  function clearAllItems() {
    data.items = [];
  }

  function getTotalCalories(user) {
    // Returns total calories of all unassigned food items if no user is submitted
    if(user === false) {
      data.totalCalories = sumCalories(-14);
      return data.totalCalories;
      } else {
      data.totalCalories = sumCalories(user.id);
      return data.totalCalories;
    }
  }

  function sumCalories(userID) {
    let total = 0
    data.items.forEach(item => {
      if(item.userID === userID) {
        total += item.calories;
      }
    })
    return total;
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
    resetCurrentItem: resetCurrentItem,
    getAllItems: getAllItems
  };
})()