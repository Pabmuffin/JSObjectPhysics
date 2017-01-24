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
		physics.addBall({h:{pos:290, speed:0, acc:0, width:50}, v:{pos:260, speed:0, acc:1, height:50}, elem:document.getElementById("orangeb")});
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
		ball.elem.style.width = ball.h.width + 'px';
		ball.elem.style.height = ball.v.height + 'px';
	},
	advanceObject:function(ball){
		if (ball.isInSquishingState)
		{
			console.log("isInSquishingState");
			physics.iterateSquish(ball);
		}
		else
		{
			console.log("!isInSquishingState");
			physics.calculateAxis(ball.v, ball.h, ball);
			physics.calculateAxis(ball.h, ball.v, ball);
		}
		physics.placeBall(ball); 
	},
	iterateSquish:function(ball){
		if(ball.isCompressing) //iterate compression
		{
			if(ball.h.width < 75)
			{
				ball.h.width++;
				ball.v.height--;
				ball.v.pos++;
				ball.h.pos-=1;
			}
			else //done compressing, switch to decompressing.
			{
				ball.isCompressing = false;
				console.log("Done compressing, Switching to decompressing");
			}
		}
		//if(!ball.isCompressing) //iterate decompression
		else
		{
			if(ball.h.width > 50)
			{
				ball.h.width--;
				ball.v.height++;
				ball.v.pos--;
				ball.h.pos+=1;
			}
			else //done decompressing, get out of squishing state
			{
				ball.isInSquishingState = false;
				console.log("Done decompressing, Switching out of squishing state");
			}
		}
	},
	incrementPxValue(orig, incrementBy){
		return orig.slice(0, -2) + incrementBy;
		
		
	},
	calculateAxis:function(axis, axis2, ball){

		var nextPos = axis.pos + axis.speed;

		if (nextPos >= physics.vars.boundary) //If we have hit the right/bottom wall
		{
			axis.pos = physics.vars.boundary;
			// if( Math.abs(axis.speed) < 1 ) //If the ball is coming to a stop on the right/bottom wall
			// {
				// axis.speed = 0;
			// }
			// else
			// {
				// axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			// }
			ball.isInSquishingState = true;
			ball.isCompressing = true;

			//Rolling resistance: Friction when the ball hits the right/bottom wall
			axis2.speed = axis2.speed * physics.vars.rollingResistanceFactor;
		}
		else if (nextPos <= 0) //If we have hit the left/upper wall
		{
			axis.pos = 0;
			if( Math.abs(axis.speed) < 1 ) //If the ball is coming to a stop on the left/upper wall
			{
				axis.speed = 0;
			}
			else
			{
				axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			}

			//Rolling resistance: Friction when the ball hits the left/upper wall
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
