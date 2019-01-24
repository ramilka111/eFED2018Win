var model = {
  days: ['Пт','Сб','Вс','Пн','Вт'],
  currentDay: 0
};

function currentDay() {
  var detailsNode = document.createElement('section');
  detailsNode.classList.add('date');

  var dayTime = document.createElement('article');
  dayTime.classList.add('day-time');

  dayTime.innerHTML = '+5';

  detailsNode.appendChild(dayTime);
  return detailsNode;
}

function dayOfWeek(name, isCurrent){
  var createNode = document.createElement('div');
  createNode.style.border = '1px solid black';
  createNode.innerHTML = name;
 if (isCurrent){
   createNode.style.backgroundColor = 'red';
 }
 return createNode;
}

function renderDays (){
  var innerTable = window.document.getElementById('inner-table');
  while (innerTable.firstChild) {
    innerTable.removeChild(innerTable.firstChild);
  }
  renderCurrentDay();
  for (var i =0; i<model.days.length; i++){
    var item = dayOfWeek(model.days[i], i===model.currentDay);
    innerTable.appendChild(item);

  }
}

function renderCurrentDay() {
  var innerTable = window.document.getElementById('inner-table');
  var createDiv = document.createElement('p');
  createDiv.innerHTML = 'Текущий: ' + model.days[model.currentDay];
  innerTable.appendChild(createDiv);
}

window.onload = function() {
  var rightArrow = document.getElementsByClassName('right-arrow');
  rightArrow[0].addEventListener('click', function () {
    model.currentDay++;
    renderDays();
  });
};
