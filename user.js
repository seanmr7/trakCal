const UserCtrl = (function() {
  const User = function(id, name, age, height, weight) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.bmi = calcBMI(weight, height);
  }

  const users = {
    currentUser: {id: 1, name: 'Jenn Apple', age: 21, height: 55, weight: 120, bmi: 27},
    usersArr: [
      {id: 0, name: 'John Smith', age: 25, height: 70, weight: 260, bmi: 37},
      {id: 1, name: 'Jenn Apple', age: 21, height: 55, weight: 120, bmi: 27},
      {id: 2, name: 'Cool Cat', age: 43, height: 60, weight: 150, bmi: 29}
    ]
  }

  function populateUsers(array) {
    if(array === 'declined') {
      users.currentUser = 'declined';
    } else {
    array.forEach(user => {
      const newUser = new User(user.id, user.name, user.height, user.weight);
      users.items.push(newUser);
      users.currentUser = newUser;
      });
    }
  }
  function calcBMI(weight, height) {
    return (weight / height**2 * 703)
  }

  function addUser(name, age, height, weight) {
    let ID;
    if(users.usersArr.length > 0) {
      ID = data.items[data.items.length - 1].id + 1
    } else {
      ID = 0;
    }

    // Convert form values to integers
    age = parseInt(age);
    height = parseInt(height);
    weight = parseInt(weight);

    // Create new User object
    const user = new User(ID, name, age, height, weight);

    users.usersArr.push(user);
    users.currentUser = user;
  }

  function getCurrentUser() {
    return users.currentUser;
  }

  function changeCurrentUser(id) {
    const ID = Number(id.split('-')[1]);
    users.usersArr.forEach(user => {
      if(user.id === ID) {
        users.currentUser = user;
      }
    })
  }

  function getUsers() {
    return users.usersArr;
  }

  return {
    getCurrentUser: getCurrentUser,
    addUser: addUser,
    changeCurrentUser: changeCurrentUser,
    getUsers: getUsers,
    populateUsers: populateUsers
  };
})()