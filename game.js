/** SETTINGS **/
var moves = -1;
var map = new Array();
//var colors = ['red','blue','yellow','green','pink','purple'];
var colors = ['red','blue','yellow','green'];
var turn  = 0;
		
var WIDTH = 15;
var HEIGHT = 15;

var RED = 0;
var BLUE = 1;
var YELLOW = 2;
var GREEN = 3;
var PINK = 4;
var PURPLE = 5;

var HUMAN = 1;
var COMPUTER = 2;

var myColor = -1;
var compColor = -1;
/****************/

$(document).ready(function()
{
	//SETUP THE MAP
	
	$('#game').css('width',WIDTH*40);	
	for(var x=0;x<WIDTH;x++)
	{
		map[x] = new Array();
		for(var y=0;y<HEIGHT;y++)
		{
			var random = Math.floor(Math.random()*colors.length);
			var assigned = 0;
			if(x==0 && y==0)
			{
				assigned = HUMAN;
				myColor = random;
			}
			
			if(x == (WIDTH-1) && y == (HEIGHT-1))
			{
				assigned = COMPUTER;
				compColor = random;
			}
			var obj = new Object();
			obj.color = random;
			obj.assigned = assigned;
			obj.x = x;
			obj.y = y;
			
			map[x][y] = obj;
			$('#game').append('<div id="x'+x+'y'+y+'" class="block ' + colors[random] + '">');
		}
	}
	
	//Assign all the connecting colors in the begging
	ChangeColor(myColor);
	ChangeComputerCol(compColor);

	
	/* Comp vs. Comp */
	//CompVsComp();
	
	
	
	/**** SETUP PLAYING BUTTONS ****/
	$('#buttons .red').click(function()
	{
		if(myColor != RED && compColor != RED)
		{
			ChangeColor(RED);
			ComputerMove();
			
			CheckBoard();
		}
	});
	
	$('#buttons .yellow').click(function()
	{
		if(myColor != YELLOW && compColor != YELLOW)
		{
			ChangeColor(YELLOW);
			ComputerMove();
			
			CheckBoard();
		}
	});
	
	$('#buttons .blue').click(function()
	{
		if(myColor != BLUE && compColor != BLUE)
		{
			ChangeColor(BLUE);
			ComputerMove();
			
			CheckBoard();
		}
	});
	
	$('#buttons .green').click(function()
	{
		if(myColor != GREEN && compColor != GREEN)
		{
			ChangeColor(GREEN);
			ComputerMove();
			
			CheckBoard();
		}
	});

	$('#buttons .pink').click(function()
			{
				if(myColor != PINK && compColor != PINK)
				{
					ChangeColor(PINK);
					ComputerMove();
					
					CheckBoard();
				}
			});
	$('#buttons .purple').click(function()
			{
				if(myColor != PURPLE && compColor != PURPLE)
				{
					ChangeColor(PURPLE);
					ComputerMove();
					
					CheckBoard();
				}
			});
});


/**
 * Runs a computer vs. another computer algorithm
 */
function CompVsComp()
{
	if(!CheckBoard())
	{
		if(turn == 0)
		{
			ComputerMove();
			turn = 1;
		}
		else
		{
			ComputerMove2();
			turn = 0;
		}
		setTimeout("CompVsComp()",200);
	}
}

/**
 * Finds the best move for the computer
 */
