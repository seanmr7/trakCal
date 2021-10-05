const UI = (function() {
  // Define UI variables
  const itemList = document.getElementById('item-list'),
        itemName = document.getElementById('item-name'),
        itemCals = document.getElementById('item-calories'),
        addBtn = document.querySelector('add-btn'),
        updateBtn = document.querySelector('update-btn'),
        deleteBtn = document.querySelector('delete-btn'),
        totalCals = document.querySelector('.total-calories');
  
  function init(itemList) {
    itemList.forEach(function(item, index) {
      addItemUI(item, index);
    });
  }

  function addItemUI(item, id) {
    const itemUI = document.createElement('li');
    itemUI.classList.add('collection-item');
    itemUI.id = `item-${id}`
    itemUI.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>`;
    itemList.appendChild(itemUI);

    clearForm();
  }

  function clearForm() {
    itemName.value = '';
    itemCals.value = '';
  }

  function removeItemUI() {

  }

  function clearAll() {
    while(itemList.firstChild) {
      itemList.removeChild(itemList.firstChild)
    }

    itemName.value = '';
    itemCals.value = '';
  }

  function updateCalories(calories) {
    totalCals.innerText = `${calories}`;
  }

  return {
    init: init,
    addItemUI: addItemUI,
    removeItemUI: removeItemUI,
    clearForm: clearForm,
    clearAll: clearAll,
    updateCalories: updateCalories
  }
})()