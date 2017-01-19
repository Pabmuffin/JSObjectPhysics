physics = {
	
	vars:{
		interval:"",
		boundary:550,
		terminalVelocity:40,
		acceleration:1,
		rollingResistanceFactor:0.99,
		bounceFactor:0.70,
		balls: [],
	},
	
	start:function(){
		if(physics.vars.interval){
			physics.reset();
		}
		physics.vars.interval = setInterval(physics.moveObjects, 10, physics.vars.balls);
	},
	
	stop:function(){
		clearInterval(physics.vars.interval);
		physics.vars.interval = false;
	},
	iterate:function(){
		physics.stop();
		physics.moveObjects(physics.vars.balls);
	},
	
	reset:function(){
		physics.stop();
		physics.vars.balls = [];
		//physics.addBall({h:{pos:260, speed:30, acc:0}, v:{pos:260, speed:100, acc:1}, elem:document.getElementById("blueb")});
		//physics.addBall({h:{pos:290, speed:100, acc:1}, v:{pos:290, speed:0, acc:0}, elem:document.getElementById("greenb")});
		//physics.addBall({h:{pos:260, speed:0, acc:0}, v:{pos:290, speed:-100, acc:-1}, elem:document.getElementById("redb")});
		//physics.addBall({h:{pos:290, speed:-100, acc:-1}, v:{pos:260, speed:10, acc:0}, elem:document.getElementById("orangeb")});
		physics.addBall({h:{pos:290, speed:0, acc:0}, v:{pos:260, speed:0, acc:1}, elem:document.getElementById("orangeb")});
	},
	
	moveObjects:function(objects){
		for(i = 0; i<objects.length; i++){
			physics.advanceObject(objects[i]);
		}
	},

	addBall:function(ball){
		ball.isInSquishingState = false;
		physics.vars.balls.push(ball);
		physics.placeBall(ball);
	},
	
	placeBall:function(ball){
		ball.elem.style.top = ball.v.pos + 'px'; 
		ball.elem.style.left = ball.h.pos + 'px';
	},
	
	advanceObject:function(ball){
		if (ball.isInSquishingState)
		{
			iterateSquish(ball);
		}
		else
		{
			physics.calculateAxis(ball.v, ball.h);
			physics.calculateAxis(ball.h, ball.v);
		}
		physics.placeBall(ball); 
	},
	iterateSquish:function(ball){
		if(ball.isCompressing) //iterate compression
		{
		//	ball.elem.style.width = 


		}
		else //iterate decompression
		{

		}
	},
	calculateAxis:function(axis, axis2){

		var nextPos = axis.pos + axis.speed;

		if (nextPos >= physics.vars.boundary) //If we have hit the right wall
		{
			axis.pos = physics.vars.boundary;
			if( Math.abs(axis.speed) < 1 ) //If the ball is coming to a stop on the right wall
			{
				axis.speed = 0;
			}
			else
			{
				axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			}

			//Rolling resistance: Friction when the ball hits the right wall
			axis2.speed = axis2.speed * physics.vars.rollingResistanceFactor;
		}
		else if (nextPos <= 0) //If we have hit the left wall
		{
			axis.pos = 0;
			if( Math.abs(axis.speed) < 1 ) //If the ball is coming to a stop on the left wall
			{
				axis.speed = 0;
			}
			else
			{
				axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			}

			//Rolling resistance: Friction when the ball hits the left wall
			axis2.speed = axis2.speed * physics.vars.rollingResistanceFactor;
		}
		else
		{
			if (axis.speed < physics.vars.terminalVelocity)
			{
				axis.speed += axis.acc;
			}
			axis.pos = axis.pos + axis.speed;
		}
	},
}

physics.reset();
