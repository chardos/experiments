
var W = {}

W.vars = {
	
};

W.initializeDOMVars = function(){

}

W.init = function() {
  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');
  canvas.selection = true;


  var Table1 = new fabric.Rect({
    name: 'Table1',
    left: 50,
    top: 50,
    fill: 'green',
    width: 20,
    height: 45,
  });
  Table1.setControlsVisibility({mtr: false})


  // "add" rectangle onto canvas
  canvas.add(Table1);

  //on click event
  canvas.on('mouse:down', function(options) {
    if (options.target) {
      console.log('an object was clicked! ', options.target);
      options.target.setControlsVisibility({mtr: false})
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
      //recreate original
    }
  });


}
	


$(document).ready(function() {

	W.init();
	
});




  //rect.set('selectable', true); // make object unselectable
