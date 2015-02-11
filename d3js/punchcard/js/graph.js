var pc = pc || {};

// ========================================================================
//  Graph drawing functions
// ========================================================================

pc.calcMax = function(dataSet1, dataSet2){
  var max = 0;
  var combinedSets = dataSet1.concat(dataSet2);

  for (var i=0; i<combinedSets.length; i++){
    if (combinedSets[i][2] > max){
      max = combinedSets[i][2];
    }
  }
  return max;
}

pc.calcMin = function(dataSet1, dataSet2){
  var min;
  var combinedSets = dataSet1.concat(dataSet2);
  for (var i=0; i<combinedSets.length; i++){
    if (combinedSets[i][2] < min || typeof min === 'undefined'){
      min = combinedSets[i][2];
    }
  }
  return min;
}

pc.addRectangles = function(data, color, setNumber, heightMod){

  //create the circles
  rectSet[setNumber] = svg.selectAll()
                  .data(data)
                  .enter().append('rect')
                  .attr("class", function(d,i){ return setNumber + i})

  rectSet[setNumber].attr('x', function(d){
    return( Math.ceil(d[0] * wx)  );
    //return d[0]
  });
  rectSet[setNumber].attr('y', function(d){
    if (!heightMod){
      return( d[1] * hx);
    }
    else{
      return( d[1] * hx + heightMod);
    }
  });
  rectSet[setNumber].attr('width', Math.ceil(wx) );
  rectSet[setNumber].attr('height', hx/2);
  rectSet[setNumber].attr('opacity', function(d){
    var opacity = (d[2] / dataMax);
    return opacity;
  });

  rectSet[setNumber].style({
    fill: color
  });
}

pc.buildPunchCard = function(card1, card2){
  pc.addRectangles(card1[0], card1[1], card1[2]);
  pc.addRectangles(card2[0], card2[1], card2[2], hx/2);
}

