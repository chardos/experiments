
// add other tables
// get it into rails app
// save to db via ajax

var F = {}

F.vars = {
	
};

function Table(canvas, name, left, top, width, height){
  //this.name = name;

  var that = this;
  this.createTable = function(){
    console.log('creating table');
    that['table' + name] = new fabric.Rect({
      name: 'table_' + name,
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
      if (options.target && options.target.name == 'table_' + name) {
        //change name
        console.log('an object was modified!');
        thisObj.name = 'table1';

        //re-enable rotation
        //thisObj.setControlsVisibility({mtr: true})
        thisObj.hasControls = true;
        p = that
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


F.createTable1 = function(canvas){
  var Table1 = new fabric.Rect({
    name: 'Table1',
    left: 50,
    top: 50,
    fill: 'green',
    width: 20,
    height: 45
  });
  Table1.hasControls = false;
  canvas.add(Table1);

  


}
F.createTable2 = function(canvas){
  var Table2 = new fabric.Rect({
    name: 'Table2',
    left: 100,
    top: 50,
    fill: 'red',
    width: 20,
    height: 45
  });
  Table2.hasControls = false;
  canvas.add(Table2);
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


  //F.createTable1(canvas);
  F.createTable2(canvas);
  F.createSeparator(canvas);
  F.initEvents(canvas);
}

$(document).ready(function() {

	F.init();
	
});

//rect.set('selectable', true); // make object selectable
//Table1.setControlsVisibility({mtr: false}) //disable rotation
