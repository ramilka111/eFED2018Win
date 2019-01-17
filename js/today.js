var tempBtn = document.getElementById('temp-btn');
var precipBtn = document.getElementById('precip-btn');
var windBtn = document.getElementById('wind-btn');
var innerNav = document.getElementsByClassName('chart-btn');
var charts = document.getElementsByClassName('chart');

var counter = 0;
function switchChart() {
    for (let i=0; i<innerNav.length; i++){
        if (i===counter){
            innerNav[i].classList.add('checked');
            charts[i].classList.add('visible');
        } else {
            innerNav[i].classList.remove('checked');
            charts[i].classList.remove('visible');
        }
    }
}
for (let i=0; i<innerNav.length; i++) {
    innerNav[i].addEventListener('click', function () {
        counter= i;
        switchChart();
    });
}

tempBtn.addEventListener('click', switchChart);
precipBtn.addEventListener('click', switchChart);
windBtn.addEventListener('click', switchChart);