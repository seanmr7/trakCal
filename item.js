const Items = (function() {
  let items = [];
  let calories = 0;

  function add(item) {
    items.push(item);
    calories += Number(item.calories);
    console.log(`${item} added`)
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
    return items;
  }

  function clearAllItems() {
    items = [];
    calories = 0;
  }

  function getCalories() {
    return calories;
  }

  return {
    add: add,
    remove: remove,
    getItem: getItem,
    getAllItems: getAllItems,
    clearAllItems: clearAllItems,
    getCalories: getCalories
  }

})()