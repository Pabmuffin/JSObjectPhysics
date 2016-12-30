physics = {
	
	vars:{
		interval:"",
		hBoundary:750,
		vBoundary:750,
		terminalVelocity:40,
		acceleration:1,
		rollingResistanceFactor:0.99,
		balls: [],
	},
	
	start:function(){
		physics.vars.interval = setInterval(physics.moveObjects, 10, physics.vars.balls);
	},
	
	stop:function(){
		clearInterval(physics.vars.interval);
	},
	
	moveObjects:function(objects){
		for(i = 0; i<objects.length; i++){
			physics.advanceObject(objects[i]);
		}
	},

	addBall:function(ball){
		physics.vars.balls.push(ball);
	},
	
	advanceObject:function(ball) {

		if (ball.hPos + ball.hSpeed >= physics.vars.hBoundary) //If we have hit the right wall
		{
			ball.hPos = physics.vars.hBoundary;
			if( Math.abs(ball.hSpeed) < 1 ) //If the ball is coming to a stop on the right wall
			{
				ball.hSpeed = 0;
			}
			else
			{
				ball.hSpeed = -1 * ball.hSpeed * 0.70;
			}

			//Rolling resistance: Friction when the ball hits the right wall
			ball.vSpeed = ball.vSpeed * physics.vars.rollingResistanceFactor;
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

			//Rolling resistance: Friction when the ball hits the left wall
			ball.vSpeed = ball.vSpeed * physics.vars.rollingResistanceFactor;
		}
		else
		{
			ball.hPos = ball.hPos + ball.hSpeed;
		}
		
		if (ball.vPos + ball.vSpeed >= physics.vars.vBoundary) //if we have hit the bottom wall.
		{
			ball.vPos = physics.vars.vBoundary;
			if( Math.abs(ball.vSpeed) < 1 ) //if the ball is coming to a stop at the bottom
			{
				ball.vSpeed = 0;
			}
			else
			{
				ball.vSpeed = -1 * ball.vSpeed * 0.70;
			}

			//Rolling resistance: Friction when the ball hits the bottom wall.
			ball.hSpeed = ball.hSpeed * physics.vars.rollingResistanceFactor;
		}
		else if (ball.vPos + ball.vSpeed <= 0) //if we have hit the top wall.
		{
			ball.vPos = 0;
			ball.vSpeed = -1 * ball.vSpeed;

			//Rolling resistance: Friction when the ball hits the top wall.
			ball.hSpeed = ball.hSpeed * physics.vars.rollingResistanceFactor;
		}
		else{
			if (ball.vSpeed < physics.vars.terminalVelocity)
			{
				ball.vSpeed += physics.vars.acceleration;
			}
			ball.vPos = ball.vPos + ball.vSpeed;
		}

		ball.elem.style.top = ball.vPos + 'px'; 
		ball.elem.style.left = ball.hPos + 'px'; 
	},
}

physics.addBall({hPos: 0, vPos: 1, hSpeed:30, vSpeed:1, elem:document.getElementById("ball1")});
physics.addBall({hPos: 150, vPos: 1, hSpeed:0, vSpeed:5, elem:document.getElementById("ball2")});
physics.addBall({hPos: 350, vPos: 1, hSpeed:10, vSpeed:10, elem:document.getElementById("ball3")});
