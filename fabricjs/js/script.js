
// allow deleting of the objects
// get it into rails app
// save objects to db via ajax

var F = {}

F.vars = {
	
};

function Table(o){

  var that = this;
  this.createTable = function(){

    var imgElement = document.getElementById(o.imageId);
    that['table' + name] = new fabric.Image(imgElement, {
      name: 'Table_' + o.name,
      left: o.x,
      top: o.y,
      width: o.width,
      height: o.height
    });

    canvas.add(that['table' + name]);
    this['table' + name].hasControls = false;
  }

  this.createTable();

  canvas.on('object:modified', function(options) {
    console.log('mod');
    thisObj = options.target;

    if ( thisObj.top > 100 ){ // check dropped below separator
      console.log(options.target.name);
      console.log('Table_' + name);
      if (options.target && options.target.name == 'Table_' + o.name) {
        //change name
        thisObj.name = 'table_' + o.name;

        //re-enable rotation
        thisObj.hasControls = true;
        console.log('create table now');
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

F.deletable = function(){
  window.onkeydown = onKeyDownHandler;
  function onKeyDownHandler(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
      var activeObject = canvas.getActiveObject();
      if (activeObject) canvas.remove(activeObject);
      return;
    }
  };
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
  canvas = new fabric.Canvas('c');
  canvas.selection = true;

  F.deletable();

  var tableShort = new Table({
    name: 'c', 
    x: 50, 
    y: 30, 
    width: 14, 
    height: 51, 
    imageId: 'table_c' 
  } );
  var tableLong = new Table({
    name: 'straight', 
    x: 200, 
    y: 40, 
    width: 10, 
    height: 38, 
    imageId: 'straight' 
  });

  F.createSeparator(canvas);
  F.initEvents(canvas);
}

$(document).ready(function() {

	F.init();
	
});

//rect.set('selectable', true); // make object selectable
//Table1.setControlsVisibility({mtr: false}) //disable rotation
