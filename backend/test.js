const { exec } = require('child_process');
const {execSync } = require('child_process');
var Chart = require('chartjs');
var http = require('http');

http.createServer(function (req, res) {
  var predicted = exec('python3 test.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    var ctx = 'myChart';
    var myChart = new Chart(ctx, {
        type: 'line',
        data: stdout
    });


    // console.log(`stderr: ${stderr}`);
  });
}).listen(8080);
