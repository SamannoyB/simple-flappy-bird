	var canvas = document.getElementById("gameArea");
    	var canvasContext = canvas.getContext("2d");

    	var frameNumber = 0;
    	var score = 0;

    	var spacecraftX = 20;
    	var spacecraftY = 120;
    	var spacecraftWidth = 40;
    	var spacecraftHeight = 40;
    	var spacecraftSpeed = 0;
    	var gravity = 0.05;

    	var linesArray = [];
    	var interval = setInterval(runGame, 20);

    	class Line{
    		constructor(x, y, width, height)
    		{
    			this.x = x;
    			this.y = y;
    			this.width = width;
    			this.height = height;
    		}
    	} 

    	function runGame() 
    	{
    		for(i = 0; i < linesArray.length; i += 1)
    		{
    			if((spacecraftY + spacecraftHeight >= linesArray[i].y)&&
    				(spacecraftY <= linesArray[i].y + linesArray[i].height)&&
    				(spacecraftX + spacecraftWidth >= linesArray[i].x)&&
    				(spacecraftX <= linesArray[i].x + linesArray[i].width))
    			{
    				clearInterval(interval);
    				return;
    			}
    		}

    		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    		frameNumber++;

    		if(frameNumber == 1 || (frameNumber / 150) % 1 == 0) {
    			var minHeight = 20;
    			var maxHeight = 200;
    			var height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    			var minGap = 70;
    			var maxGap = 200;
    			var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

    			linesArray.push(new Line(canvas.width, 0, 5,height));
    			linesArray.push(new Line(canvas.width, height + gap, 5, canvas.height - height - gap));

    		}

    		canvasContext.fillStyle = "blue";

    		for(i = 0; i < linesArray.length; i += 1)
    		{
    			linesArray[i].x -= 1;
    			if(frameNumber % 201 <= 100)
    			{
    				if(i % 2 == 0)
    				{
                        linesArray[i].height += 1;
    				}
    				else
    				{
    					linesArray[i].y += 1;
    					linesArray[i].height -= 1;

    				}
    			}
    			else
    			{
    				if(i % 2 == 0)
    				{
                         linesArray[i].height -= 1;
    				}
    				else
    				{
                       linesArray[i].y -= 1;
                       linesArray[i].height += 1;
    				}

    			}
    			canvasContext.fillRect(linesArray[i].x, linesArray[i].y, linesArray[i].width, linesArray[i].height);
    		}

    		if((spacecraftX + spacecraftWidth >= linesArray[0].x)&&(frameNumber / 150) % 1 == 0) score += 50;
    		canvasContext.font = "16px tahoma";
    		canvasContext.fillStyle = "lime";
            canvasContext.fillText("Score: " + score, 20, 30);

    		spacecraftSpeed += gravity;
    		spacecraftY += spacecraftSpeed;
    		canvasContext.fillStyle = "red";
    		canvasContext.fillRect(spacecraftX, spacecraftY, spacecraftWidth, spacecraftHeight);

    		if(spacecraftY + spacecraftHeight >= canvas.height)
    		{
    			spacecraftY = canvas.height - spacecraftHeight;
    			canvasContext.fillRect(spacecraftX, spacecraftY, spacecraftWidth, spacecraftHeight);
    			clearInterval(interval);
    			return;
    		}
    		if(spacecraftY < 0)
    		{
    			spacecraftY = 0;
    			canvasContext.fillRect(spacecraftX, spacecraftY, spacecraftWidth, spacecraftHeight);
    			clearInterval(interval);
    			return;
    		}
    	}

    	document.addEventListener('keydown', function(e) { if(e.which === 38) gravity = -0.3; });
    	document.addEventListener('keyup', function(e) { if(e.which === 38) gravity = 0.05; });
