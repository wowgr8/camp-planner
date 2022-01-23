// import $ from 'jquery';
// // import 'bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
//    import './css/styles.css';
// import ExchangeService from './js/exchange-service.js';


//unsure if it is not working since it is not waiting till it defers prior to loading html
//data tab target links two together 
//loop through the tabs and adding an event listener and show the target
//data tab congit comtent, you going to loop thru, add classList of remove to remove the active 
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active');
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})


//draggables
//first grab all the things you can grab and containers is where you can drop elements
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

//loop through each draggable and add and EventListener.  1st you have to start it with dragstart event. add to class using .classList, add dragging. then stop ghost like effect by classlist.remove 
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})
//looping through the container.  dragover will check if over something. then check to see what which container it is in.  draggable is the one you are draggin and it will add to the container 1 vs 2. e preventdefault is to drop it in the element/container 
//if afterElements is not anything then goes on the bottom of the list 
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    console.log ('dragover'); 
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})
//this will put it in a certain position (not just containers). to get all of the draggable elements (container.querySelectorAll) but to return it into a array use the spread operator 
//closest and  every one is a child of the container
//offset (middle of the box) is the to figure out what it is closest to.  if less than zero it is above, if closest to offset and barely above element 
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}