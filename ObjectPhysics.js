function myMove()
{
  var ball1 = {hPos: 0, vPos: 1, hSpeed:10, vSpeed:0, elem:document.getElementById("ball1")};
  var id = setInterval(advanceObject, 10, ball1);
  var hBoundary = 950;
  var vBoundary = 850;
  var terminalVelocity = 40;
  var acceleration = 1;
  
  function advanceObject(ball) {
	  console.log("hello");
	  
	  if (ball.hPos + ball.hSpeed >= hBoundary) //If we have hit the right wall
	  {
		  ball.hPos = hBoundary;
		  if( Math.abs(ball.hSpeed) < 1 ) //If the ball is coming to a stop on the right wall
		  {
			  ball.hSpeed = 0;
		  }
		  else
		  {
		      ball.hSpeed = -1 * ball.hSpeed * 0.70;
		  }
	  }
	  else if (ball.hPos + ball.hSpeed <= 0) //If we have hit the left wall
	  {
		  ball.hPos = 0;
		  if( Math.abs(ball.hSpeed) < 1 ) //If the ball is coming to a stop on the left wall
		  {
			  ball.hSpeed = 0;
		  }
		  else
		  {
		      ball.hSpeed = -1 * ball.hSpeed * 0.70;
		  }
	  }
	  else
	  {
		  ball.hPos = ball.hPos + ball.hSpeed;
	  }
	  if (ball.vPos + ball.vSpeed >= vBoundary) //if we have hit the bottom wall.
	  {
		  ball.vPos = vBoundary;
		  if( Math.abs(ball.vSpeed) < 1 ) //if the ball is coming to a stop at the bottom
		  {
			  ball.vSpeed = 0;
		  }
		  else
		  {
			ball.vSpeed = -1 * ball.vSpeed * 0.70;
		  }
	  }
	  else if (ball.vPos + ball.vSpeed <= 0)
	  {
		  ball.vPos = 0;
		  ball.vSpeed = -1 * ball.vSpeed;
	  }
	  else{
		  if (ball.vSpeed < terminalVelocity)
		  {
			  ball.vSpeed += acceleration;
		  }
		  ball.vPos = ball.vPos + ball.vSpeed;
	  }

	  console.log("hello");
	  ball.elem.style.top = ball.vPos + 'px'; 
      ball.elem.style.left = ball.hPos + 'px'; 
  }
  function printObject(ball)
  {
	  console.log("printObject: hPos:" + ball.hPos + " vPos:" + ball.vPos + " hSpeed:" + ball.hSpeed + " vSpeed:" + ball.vSpeed);
  }

}
