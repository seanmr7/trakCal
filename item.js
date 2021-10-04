const Items = (function() {
  let items = [];

  function add(item) {
    items.push(item);
    console.log(`${item} added`)
  }

  function remove(id) {
    items.splice(id, 1);

  }

  function get(id) {
    return items.find(item => {
      return item.id === id;
    })
  }

  function getAllItems() {
    return items;
  }

  return {
    add: add,
    remove: remove,
    get: get,
    getAllItems: getAllItems
  }

})()