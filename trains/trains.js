var lines = {
 Alamein: ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie'],
 Glenwaverly: ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga'],
 Sandringham: ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']
}
function displayRoute(origin, destination, line){
  var route;
  var originIndex = lines[line].indexOf(origin);
  var destinationIndex = lines[line].indexOf(destination);
  if(originIndex < destinationIndex){
    route = lines[line].splice(originIndex, destinationIndex - originIndex + 1);
  }
  else{
    route = lines[line].splice(destinationIndex, originIndex - destinationIndex + 1).reverse();
  }
  console.log( route.join(' ----> ') );
}
function findLine(station){
  var line;
  for (var key in lines) {
    if( lines[key].indexOf(station) >= 0 ){
      line = key;
    }
  }
  return line;
}

function showJourney(origin, destination){
  var originLine = findLine(origin);
  var destinationLine = findLine(destination);

  if( originLine == destinationLine ){
    displayRoute(origin, destination, originLine);
  }
  else if (originLine != destinationLine){
    if(origin != 'Richmond')
    displayRoute(origin, 'Richmond', originLine);
    if(destination != 'Richmond')
    displayRoute('Richmond', destination, destinationLine);
  }
}

showJourney('Richmond','Flagstaff');
