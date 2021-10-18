const UserCtrl = (function() {
  const User = function(id, name, age, height, weight, bmi) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.bmi = bmi;
  }

  const users = {
    currentUser: false,
    usersArr: []
  }

  function populateUsers(array, currentUser) {
    array.forEach(user => {
      const newUser = new User(user.id, user.name, user.age, user.height, user.weight, user.bmi);
      users.usersArr.push(newUser);
      });
    users.currentUser = currentUser;
  }

  function calcBMI(weight, height) {
    return (weight / height**2 * 703)
  }

  function addUser(name, age, height, weight) {
    let ID;
    if(users.usersArr.length > 0) {
      ID = users.usersArr[users.usersArr.length - 1].id + 1
    } else {
      ID = 0;
    }

    // Convert form values to integers
    age = parseInt(age);
    height = parseInt(height);
    weight = parseInt(weight);
    bmi = Math.round(calcBMI(weight, height));
    // Create new User object
    const user = new User(ID, name, age, height, weight, bmi);

    users.usersArr.push(user);
    users.currentUser = user;
  }

  function updateUser(name, age, height, weight) {
    // Convert form values to integers
    age = parseInt(age);
    height = parseInt(height);
    weight = parseInt(weight);
    bmi = Math.round(calcBMI(weight, height));

    // Find user to update in Users Array
    users.usersArr.forEach(user => {
      if(user.id === users.currentUser.id) {
        user.name = name;
        user.age = age;
        user.height = height;
        user.weight = weight;
        user.bmi = bmi;

        // Update current user info
        users.currentUser = user;
      }
    })
  }

  function deleteUser() {
    const ID = users.currentUser.id;
    
    users.usersArr.forEach((user, index) => {
      if(user.id === ID) {
        users.usersArr.splice(index, 1);
      }
    })
    users.currentUser = false;
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
    populateUsers: populateUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
  };
})()