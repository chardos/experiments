google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Server type', 'DR'],
    ['Unix', 12],
    ['Windows', 4],
    ['Ontap 8.2.x', 2],
    ['VMWare ESXI 5.1', 112],
    ['Vendor OS Vendor version', 76],
    ['VMWare ESXI 5.5', 1],
    ['VMWare ESXI 5.1', 112],
    ['Vendor OS Vendor version', 76],
    ['VMWare ESXI 5.5', 1]
  ]);

  var options = {
    chartArea: {width: '50%'},
    hAxis: {
      title: 'Number of new servers',
      minValue: 0
    },
    legend: { position: "none" },
    width:900,
    height:400,
    bar: {groupWidth: "95%"},
  };

  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
