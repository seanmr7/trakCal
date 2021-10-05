// Add event Listeners
document.querySelector('.add-btn').addEventListener('click',addItem);
document.querySelector('.clear-btn').addEventListener('click', clearAll);
document.querySelector('.clear-form-btn').addEventListener('click', UI.clearForm)

function addItem(e) {
  e.preventDefault();
  const item = {
    name: `${document.getElementById('item-name').value}`,
    calories: `${document.getElementById('item-calories').value}`
  }

  Items.add(item);
  UI.addItemUI(item);

  UI.updateCalories(Items.getCalories());
}

function clearAll() {
  UI.clearAll();
  Items.clearAllItems();
}