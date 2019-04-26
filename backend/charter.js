//charter.js

var Chart = require('chartjs');
var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
