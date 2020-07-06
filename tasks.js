

var checklist = document.getElementById("checklist");

var date = document.getElementById("date");
var time = document.getElementById("time");

var fs = document.getElementById("fakespan");


window.addEventListener("beforeunload", SaveTasklist);

var today = new Date();

date.innerText = "Today is " + today.toLocaleString('default', {month: 'long'}) + " " + today.getDate() + ", " + today.getFullYear();

UpdateTime();
setInterval(UpdateTime, 500)







//Below are all functions




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
	this.parentNode.classList.add("edit");
	this.value = this.previousElementSibling.innerText;	
	this.focus();
	this.setSelectionRange(0, this.value.length);
}

function EditItemFromSpan(event)
{
	EditItem.call(this.nextElementSibling);
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


function SaveTasklist()
{
	var taskArray = [];
	var taskString = "";

	var spans = [].slice.call(checklist.querySelectorAll("span"));

	for(var i = spans.length - 1; i >= 0; --i)
	{
		if(spans[i].innerText.length == 0)
			continue;
		taskString = spans[i].innerText + ":" + (spans[i].classList.contains("completed") ? 1 : 0)
		taskArray.push(taskString);
	}

	storage.setItem("tasks", JSON.stringify(taskArray));

}

function UpdateInputSize()
{
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


