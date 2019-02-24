let rootNode = document.getElementById('root');
let buttonIndex = 0;
const maxActionNum = 10;
let itemId = 0;
let tagIndex = 0;
let h1Index = 0;
let addAction = 1;
let dragLocation = 0;

const button = document.getElementById('action-submit')[buttonIndex];
const addBox = document.getElementById('add-box');
addBox.setAttribute('onclick', 'addNewAction()');

const listItems = document.getElementById('list-items');
listItems.setAttribute('ondrop', 'drop(event)');
listItems.setAttribute('ondragover', 'preventDrop(event)');

const markActionAsDone = (el) => {
  if (el.target.innerHTML === 'check_box_outline_blank') {
    el.target.innerHTML = 'check_box';  
  }
}

const deleteAction = (el) => {
  el.target.parentElement.remove();
  let warn = document.getElementsByClassName('warning')[tagIndex];
  if (warn) {
    button.removeAtribute('disabled');
    document.getElementById('action-input').removeAttribute('disabled');
    warn.remove();
  }
}

const allCorrect = () => {
  if (document.getElementById('action-input').value === '') {
    document.getElementById('action-submit').disabled = true;
  } else {
    document.getElementById('action-submit').disabled = false;
  }
}


const listFullWarningMsg = (actionCount) => {
  const warningMsg = document.createElement('div');
  warningMsg.innerHTML = '<p>Maximum item per list are created</p>';
  warningMsg.setAttribute('class', 'warning');

  if (actionCount > maxActionNum) {
    button.setAttribute('disabled', true);
    document.getElementById('action-input').setAttribute('disabled', true);   
    document.getElementsByTagName('h1')[h1Index].appendChild(warningMsg);
  }
}


const drag = (ev) => {
  dragLocation = ev.screenY;
  ev.dataTransfer.setData('text', ev.target.id);
}

const preventDrop = (ev) => {
  ev.preventDefault();
}

const drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const droppedContainer = ev.target.closest('#listItems');
    const droppedElement = ev.target.closest('.listItems');
    console.log(ev.target.nextSibling)
    const dropLocation = ev.screenY;
    if (dragLocation > dropLocation) {
      droppedContainer.insertBefore(document.getElementById(data), droppedElement);
    } else {
        const nextEl = droppedElement.nextSibling;
        if (nextEl) {
          droppedContainer.insertBefore(document.getElementById(data), nextEl);
        } else {
          droppedContainer.appendChild(document.getElementById(data));
        }
    }    
}


const addNewAction = () => {
  const checkBox = document.getElementsByClassName('checkbox');
  let actionInputValue = document.getElementById('action-input').value;
  const binIcon = document.getElementsByClassName('delete');
  const actionCount = checkBox.length;
  if (actionInputValue && actionCount < maxActionNum) {
    const newListItem = document.createElement('div');
    newListItem.setAttribute('class', 'listItems');
    newListItem.setAttribute('id', itemId++);
    newListItem.setAttribute('draggable', 'true');//check if this true value works
    newListItem.setAttribute('ondragstart', 'drag(event)');
    newListItem.innerHTML = '<div class="checkbox">' + 
    '<i id="addBox" class="material-icons checkBox">check_box_outline_blank</i>' +
    actionInputValue + 
    '</div>' + '<i class="material-icons delete">delete</i>';
    listItems.appendChild(newListItem); 
    listFullWarningMsg(actionCount + addAction);
    checkBox[actionCount].addEventListener('click', markActionAsDone);   
    binIcon[actionCount].addEventListener('click', deleteAction);
  }
}