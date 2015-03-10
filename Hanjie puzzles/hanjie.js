/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Tutorial Case

   Author: Steven Croft
   Date:   July 2014

   Function List
   =============

   init()
      Run when the Web page is loaded; displays puzzle 1
      and loads the event handlers for the Web page buttons.

   swapPuzzle()
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setupPuzzle()
      Sets up a new puzzle, adding the onclick event handlers for
      every puzzle cell.

   changeBackground()
      Changes the cell background from gold to gray to white and
      back to gold again. Checks the puzzle for a complete solution.

   peek()
      Temporarily displays incorrect cells. In correct white cell are
      displayed in pink; incorrect gray cells are displayed in red.

   unpeek()
      Returns the puzzle to its original state prior to peeking.

   showSolution()
      Removes all inline background color styles from the puzzle, showing
      the complete solution.

   checkSolution()
      Checks the current state of the puzzle, determining whether it
      respreents a complete solution.

   drawGrid(puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.

*/

//Run the init() function when the browser loads the page
window.onload = init;

function init()
{
	//write teh first puzzle data into the web page
	document.getElementsByTagName("h1")[0].innerHTML = "Hanjie Puzzle 1";
	document.getElementById("hint").innerHTML = puzzle1Hint;
	document.getElementById("rating").innerHTML = puzzle1Rating;

	//Display the first puzzle using the draGrid() function
	document.getElementById("puzzle").innerHTML = drawGrid(puzzle1);

	//add event handlers for the puzzle buttons
	var puzzleButtons = document.getElementsByClassName("puzzles");

	for (var i = 0; i < puzzleButtons.length; i++)
	{
		puzzleButtons[i].onclick = swapPuzzle;
	}

	//set up the initial appearance of the first puzzle
	setupPuzzle();

	//add an event handler to the peek! button
	document.getElementById("peek").onclick = peek;

	//add an event handler to the show solution button
	document.getElementById("solve").onclick = showSolution;
}

function swapPuzzle()
{
	if (confirm("You will lose all of your work on the puzzle! Continue?"))
	{
		//determine the puzzle to show based on the button's id value
		var title = "Hanjie " + this.value;
		var hint = eval(this.id + "Hint");
		var rating = eval(this.id + "Rating");
		var puzzle = eval(this.id);

		//write teh puzzle data into the web page
		document.getElementsByTagName("h1")[0].innerHTML = title;
		document.getElementById("hint").innerHTML = hint;
		document.getElementById("rating").innerHTML = rating;

		//Display the puzzle using the draGrid() function
		document.getElementById("puzzle").innerHTML = drawGrid(puzzle);

		//set up the initial appearance of the puzzle
		setupPuzzle();
	}
}

function setupPuzzle()
{
	//match all of the data cells in the puzzle
	var puzzleCells = document.querySelectorAll("#hanjieGrid td");

	//set the initial color of each cell to gold
	for (var i = 0; i < puzzleCells.length; i++)
	{
		puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";

		//change the color with each click
		puzzleCells[i].onclick = changeBackground;
	}
}

function changeBackground ()
{
	//determine the current background color of the data cell
	var bColor = this.style.backgroundColor;

	/* if the color is gold, make it dark gray; if the color is dark gray, change it to white
	if the color is white change it back to gold */
	if (bColor == "rgb(233, 207, 29)") bColor = "rgb(101, 101, 101)"
	else if (bColor == "rgb(101, 101, 101)") bColor = "white"
	else bColor = "rgb(233, 207, 29)";

	//apply the new background color to the data cell
	this.style.backgroundColor = bColor

	//check the puzzle solution
	checkSolution();
}

function peek()
{
	//create collection of cells that should be marked
	var markedCells = document.querySelectorAll("#hanjieGrid td.marked");

	//create collection of cells that should be empty
	var emptyCells = document.querySelectorAll("#hanjieGrid td.empty");

	//display every incorrect white cell in pink
	for (var i = 0; i < markedCells.length; i++)
	{
		cell = markedCells[i];
		if (cell.style.backgroundColor == "white")
		cell.style.backgroundColor = "rgb(255, 192, 192)";
	}

	//display every incorrect darkened cell in red
	for (var i = 0; i < emptyCells.length; i++)
	{
		var cell = emptyCells[i];
		if (cell.style.backgroundColor == "rgb(101, 101, 101)")
		cell.style.backgroundColor = "red";
	}

	//remove the hints after 0.5 seconds
	setTimeout("unpeek()", 500);
}

function unpeek()
{
	//create collection of all puzzle data cells
	var allCells = document.querySelectorAll("#hanjieGrid td");

	//change all pink cells back to white and change all red back to dark gray
	for (var i = 0; i < allCells.length; i++)
	{
		var cell = allCells[i];
		if (cell.style.backgroundColor == "rgb(255, 192, 192)")
		cell.style.backgroundColor = "white";
		if (cell.style.backgroundColor == "red")
		cell.style.backgroundColor = "rgb(101, 101, 101)";
	}
}

function showSolution()
{
	//create a collection of all puzzle data cells
	var allCells = document.querySelectorAll("#hanjieGrid td");

	//remove the inline style colors from each cell, leaving only the default external style sheet colors
	for (var i = 0; i < allCells.length; i++)
	{
		allCells[i].style.backgroundColor = "";
	}
}

function checkSolution()
{
	//create a collection of all puzzle cells
	var allCells = document.querySelectorAll("#hanjieGrid td");

	//set the initial solved state of the puzzle to true
	var solved = true;

	// loop through the puzzle cells, exiting when and incorrect cell is found, setting solved to false
	for (var i = 0; i < allCells.length; i++)
	{
		var cellColor = allCells[i].style.backgroundColor;
		var cellClass = allCells[i].className;

		//a cell is incorrect if it is in the marked class and is gray or in empty class and not white
		if ((cellClass == "marked" && cellColor !== "rgb(101, 101, 101)") ||
		(cellClass == "empty" && cellColor !== "white"))
		{
			solved = false;
			break;
		}
	}

	//if solved is still true after the loop display alert box
	if (solved) alert("Congratulations! You solved the puzzle!");
}

function drawGrid(puzzle) {

   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (j == totalCols-1) rowCount[i] += spaceCount + "&nbsp;&nbsp;";
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            }
         }
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (i == totalRows-1) colCount[j] += spaceCount + "<br />";
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            }
         }
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'><tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] == "#") htmlString += "<td  class='marked'></td>"
         else htmlString += "<td class='empty'></td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