var movChanger = 1;
function ComputerMove()
{	
	//GREEDY TOWARDS THE CENTER
	var minDist = 10000000;
	var bestCol = -1;
	
	//Find the nearest block owned by us to the center and change color to the next nearest block to the center
	for(var x=(WIDTH-2);x>=0;x--)
	{
		for(var y=(HEIGHT-2);y>=0;y--)
		{
			var obj = map[x][y];
			var center = map[Math.floor(WIDTH/2) - 1][Math.floor(HEIGHT/2)-1];
			
			if(obj.assigned == COMPUTER && center.assigned == 0)
			{
				//What is the distance of this block to our "center"
				var dist = Math.sqrt(((obj.x - (Math.floor(WIDTH/2) - 1 ))^2) + ((obj.y - (Math.floor(HEIGHT/2) - 1 ))^2));
				if(dist < minDist)
				{
					
					//Alternate between going up and going left
					var tempObj;
					if(movChanger == 1)
					{
						tempObj = map[x][y-1];
						moveChanger = 0;
					}
					else
					{
						tempObj = map[x-1][y];
						moveChanger = 1;
					}
					
					//Make sure we have the right color
					if(tempObj.color != myColor && tempObj.color != compColor)
					{
						bestCol = tempObj.color;
					}
					
					//Save the minimum distance
					minDist = dist;
				}
			}
		}
	}
	
	
	if(bestCol == -1)
	{
		//FIND MY BEST MOVE
		var bestMove = new Array();
		for(var col=0;col<colors.length;col++)
		{
			var moveCount = 0;
			var temps = new Array();
			
			for(var x=WIDTH-1;x>=0;x--)
			{
				for(var y=HEIGHT-1;y>=0;y--)
				{
					var obj = map[x][y];
					if(obj.assigned == COMPUTER)
					{
						if(x > 0)
						{
							var tempObj = map[x-1][y];
							if(tempObj.assigned == 0 && tempObj.color == col)
							{
								moveCount++;
								
								tempObj.assigned = COMPUTER;
								coords = new Object();
								coords.x = tempObj.x;
								coords.y = tempObj.y;
								temps.push(coords);
							}
						}
						
						if(x < WIDTH-1)
						{
							var tempObj = map[x+1][y];
							if(tempObj.assigned == 0 && tempObj.color == col)
							{
								moveCount++;	
								
								tempObj.assigned = COMPUTER;
								coords = new Object();
								coords.x = tempObj.x;
								coords.y = tempObj.y;
								temps.push(coords);
							}
						}
						
						if(y > 0)
						{
							var tempObj = map[x][y-1];
							if(tempObj.assigned == 0 && tempObj.color == col)
							{
								moveCount++;		
								
								tempObj.assigned = COMPUTER;
								coords = new Object();
								coords.x = tempObj.x;
								coords.y = tempObj.y;
								temps.push(coords);
							}
						}
						
						if(y < HEIGHT-1)
						{
							var tempObj = map[x][y+1];
							if(tempObj.assigned == 0 && tempObj.color == col)
							{
								moveCount++;			
								
								tempObj.assigned = COMPUTER;
								coords = new Object();
								coords.x = tempObj.x;
								coords.y = tempObj.y;
								temps.push(coords);
							}
						}
						
					}
				}
			}
			bestMove[col] = moveCount;
			
			//reset
			for(var i=0;i<temps.length;i++)
			{
				var coords = temps[i];
				var obj = map[coords.x][coords.y];
				obj.assigned = 0;
			}
		}
		
		var maxCount = 0;
		for(var i=0;i<colors.length;i++)
		{
			if(bestMove[i] > maxCount && i != myColor && i != compColor)
			{
				bestCol = i;
				maxCount = bestMove[i];
			}
		}
	}
	
	if(bestCol == -1)
	{
		var t = 1;
		bestCol = (compColor + t) % colors.length;
		while(bestCol == compColor || bestCol == myColor )
		{
			bestCol = (compColor + t) % 4;
			t++;
		} 
	}
	
	ChangeComputerCol(bestCol);

}

/**
 * Finds the best move for algorithm 2
 */
function ComputerMove2()
{	

	var bestCol = -1;
	//FIND MY BEST MOVE
	var bestMove = new Array();
	
	
	
	for(var col=0;col<colors.length;col++)
	{
		var moveCount = 0;
		var temps = new Array();
		for(var x=0;x<WIDTH;x++)
		{
			for(var y=0;y<HEIGHT;y++)
			{
				var obj = map[x][y];
				if(obj.assigned == HUMAN)
				{
					if(x > 0)
					{
						var tempObj = map[x-1][y];
						if(tempObj.assigned == 0 && tempObj.color == col)
						{
							moveCount++;
							
							tempObj.assigned = HUMAN;
							coords = new Object();
							coords.x = tempObj.x;
							coords.y = tempObj.y;
							temps.push(coords);
						}
					}
					
					if(x < WIDTH-1)
					{
						var tempObj = map[x+1][y];
						if(tempObj.assigned == 0 && tempObj.color == col)
						{
							moveCount++;

							tempObj.assigned = HUMAN;
							coords = new Object();
							coords.x = tempObj.x;
							coords.y = tempObj.y;
							temps.push(coords);
						}
					}
					
					if(y > 0)
					{
						var tempObj = map[x][y-1];
						if(tempObj.assigned == 0 && tempObj.color == col)
						{
							moveCount++;
							
							tempObj.assigned = HUMAN;
							coords = new Object();
							coords.x = tempObj.x;
							coords.y = tempObj.y;
							temps.push(coords);
						}
					}
					
					if(y < HEIGHT-1)
					{
						var tempObj = map[x][y+1];
						if(tempObj.assigned == 0 && tempObj.color == col)
						{
							moveCount++;
							
							tempObj.assigned = HUMAN;
							coords = new Object();
							coords.x = tempObj.x;
							coords.y = tempObj.y;
							temps.push(coords);
						}
					}

				}
			}
		}
		bestMove[col] = moveCount;
		
		//reset
		for(var i=0;i<temps.length;i++)
		{
			var coords = temps[i];
			var obj = map[coords.x][coords.y];
			obj.assigned = 0;
		}
	}
	
	
	var maxCount = 0;
	for(var i=0;i<colors.length;i++)
	{
		if(bestMove[i] > maxCount && i != myColor && i != compColor)
		{
			bestCol = i;
			maxCount = bestMove[i];
		}
	}
	
	//FUCK IT RANDOM IT IS
	if(bestCol == -1)
	{
		var t = 1;
		bestCol = (compColor + t) % colors.length;
		while(bestCol == compColor || bestCol == myColor )
		{
			bestCol = (compColor + t) % 4;
			t++;
		} 
	}
	
	//we are like human :( 
	ChangeColor(bestCol);
}

