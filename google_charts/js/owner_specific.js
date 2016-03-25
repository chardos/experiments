google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

// NEW SERVERS
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Type', 'number'],
    ['Unix', 7],
    ['Windows', 26],
    ['VM Ware', 112],
    ['XEN', 0],
    ['ON-TAP', 16]
  ]);

  var options = {
    chartArea: {width: '50%'},
    hAxis: {
      title: 'New servers (DB Retained)',
      minValue: 0
    },
    width:900,
    height:200,
    bar: {groupWidth: "50%"},
  };

  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// SERVER TYPES
// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//     ['City', 'Virtual', 'Physical', 'No value'],
//     ['Unix', 2, 5, 0],
//     ['Windows', 21, 5, 0],
//     ['VM Ware', 0, 112,6],
//     ['XEN', 0, 32,0],
//     ['ON-TAP', 12, 1,0]
//   ]);
//
//   var options = {
//     chartArea: {width: '50%'},
//     hAxis: {
//       title: 'Server types (DB Retained)',
//       minValue: 0
//     },
//     width:900,
//     height:200,
//     bar: {groupWidth: "50%"},
//   };
//
//   var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
//   chart.draw(data, options);
// }
