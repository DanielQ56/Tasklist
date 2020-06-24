
var storage = window.localStorage;

var checklist = document.getElementById("checklist");
var body = document.querySelector("body");

var rows = [].slice.call(checklist.querySelectorAll("li"));
console.log(rows.length);

var cb = [].slice.call(checklist.querySelectorAll("input[type='button'].complete"));
var spans = [].slice.call(checklist.querySelectorAll("span"));
var textInputs = [].slice.call(checklist.querySelectorAll("input[type='text']"));
var delButtons = [].slice.call(checklist.querySelectorAll("input[type='button'].delete"));

var date = document.getElementById("date");
var time = document.getElementById("time");

var fs = document.getElementById("fakespan");

var clear = document.getElementById("clearall");
var add = document.getElementById("addtask");


clear.addEventListener("click", ClearTasks);
add.addEventListener("click", AddTask);

document.addEventListener('click', DeselectTask);

window.addEventListener("beforeunload", SaveTasklist);

ReadSavedTaskList();


var today = new Date();

date.innerText = "Today is " + today.toLocaleString('default', {month: 'long'}) + " " + today.getDate() + ", " + today.getFullYear();

setInterval(UpdateTime, 500)

for(var i = 0; i < cb.length; ++i)
{
	cb[i].addEventListener("click", CrossOffTask);
	spans[i].addEventListener("click", EditItemFromSpan);
	textInputs[i].addEventListener("click", EditItem);
	textInputs[i].addEventListener("blur", SaveTextInput);
	textInputs[i].addEventListener("keydown", InputKeyPress);
	textInputs[i].addEventListener("input", UpdateInputSize)
	rows[i].addEventListener("click",SelectTask);
	delButtons[i].addEventListener("click", DeleteTask);
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

function DeleteTask()
{
	var delNode = checklist.removeChild(this.parentNode);

	rows = [].slice.call(checklist.querySelectorAll("li"));

	cb = [].slice.call(checklist.querySelectorAll("input[type='button'].complete"));
	spans = [].slice.call(checklist.querySelectorAll("span"));
	textInputs = [].slice.call(checklist.querySelectorAll("input[type='text']"));
	delButtons = [].slice.call(checklist.querySelectorAll("input[type='button'].delete"));
}

function DeselectTask(event)
{
	for(var i = 0; i < rows.length; ++i)
	{
		if(!rows[i].contains(event.target) && rows[i].classList.contains("selected"))
		{
			rows[i].classList.remove("selected");
		}
	}
}

function SelectTask(event)
{

	if(!this.classList.contains("selected"))
	{
		console.log("parent selected");
		this.classList.add("selected");
	}
}


function ClearTasks()
{
	for(var i = rows.length - 1; i >= 0; --i)
	{
		if(i < 5)
		{
			textInputs[i].value = "";
			SaveTextInput.call(textInputs[i]);
		}
		else
		{
			checklist.removeChild(rows[i]);
			rows.pop();
			cb.pop();
			spans.pop();
			textInputs.pop();
			delButtons.pop();
		}
	}
}

function AddTask()
{
	var newTask = document.createElement("li");
	newTask.classList.add("row");
	newTask.addEventListener("click",SelectTask);

	var newCB = document.createElement("input");
	newCB.setAttribute('type', 'button');
	newCB.classList.add("complete");
	newCB.value = "Complete";

	var newSpan = document.createElement("span");

	var newInput = document.createElement("input");
	newInput.classList.add("empty");
	newInput.setAttribute('type', 'text');

	var newDelButton = document.createElement("input");
	newDelButton.setAttribute('type', 'button');
	newDelButton.classList.add("delete");
	newDelButton.value = "Delete";


	newCB.addEventListener("click", CrossOffTask);
	newSpan.addEventListener("click", EditItemFromSpan);
	newInput.addEventListener("click", EditItem);
	newInput.addEventListener("blur", SaveTextInput);
	newInput.addEventListener("keydown", InputKeyPress);
	newInput.addEventListener("input", UpdateInputSize);
	newDelButton.addEventListener("click", DeleteTask);


	rows.push(newTask);
	spans.push(newSpan);
	cb.push(newCB);
	textInputs.push(newInput);
	delButtons.push(newDelButton);


	newTask.appendChild(newSpan);
	newTask.appendChild(newInput);
	newTask.appendChild(newCB);
	newTask.appendChild(newDelButton);

	checklist.appendChild(newTask);

}

function UpdateTime()
{
	var d = new Date();
	var hours = d.getHours();
	var midday;
	if(hours >= 12)
	{
		midday = "PM";
		hours = hours === 12 ? hours : hours % 12;
	}
	else
	{
		if(hours === 0)
		{
			hours = 12;
		}
		midday = "AM";
	}

	time.innerText = hours + ":" + String(d.getMinutes()).padStart(2, '0') + ":" + String(d.getSeconds()).padStart(2, '0') + " " + midday;
}

function CrossOffTask()
{
	var child = this.parentNode.children[0];
	if(!child.classList.contains("completed") && child.textContent.length > 0)
	{
		child.classList.add("completed");
	}
	else
	{
		child.classList.remove("completed");
	}
}

function EditItem(event)
{	
	if(this.parentNode.classList.contains("selected"))
	{
		console.log("selecting child");
		this.parentNode.classList.add("edit");
	 	this.value = this.previousElementSibling.innerText;	
	 	this.focus();
	 	this.setSelectionRange(0, this.value.length);
	}
	else
	{
		this.blur();
	}
}

function EditItemFromSpan(event)
{
	if(this.parentNode.classList.contains("selected"))
		EditItem.call(this.nextElementSibling, event);
}

function SaveTextInput()
{
	this.value = this.value.trim();

	this.previousElementSibling.innerText = this.value;

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

function UpdateInputSize()
{
	fs.innerText = this.value;
	this.style.width = Math.max(100, fs.clientWidth) + "px";
}

function InputKeyPress(event)
{
	if(event.which === 13)
	{
		SaveTextInput.call(this);
	}
	else if(event.keyCode === 8)
	{
		UpdateInputSize.call(this);
	}

}

function SaveTasklist()
{
	var taskArray = [];
	var taskString = "";
	for(var i = rows.length - 1; i >= 0; --i)
	{
		if(spans[i].innerText.length == 0)
			continue;
		taskString = spans[i].innerText + ":" + (spans[i].classList.contains("completed") ? 1 : 0)
		taskArray.push(taskString);
	}

	storage.setItem("tasks", JSON.stringify(taskArray));

}

function ReadSavedTaskList()
{
	if(storage.getItem("tasks") !== null)
	{
		var taskString, task, completed;

		var previousList = JSON.parse(storage.getItem("tasks"));

		if(previousList.length > 5)
		{
			for(var i = 0; i < previousList.length - 5; ++i)
			{
				AddTask.call();
			}
		}

		for(var i = 0; i < previousList.length; ++i)
		{
			taskString = previousList[previousList.length - 1 - i].split(":");

			task = taskString[0];
			completed = taskString[1];

			spans[i].nextElementSibling.value = task;
			SaveTextInput.call(spans[i].nextElementSibling);

			if(parseInt(completed, 10) === 1)
			{
				CrossOffTask.call(cb[i]);
			}
			
		}
	}
	else
	{
		console.log("nothing to load");
	}
}