function myMove()
{
  var elem = document.getElementById("animate");   
  var hPos = 0;
  var vPos = 1;
  //var id = setInterval(frame, 5);
  var id = setInterval(advanceObject, 10);
  var movingRight = true;
  var movingDown = true;
  var hSpeed = 0;
  var vSpeed = 0;
  var hBoundary = 950;
  var vBoundary = 850;
  var terminalVelocity = 40;
  var acceleration = 1;
  // function frame() {
    // if (pos == 350) {
      // clearInterval(id);
    // } else {
      // pos++; 
      // elem.style.top = pos + 'px'; 
      // elem.style.left = pos + 'px'; 
    // }
  // }
  
  function advanceObject() {
	  if (hPos + hSpeed >= hBoundary)
	  {
		  hPos = hBoundary;
		  hSpeed = -1 * hSpeed;
	  }
	  else if (hPos + hSpeed <= 0)
	  {
		  hPos = 0;
		  hSpeed = -1 * hSpeed;
	  }
	  else{
		  hPos = hPos + hSpeed;
	  }
	  if (vPos + vSpeed >= vBoundary)
	  {
		  vPos = vBoundary;
		  vSpeed = -1 * vSpeed * 0.70;
	  }
	  else if (vPos + vSpeed <= 0)
	  {
		  vPos = 0;
		  vSpeed = -1 * vSpeed;
	  }
	  else{
		  if (vSpeed < terminalVelocity)
		  {
			  vSpeed+= acceleration;
		  }
		  vPos = vPos + vSpeed;

	  }
	  if (vSpeed == 0)
	  {
		  console.log("vPos: " + vPos);
	  }
	  console.log("vSpeed: " + vSpeed);


	  //console.log(vSpeed);
	  elem.style.top = vPos + 'px'; 
      elem.style.left = hPos + 'px'; 
  }

}
