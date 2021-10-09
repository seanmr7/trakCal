const ItemsCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories
  }

  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Egg', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  function addItem(name, calories) {
    let ID;
    if(data.items.length > 0) {
      ID = data.items[data.items.length - 1].id + 1
    } else {
      ID = 0;
    }
    // Convert form input to number
    calories = parseInt(calories);

    // Create new item object
    const item = new Item(ID, name, calories);
    
    // Add new item object into data
    data.items.push(item);

    return item;
  }

  function remove(id) {
    item = getItem(id);
    calories -= item.calories
    items.splice(id, 1);

  }

  function getItem(id) {
    return items.find(item => {
      return item.id === id;
    })
  }

  function getAllItems() {
    return data.items;
  }

  function clearAllItems() {
    items = [];
    calories = 0;
  }

  function getTotalCalories() {
    updateTotalCalories();
    return data.totalCalories;
  }

  function updateTotalCalories() {
    const items = data.items;
    data.totalCalories = 0;
    items.forEach(function(item) {
      data.totalCalories += item.calories;
    })
  }

  return {
    addItem: addItem,
    remove: remove,
    getItem: getItem,
    getAllItems: getAllItems,
    clearAllItems: clearAllItems,
    getTotalCalories: getTotalCalories
  }

})()