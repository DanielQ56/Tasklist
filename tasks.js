
var storage = window.localStorage;

var checklist = document.getElementById("checklist");
var body = document.querySelector("body");

var cb = checklist.querySelectorAll("input[type='checkbox']");
var spans = checklist.querySelectorAll("span");
var textInputs = checklist.querySelectorAll("input[type='text']");

var date = document.getElementById("date");
var time = document.getElementById("time");


window.addEventListener("beforeunload", SaveTasklist);

ReadSavedTaskList();


var today = new Date();

date.innerHTML = "Today is " + today.toLocaleString('default', {month: 'long'}) + " " + today.getDate() + ", " + today.getFullYear();

setInterval(UpdateTime, 500)

for(var i = 0; i < cb.length; ++i)
{
	cb[i].addEventListener("click", CrossOffTask);
	spans[i].addEventListener("click", EditItemFromSpan);
	textInputs[i].addEventListener("click", EditItem);
	textInputs[i].addEventListener("blur", UpdateTextInput);
	textInputs[i].addEventListener("keydown", InputKeyPress);
}





/* 
Todo: 
	get input width to increase with text/decrease with text
	clear all button 
	do smth when all tasks are completed
	start with only one empty task
	button to add another empty task 
	button to delete a task 
*/





//Below are all functions

function UpdateTime()
{
	var d = new Date();
	var hours = d.getHours();
	var midday;
	if(hours >= 12)
	{
		midday = "PM";
	}
	else
	{
		if(hours === 0)
		{
			hours = 12;
		}
		midday = "AM";
	}

	time.innerHTML = hours + ":" + String(d.getMinutes()).padStart(2, '0') + ":" + String(d.getSeconds()).padStart(2, '0') + " " + midday;
}

function CrossOffTask()
{
	if(this.checked && this.nextElementSibling.innerHTML.length > 0)
	{
		this.nextElementSibling.classList.add("completed");
	}
	else
	{
		this.nextElementSibling.classList.remove("completed");
	}
}

function EditItem()
{
	this.parentNode.classList.add("edit");
 	this.value = this.previousElementSibling.innerHTML;	
 	this.focus();
 	this.setSelectionRange(0, this.value.length);
}

function EditItemFromSpan()
{
	EditItem.call(this.nextElementSibling);
}

function UpdateTextInput()
{
	this.value = this.value.trim();

	this.previousElementSibling.innerHTML = this.value;

	if(this.value.length > 0)
	{
		this.classList.add("filled");
		this.classList.remove("empty");
	}
	else
	{
		this.classList.add("empty");
		this.classList.remove("filled");
	}

	this.parentNode.classList.remove("edit");
}

function InputKeyPress(event)
{
	if(event.which === 13)
	{
		UpdateTextInput.call(this);
	}
}

function SaveTasklist()
{
	var tasks = checklist.querySelectorAll('span')
	var checkboxes = checklist.querySelectorAll("input[type='checkbox'");
	var taskArray = new Array(tasks.length);
	var taskString = "";
	for(var i = 0; i < tasks.length; ++i)
	{
		taskString = tasks[i].innerHTML + ":" + (checkboxes[i].checked ? 1 : 0)
		taskArray[i] = taskString;
	}

	storage.setItem("tasks", JSON.stringify(taskArray));

}

function ReadSavedTaskList()
{
	if(storage.getItem("tasks") !== null)
	{
		var tasks = checklist.querySelectorAll("span");
		var checkboxes = checklist.querySelectorAll("input[type='checkbox'");
		var taskString, task, completed;

		var previousList = JSON.parse(storage.getItem("tasks"));
		for(var i = 0; i < tasks.length; ++i)
		{
			taskString = previousList[i].split(":");

			task = taskString[0];
			completed = taskString[1];

			tasks[i].nextElementSibling.value = task;
			UpdateTextInput.call(tasks[i].nextElementSibling);


			checkboxes[i].checked = (parseInt(completed, 10) === 1 ? true : false);

			if(checkboxes[i].checked)
			{
				CrossOffTask.call(checkboxes[i]);
			}
			
		}
	}
	else
	{
		console.log("nothing to load");
	}
}