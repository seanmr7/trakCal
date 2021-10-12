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

  function getUsers() {
    let users;
    if(localStorage.getItem('users') === null) {
      users = []
    } else {
      users = JSON.parse(localStorage.getItem('users'))
    }
    return users;
  }

  function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  return {
    getLocalItems: getLocalItems,
    setLocalItems: setLocalItems,
    getUsers: getUsers,
    setUsers: setUsers
  };
})()