/**
 * Change color of the computer and assign other blocks
 */
function ChangeComputerCol(bestCol)
{
	compColor  = bestCol;
	for(var x=WIDTH-1;x>=0;x--)
	{
		for(var y=HEIGHT-1;y>=0;y--)
		{
			var obj = map[x][y];
			if(obj.assigned == COMPUTER)
			{
				if(obj.color != bestCol)
				{
					$('#x'+obj.x+'y'+obj.y).addClass(colors[bestCol]);
					$('#x'+obj.x+'y'+obj.y).removeClass(colors[obj.color]);
					obj.color = bestCol;
				}
				
				
				if(x > 0)
				{
					var tempObj = map[x-1][y];
					if(tempObj.assigned == 0 && tempObj.color == bestCol)
					{
						tempObj.assigned = COMPUTER;								
					}
				}
				
				if(x < WIDTH-1)
				{
					var tempObj = map[x+1][y];
					if(tempObj.assigned == 0 && tempObj.color == bestCol)
					{
						tempObj.assigned = COMPUTER;								
					}
				}
				
				if(y > 0)
				{
					var tempObj = map[x][y-1];
					if(tempObj.assigned == 0 && tempObj.color == bestCol)
					{
						tempObj.assigned = COMPUTER;								
					}
				}
				
				if(y < HEIGHT-1)
				{
					var tempObj = map[x][y+1];
					if(tempObj.assigned == 0 && tempObj.color == bestCol)
					{
						tempObj.assigned = COMPUTER;								
					}
				}

			}
		}
	}
}

/**
 * change color of human and assign colors
 */
function ChangeColor(col)
{
	moves++;
	$('#score').html('Moves: '+moves);
	
	myColor  = col;
	for(var x=0;x<WIDTH;x++)
	{
		for(var y=0;y<HEIGHT;y++)
		{
			var obj = map[x][y];
			if(obj.assigned == HUMAN)
			{
				if(obj.color != col)
				{
					$('#x'+obj.x+'y'+obj.y).addClass(colors[col]);
					$('#x'+obj.x+'y'+obj.y).removeClass(colors[obj.color]);
					obj.color = col;
				}
				
				
				if(x > 0)
				{
					var tempObj = map[x-1][y];
					if(tempObj.assigned == 0 && tempObj.color == col)
					{
						tempObj.assigned = HUMAN;								
					}
				}
				
				if(x < WIDTH-1)
				{
					var tempObj = map[x+1][y];
					if(tempObj.assigned == 0 && tempObj.color == col)
					{
						tempObj.assigned = HUMAN;								
					}
				}
				
				if(y > 0)
				{
					var tempObj = map[x][y-1];
					if(tempObj.assigned == 0 && tempObj.color == col)
					{
						tempObj.assigned = HUMAN;								
					}
				}
				
				if(y < HEIGHT-1)
				{
					var tempObj = map[x][y+1];
					if(tempObj.assigned == 0 && tempObj.color == col)
					{
						tempObj.assigned = HUMAN;								
					}
				}

			}
		}
	}
}

/**
 * Are we done yet?
 */
function CheckBoard()
{
	var compAssigned = 0;
	var humanAssigned = 0;
	
	for(var x=0;x<WIDTH;x++)
	{
		for(var y=0;y<HEIGHT;y++)
		{
			var obj = map[x][y];
			
			if(obj.assigned == 0)
			{
				return false;
			}
			else if(obj.assigned == HUMAN)
			{
				humanAssigned++;
			}
			else if(obj.assigned == COMPUTER)
			{
				compAssigned++;
			}
			
		}
	}
	
	alert('YOU: ' + Math.floor((humanAssigned/(WIDTH*HEIGHT))*100) + '% COMPUTER: ' + Math.floor((compAssigned/(WIDTH*HEIGHT))*100) + '%');
	return true;
}