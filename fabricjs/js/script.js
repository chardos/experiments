
// add images to the tables
// get it into rails app
// save objects to db via ajax

var F = {}

F.vars = {
	
};

function Table(canvas, name, left, top, width, height){
  //this.name = name;

  var that = this;
  this.createTable = function(){
    console.log('creating table');
    that['table' + name] = new fabric.Rect({
      name: 'Table_' + name,
      left: left,
      top: top,
      fill: 'black',
      width: width,
      height: height
    });
    canvas.add(that['table' + name]);
  }
  this.createTable();
  this['table' + name].hasControls = false;

  canvas.on('object:modified', function(options) {

    thisObj = options.target;

    if ( thisObj.top > 100 ){ // check dropped below separator
      if (options.target && options.target.name == 'Table_' + name) {
        //change name
        thisObj.name = 'table_' + name;

        //re-enable rotation
        thisObj.hasControls = true;
        that.createTable();
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
  
}

F.init = function() {
  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');
  canvas.selection = true;

  var tableShort = new Table(canvas, 'short', 50, 50, 20, 45 );
  var tableLong = new Table(canvas, 'long', 200, 50, 20, 45 );

  F.createSeparator(canvas);
  F.initEvents(canvas);
}

$(document).ready(function() {

	F.init();
	
});

//rect.set('selectable', true); // make object selectable
//Table1.setControlsVisibility({mtr: false}) //disable rotation
