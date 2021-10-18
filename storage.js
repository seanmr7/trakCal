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
    let usersArr;
    let currentUser;
    if(localStorage.getItem('usersArr') === null) {
      usersArr = [];
      currentUser = false;
    } else {
      usersArr = JSON.parse(localStorage.getItem('usersArr'));
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return {
      usersArr: usersArr,
      currentUser: currentUser
    }
  }

  function setUsers(users, currentUser) {
    localStorage.setItem('usersArr', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  return {
    getLocalItems: getLocalItems,
    setLocalItems: setLocalItems,
    getUsers: getUsers,
    setUsers: setUsers
  };
})()