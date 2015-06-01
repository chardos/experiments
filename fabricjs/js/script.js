
var W = {}

W.vars = {
	
};

W.createTable1 = function(canvas){
  var Table1 = new fabric.Rect({
    name: 'Table1',
    left: 50,
    top: 50,
    fill: 'green',
    width: 20,
    height: 45,
  });
  Table1.setControlsVisibility({mtr: false})
  canvas.add(Table1);
}

W.init = function() {
  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');
  canvas.selection = true;

  W.createTable1(canvas);
  

  //on click event
  canvas.on('mouse:down', function(options) {
    if (options.target) {
      console.log('an object was clicked! ', options.target);
    }
  });

  //on drag finish
  canvas.on('object:modified', function(options) {
    if (options.target && options.target.name == 'Table1') {
      //change name
      console.log('an object was modified!');
      options.target.name = 'table1';

      //enable rotation
      options.target.setControlsVisibility({mtr: true})
      W.createTable1(canvas);
    }
  });

}


$(document).ready(function() {

	W.init();
	
});




  //rect.set('selectable', true); // make object unselectable
