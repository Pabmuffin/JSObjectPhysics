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
	
	init:function(){
		physics.reset();
		document.onkeydown = physics.keys;
	},
	
	start:function(){
		physics.vars.interval = setInterval(physics.moveObjects, 30, physics.vars.balls);
	},
	
	stop:function(){
		clearInterval(physics.vars.interval);
	},
	
	reset:function(){
		physics.stop();
		physics.vars.balls = [];
		physics.addBall({h:{pos:260, speed:30, acc:0}, v:{pos:260, speed:100, acc:1}, elem:document.getElementById("js-blueb")});
		physics.addBall({h:{pos:290, speed:100, acc:1}, v:{pos:290, speed:0, acc:0}, elem:document.getElementById("js-greenb")});
		physics.addBall({h:{pos:260, speed:0, acc:0}, v:{pos:290, speed:-100, acc:-1}, elem:document.getElementById("js-redb")});
		physics.addBall({h:{pos:290, speed:-100, acc:-1}, v:{pos:260, speed:10, acc:0}, elem:document.getElementById("js-orangeb")});
	},
	
	shiftGravity:function(direction){
		
		vAcc = 0;
		hAcc = 0;
		
		switch(direction){
			case "up":
				vAcc = -1;
				break;
			case "down":
				vAcc = 1;
				break;			
			case "left":
				hAcc = -1;
				break;
			case "right":
				hAcc = 1;
				break;
			default: 
		}
		
		for(i = 0; i<physics.vars.balls.length; i++){
			physics.vars.balls[i].h.acc = hAcc;
			physics.vars.balls[i].v.acc = vAcc;
		}
		
	},
	
	keys:function(e){
		e = e || window.event;

    	if (e.keyCode == '38') {
        	physics.shiftGravity('up');
    	}
    	else if (e.keyCode == '40') {
			physics.shiftGravity('down');
    	}
    	else if (e.keyCode == '37') {
			physics.shiftGravity('left');
    	}
    	else if (e.keyCode == '39') {
			physics.shiftGravity('right');
    	}

	},
	
	moveObjects:function(objects){
		for(i = 0; i<objects.length; i++){
			physics.advanceObject(objects[i]);
		}
	},

	addBall:function(ball){
		physics.vars.balls.push(ball);
		physics.placeBall(ball);
	},
	
	placeBall:function(ball){
		ball.elem.style.top = ball.v.pos + 'px'; 
		ball.elem.style.left = ball.h.pos + 'px';
	},
	
	advanceObject:function(ball){
		physics.calculateAxis(ball.v, ball.h);
		physics.calculateAxis(ball.h, ball.v);
		physics.placeBall(ball); 
	},
	
	calculateAxis:function(axis, axis2){
	
		if (axis.speed < physics.vars.terminalVelocity)
		{
			axis.speed += axis.acc;
		}
				
		var nextPos = axis.pos + axis.speed;
		
		if (nextPos >= physics.vars.boundary)
		{
			axis.pos = physics.vars.boundary;
			if( Math.abs(axis.speed) < 1 )
			{
				axis.speed = 0;
			}
			else
			{
				axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			}

			axis2.speed = axis2.speed * physics.vars.rollingResistanceFactor;
		}
		else if (nextPos <= 0)
		{
			axis.pos = 0;
			if( Math.abs(axis.speed) < 1 )
			{
				axis.speed = 0;
			}
			else
			{
				axis.speed = -1 * axis.speed * physics.vars.bounceFactor;
			}

			axis2.speed = axis2.speed * physics.vars.rollingResistanceFactor;
		}
		else
		{
			axis.pos = nextPos;
		}

		
	},
}

physics.init();
