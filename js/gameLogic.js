//Lists of constants that should only be modified in the source code
var UPDATE_INTERVAL = 500;


//lists of global state for testing
var y = 0;
var x = 0;

function startGame()
{
	//enter fullscreen mode if possible
	var cvs = document.getElementById("theCanvas");
	if(goFullScreen(cvs))
	{
		document.getElementById("theCanvas").width = window.innerWidth;//TODO this shouldn't be window
		document.getElementById("theCanvas").height = window.innerHeight;
	}
	setInterval("update()", UPDATE_INTERVAL);
}

function update()
{
	var c = document.getElementById("theCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(x,y,x+150,y+75);
	x += 5;
	y += 5;
}

function goFullScreen(i)
{
	if (i.requestFullscreen) 
	{
    	i.requestFullscreen();
	} 
	else if (i.webkitRequestFullscreen) 
	{
    	i.webkitRequestFullscreen();
	} 
	else if (i.mozRequestFullScreen) 
	{
    	i.mozRequestFullScreen();
	} 
	else if (i.msRequestFullscreen) 
	{
    	i.msRequestFullscreen();
	}
	else
	{
		return false;
	}
	return true;
}