/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 12
   Tutorial Case

   Author: Steven Croft
   Date:  July 2014

   Function List:
   calendar(calendarDay)
      Creates the calendar table for the month specified in the
      calendarDay parameter. The current date is highlighted in
      the table.

   writeCalTitle(calendarDay)
      Writes the title row in the calendar table

   writeDayTitle()
      Writes the weekday title rows in the calendar table

   daysInMonth(calendarDay)
      Returns the number of days in the month from calendarDay

   writeCalDays(calendarDay)
      Writes the daily rows in the calendar table, highlighting
      calendarDay

*/

function calendar(dateString)
{
	//date that the monthly calendar is based on
	if (dateString == null) calDate = new Date()
	else calDate = new Date(dateString);

	document.write("<table id = 'calendar_table'>");

	//write the header row of the calendar table
	writeCalTitle(calDate);

	//write the row of the weekday abbreviations
	writeDayNames();

	//write the calendar days
	writeCalDays(calDate);

	document.write("</table>");
}

function writeCalTitle(calendarDay)
{
	/* The caledarDay parameter contains a date object that the calendar is based upon */

	//monthName contains an array of month names
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August",
					"September", "October", "November", "December"];

	/*The thisMonth variable contains the calendar month number,
	the thisYear variable contains the 4-digit year value*/
	var thisMonth = calendarDay.getMonth();
	var thisYear = calendarDay.getFullYear();

	//write the table header row of the calendar table
	document.write("<tr>");
	document.write("<th id='calendar_head' colspan='7'>");
	document.write(monthName[thisMonth] + " " + thisYear);
	document.write("</th>");
	document.write("</tr>");
}

function writeDayNames ()
{
	//array of weekday abbreviations
	var dayName = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	//start a table row of the weekday abbreviations
	document.write("<tr>");

	//loop through the dayName array
	for (var i = 0; i < dayName.length; i++)
	{
		document.write("<th class='calendar_weekdays'> " + dayName[i] + "</th>");
	}

	//end the table row
	document.write("</tr>");
}

function daysInMonth(calendarDay)
{
	//array of days in each month
	var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];

	//extract the four digit year value from calendarDay
	var thisYear = calendarDay.getFullYear();

	//extract the month value from calenderDay
	var thisMonth = calendarDay.getMonth();

	//revise the days in feb for leap years
	if (thisYear % 4 == 0)
	{
		if ((thisYear % 100 != 0) || (thisYear % 400 == 0))
		{
			dayCount[1] = 29;
		}
	}

	//return the number of days for the current month
	return dayCount[thisMonth];
}

function writeCalDays(calendarDay)
{
	//determine the starting day of the month
	var day = new Date(calendarDay.getFullYear(), calendarDay.getMonth(), 1);
	var weekDay = day.getDay();

	//write blank cells preceding the starting day
	document.write("<tr>");
	for (var i = 0; i < weekDay; i++)
	{
		document.write("<td></td>");
	}

	//write cells for each day of the month
	var totalDays = daysInMonth(calendarDay);
	var highlightDay = calendarDay.getDate();

	for (var i = 1; i <= totalDays; i++)
	{
		//move to the next day in the month
		day.setDate(i);
		weekDay = day.getDay();

		if (weekDay == 0) document.write("<tr>"); // start a new row on sunday

		//test if the day being written matches the calendar day
		if (i == highlightDay)
		{
			document.write("<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] +"</td>");
		}
		else
		{
			document.write("<td class='calendar_dates'>" + i + dayEvent[i] +"</td>");
		}

		if (weekDay == 6) document.write("</tr>"); //end the row on saturday
	}
}