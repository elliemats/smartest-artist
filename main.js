// Add user interaction. Currently no change in application 
var color = $('.selected').css('background-color');
var $canvas = $('canvas');
var context = $canvas[0].getContext('2d');
var lastEvent;
var mouseDown = false;
// when clicking on control list items
// cannot be a normal .click jquery event because we will be dynamically adding more li (colored circles) later on that won't have the .click event tied to it -- must use on('click', 'li', ...)
$('.controls').on('click', 'li', function() {
  // deselect sibling elements 
  $(this).siblings().removeClass('selected')
  // select clicked item
  $(this).addClass('selected');
  // cache current color here
  color = $(this).css('background-color');
});

// when 'new color' is clicked  
$('#revealColorSelect').click(function(){
  // show color select or hide the color select 
  changeColor();
  $('#colorSelect').toggle();
});

// helper function
// update the new color span 
function changeColor() {
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
}

// when color sliders change (input thing is css3)
$('input[type=range]').change(changeColor);

  

// when 'add color' is pressed
$('#addNewColor').click(function(){
  var $newColor = $('<li></li>');
  // append the color to the controls ul 
  $newColor.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColor);
  // select new color after added 
  $newColor.click(); // triggers previous click event 
});

// on mouse events on canvas
// where clicked 
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
})

$canvas.mousemove(function(e) {
if(mouseDown) {  
context.beginPath();
context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
context.lineTo(e.offsetX, e.offsetY);
context.strokeStyle = color;
context.stroke();
lastEvent = e;
}
})

$canvas.mouseup(function() {
  mouseDown = false;
})

$canvas.mouseleave(function() {
  $canvas.mouseup();
})


// prevent line from continueing if off the canvas 




