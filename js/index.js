const model = {
    days: ['Пт','Сб','Вс','Пн','Вт'],
    currentDay: 0
};

function getDayOfWeek(name, isCurrent){
    const createNode = document.createElement('div');
    createNode.style.border = '1px solid black';
    createNode.innerHTML = name;
    if (isCurrent){
        createNode.style.backgroundColor = 'red';
    }
    return createNode;
}

function renderDays (){
    const innerTable = window.document.getElementById('inner-table');
    while (innerTable.firstChild) {
        innerTable.removeChild(innerTable.firstChild);
    }
    renderCurrentDay();
    for (let i =0; i<model.days.length; i++){
        let item = getDayOfWeek(model.days[i],i===model.currentDay);
        innerTable.appendChild(item);
    }
}

function renderCurrentDay() {
    const innerTable = window.document.getElementById('inner-table');
    const createDiv = document.createElement('p');
    createDiv.innerHTML = 'Текущий: ' + model.days[model.currentDay];
    innerTable.appendChild(createDiv);
}

window.onload = function() {
    const rightArrow = document.getElementsByClassName('right-arrow');
    rightArrow[0].addEventListener('click', function () {
        model.currentDay++;
        renderDays();
    });
};
