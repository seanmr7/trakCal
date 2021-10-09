const UICtrl = (function() {
  // Define UI variables
  const uiSelectors = {
    itemList: '#item-list',
    itemName: '#item-name',
    itemCalories: '#item-calories', 
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    totalCalories: '.total-calories'
  }

  function populateItemList(items) {
    let output;

    items.forEach(item => {
      output += `
        <li class="collection-item" id="item-${item.id}"
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
          </a>
        <li>`
    });
    document.querySelector(uiSelectors.itemList).innerHTML = output;
  }

  function addItemUI(item) {
    const itemUI = document.createElement('li');
    itemUI.classList.add('collection-item');
    itemUI.id = `item-${item.id}`
    itemUI.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>`;
    document.querySelector(uiSelectors.itemList).appendChild(itemUI);
  }

  function removeItemUI() {
  }

  function updateCalories(calories) {
    document.querySelector(uiSelectors.totalCalories).innerText = `${calories}`;
  }
  
  function getItemInput() {
    return {
      name: document.querySelector(uiSelectors.itemName).value,
      calories: document.querySelector(uiSelectors.itemCalories).value
    }
  }
  function clearItemInput() {
    document.querySelector(uiSelectors.itemName).value = ''
    document.querySelector(uiSelectors.itemCalories).value = ''
  }

  function getUISelectors() {
    return uiSelectors;
  }

  return {
    populateItemList: populateItemList,
    addItemUI: addItemUI,
    removeItemUI: removeItemUI,
    getUISelectors: getUISelectors,
    getItemInput: getItemInput,
    clearItemInput: clearItemInput,
    updateCalories: updateCalories
  }
})()