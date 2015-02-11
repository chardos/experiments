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