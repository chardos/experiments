
var F = {}

F.vars = {
	
};

F.createTable1 = function(canvas){
  var Table1 = new fabric.Rect({
    name: 'Table1',
    left: 50,
    top: 50,
    fill: 'green',
    width: 20,
    height: 45,
  });
  Table1.hasControls = false;
  canvas.add(Table1);
}
F.createSeparator = function(canvas){
  var separator = new fabric.Rect({
    left: 0,
    top: 100,
    fill: 'black',
    width: 900,
    height: 1,
  });
  separator.set('selectable', false);
  canvas.add(separator);
}

F.initEvents = function(canvas) {
  //on click event
  canvas.on('mouse:down', function(options) {
    if (options.target) {
      console.log('an object was clicked! ', options.target);
    }
  });

  //on modify
  canvas.on('object:modified', function(options) {

    thisObj = options.target;

    if ( thisObj.top > 100 ){ // check dropped below separator
      if (options.target && options.target.name == 'Table1') {
        //change name
        console.log('an object was modified!');
        thisObj.name = 'table1';

        //reenable rotation
        //thisObj.setControlsVisibility({mtr: true})
        thisObj.hasControls = true;

        F.createTable1(canvas);
      }
    }
    else{
      //return to original position
      thisObj.left = thisObj.originalState.left;
      thisObj.top = thisObj.originalState.top;
      thisObj.setCoords(); //redraw after modifying
      console.log(thisObj);
    }
  });
}

F.init = function() {
  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');
  canvas.selection = true;

  F.createTable1(canvas);
  F.createSeparator(canvas);
  F.initEvents(canvas);
}


$(document).ready(function() {

	F.init();
	
});




  //rect.set('selectable', true); // make object selectable
  //Table1.setControlsVisibility({mtr: false}) //disable rotation
