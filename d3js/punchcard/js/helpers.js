var pc = pc || {};

// ========================================================================
//  Data pulling helpers
// ========================================================================

pc.convertDateToArray = function(date){
  hour = new Date(date).getHours();
  day = new Date(date).getDay();
  return [hour, day]
}

pc.areArraysEqual = function(a1,a2) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}


pc.squashArray = function(arr){
  //put first value in
  var squashedArr = [];
  squashedArr.push([ arr[0][0], arr[0][1], 1 ]);
  testArray.shift();

  $.each(arr, function(i, v){
    var count = 0;
    $.each(squashedArr, function(si, sv){
      console.log('v:' + v);
      console.log('sv:' + sv);
      if( v[0] == sv[0] && v[1] == sv[1] ){
        sv[2]++;
        count = 0;
        return false;
      }
      else{
        count++;
        console.log('count up');
      }
    });
    if ( count > 0){
      squashedArr.push( [v[0], v[1], 1] );
    }
    console.log('c:' + count);
    console.log(squashedArr.toString());
    console.log('__________');
  });
  console.log(squashedArr);
}




var testArray = [[0,1],[0,1],[0,1],[2,0],[2,0],[3,0],[2,0],[2,0],[4,0],[1,2],[1,3],[1,2]];
pc.squashArray(testArray);
