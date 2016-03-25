google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Server type', 'DR', { role: 'style' }],
    ['Etax JK', 76, '#3366cc'],
    ['Etax JK2', 13, '#3366cc'],
    ['26152-4 Total', 99, 'black']
  ]);

  var options = {
    chartArea: {width: '50%'},
    hAxis: {
      title: 'Unowned accounts',
      minValue: 0
    },
    legend: { position: "none" },
    width:900,
    height:200,
    bar: {groupWidth: "50%"},
  };

  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
