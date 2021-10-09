const StorageCtrl = (function() {
  function getLocalItems() {
    let items;
    if(localStorage.getItem('items') === null) {
      items = []
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
  }

  function setLocalItems(items) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  return {
    getLocalItems: getLocalItems,
    setLocalItems: setLocalItems
  };
})()