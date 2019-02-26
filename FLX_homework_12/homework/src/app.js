const rootNode = document.getElementById('root');

const localStorageTodo = 'TodoTasks';
const localStorageDone = 'DoneTasks';

let todoItems = localStorage.todoItems;
if (todoItems) {
    todoItems = JSON.parse(todoItems);
} else {
    todoItems = [];
}

let doneItems = localStorage.doneItems;
if (doneItems) {
    doneItems = JSON.parse(todoItems);
} else {
    doneItems = [];
}

const minusOneIndex = -1;

const setObjectItem = (array, storageKey) => {
  localStorage.setItem(storageKey, JSON.stringify(array));
}

const hashCheck = () => {
  if (location.hash === mainPageHash) {
    mainPageRender();
  } else if (location.hash === addPageHash) {
    addPageRender();
  } else if (location.hash.includes(modifyPageHash)) {
    modifyPageRender();
  }
}

window.addEventListener('load', hashCheck);
window.addEventListener('hashchange', hashCheck);

const mainPageHash = '';
const addPageHash = '#/add';
const modifyPageHash = '#/modify/';



const mainPageRender = () => {
  rootNode.innerHTML = '';

  const header = document.createElement('h1');
  rootNode.appendChild(header);

  const headerText = document.createTextNode('Simple TODO application');
  header.appendChild(headerText);

  const addButton = document.createElement('button');
  rootNode.appendChild(addButton);

  const addButtonText = document.createTextNode('Add new task');
  addButton.appendChild(addButtonText);
  addButton.setAttribute('class', 'button');

  const itemsArr = todoItems.concat(doneItems);

  if (!itemsArr.length) {
    const paragraph = document.createElement('p');
    rootNode.appendChild(paragraph);
    const paragraphText = document.createTextNode('TODO is empty');
    paragraph.setAttribute('class', 'empty-list');
    paragraph.appendChild(paragraphText);
  } else {
    const todoItemsList = document.createElement('ul');
    rootNode.appendChild(todoItemsList);

    itemsArr.forEach((item) => {
      const actionListItem = document.createElement('li');
      actionListItem.setAttribute('class', 'list-item');
      rootNode.appendChild(actionListItem);
      actionListItem.setAttribute('id', item.id);

      const checkbox = document.createElement('img');
      actionListItem.appendChild(checkbox);
      checkbox.setAttribute('class', 'checkbox');

      const todoAction = document.createElement('a');
      actionListItem.appendChild(todoAction);

      const todoActionDescription = document.createTextNode(item.description);
      todoAction.appendChild(todoActionDescription);
      todoAction.setAttribute('class', 'description');
      todoAction.setAttribute('href', `${modifyPageHash}${item.id}`);

      if (!item.isDone) {
        checkbox.setAttribute('src', './assets/img/todo-s.png');
      } else {
        checkbox.setAttribute('src', './assets/img/done-s.png');
        todoAction.style.backgroundColor = 'grey';
      }

      checkbox.addEventListener('click', markAsDone);

      const remove = document.createElement('img');
      actionListItem.appendChild(remove);
      remove.setAttribute('src', './assets/img/remove-s.jpg');
      remove.addEventListener('click', removeItem);
    });
  }
  addButton.addEventListener('click', setAddPageHash);
}

const markAsDone = (event) => {
  const itemId = parseInt(event.target.parentNode.id);
  const removeElId = todoItems.findIndex(item => item.id === itemId);
  if (removeElId === minusOneIndex) {
    return
  }
  const currentTodoEl = todoItems[removeElId];
  currentTodoEl.isDone = true;
  todoItems.splice(removeElId, 1);
  doneItems.push(currentTodoEl);

  setObjectItem(todoItems, localStorageTodo);
  setObjectItem(doneItems, localStorageDone);

  mainPageRender();
}

const removeItem = (event) => {
  const itemId = parseInt(event.target.parentNode.id);
  const removeFromTodoList = todoItems.findIndex(item => item.id === itemId);
  if (removeFromTodoList !== minusOneIndex) {
    todoItems.splice(removeFromTodoList, 1);
  }
  const removeFromDoneList = doneItems.findIndex(item => item.id === itemId);

  if (removeFromDoneList !== minusOneIndex) {
    doneItems.splice(removeFromDoneList, 1);
  }

  setObjectItem(todoItems, localStorageTodo);
  setObjectItem(doneItems, localStorageDone);

  mainPageRender();
}

const setAddPageHash = (event) => {
  window.location.hash = addPageHash;
  event.preventDefault();
}

const addPageRender = () => {
  rootNode.innerHTML = '';

  const header = document.createElement('h1');
  rootNode.appendChild(header);
  const headerText = document.createTextNode('Add task');
  header.appendChild(headerText);

  const newTaskInput = document.createElement('input');
  newTaskInput.setAttribute('id', 'task-input');
  rootNode.appendChild(newTaskInput);

  const buttonsRow = document.createElement('div');
  buttonsRow.setAttribute('class', 'btns-row');
  rootNode.appendChild(buttonsRow);
  const cancelBtn = document.createElement('button');
  buttonsRow.appendChild(cancelBtn);
  cancelBtn.setAttribute('class', 'button');
  const cancelBtnText = document.createTextNode('Cancel');
  cancelBtn.appendChild(cancelBtnText);
  const saveChangesBtn = document.createElement('button');
  buttonsRow.appendChild(saveChangesBtn);
  saveChangesBtn.setAttribute('class', 'button');
  const saveChangesBtnText = document.createTextNode('Save changes');
  saveChangesBtn.appendChild(saveChangesBtnText);

  cancelBtn.addEventListener('click', setMainPageHash);
  saveChangesBtn.addEventListener('click', saveAfterAdding);
}

const setMainPageHash = (event) => {
  window.location.hash = mainPageHash;
  event.preventDefault();
}

const saveAfterAdding = (event) => {
  const newAction = document.getElementById('task-input').value;
  if (!newAction) {
    return;
  }
  todoItems.push({isDone: false, id: generateId(), description: newAction});
  setObjectItem(todoItems, localStorageTodo);
  setMainPageHash(event);
}

const generateId = () => {
  const ids = todoItems.concat(doneItems).map((item) => item.id);
  return ids.length ? 1 + Math.max(...ids) : 1;
}

const modifyPageRender = () => {
  const itemId = parseInt(location.hash.split('/').pop());
  const itemToModify = todoItems.find(item => item.id === itemId);

  if (!itemToModify) {
    window.location.hash = mainPageHash;
    return;
  }
  rootNode.innerHTML = '';

  const header = document.createElement('h1');
  rootNode.appendChild(header);
  const headerText = document.createTextNode('Modify item');
  header.appendChild(headerText);

  const modifiedActionInput = document.createElement('input');
  modifiedActionInput.setAttribute('id', 'task-input');
  rootNode.appendChild(modifiedActionInput);
  modifiedActionInput.defaultValue = itemToModify.description;

  const buttonsRow = document.createElement('div');
  buttonsRow.setAttribute('class', 'btns-row');
  rootNode.appendChild(buttonsRow);
  const cancelBtn = document.createElement('button');
  buttonsRow.appendChild(cancelBtn);
  cancelBtn.setAttribute('class', 'button');
  const cancelBtnText = document.createTextNode('Cancel');
  cancelBtn.appendChild(cancelBtnText);
  const saveChangesBtn = document.createElement('button');
  buttonsRow.appendChild(saveChangesBtn);
  saveChangesBtn.setAttribute('class', 'button');
  const saveChangesBtnText = document.createTextNode('Save changes');
  saveChangesBtn.appendChild(saveChangesBtnText);

  cancelBtn.addEventListener('click', setMainPageHash);
  saveChangesBtn.addEventListener('click', saveAfterModifying);
}

const saveAfterModifying = (event) => {
  const modifiedAction = document.getElementById('task-input').value;

  if (!modifiedAction) {
    return;
  }
  const itemId = parseInt(location.hash.split('/').pop());
  todoItems.find(item => item.id === itemId).description = modifiedAction;
  setObjectItem(todoItems, localStorageTodo);
  setMainPageHash(event);
}