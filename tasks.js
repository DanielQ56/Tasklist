

var checklist = document.getElementById("checklist");

var title = document.getElementById("header");

var date = document.getElementById("date");
var time = document.getElementById("time");

var fs = document.getElementById("fakespan");

var nameinput = document.querySelector("input[type='text'].name");
var namespan = document.querySelector("span.name");

nameinput.addEventListener("click", EditItem);
nameinput.addEventListener("blur", SaveTextInput);

namespan.addEventListener("click", EditItemFromText);

RetrieveStoredName();


window.addEventListener("beforeunload", SaveTasklist);

var today = new Date();

date.innerText = "Today is " + today.toLocaleString('default', {month: 'long'}) + " " + today.getDate() + ", " + today.getFullYear();

UpdateTime();
setInterval(UpdateTime, 500)







//Below are all functions


function RetrieveStoredName()
{
	if(storage.getItem("name") !== null)
	{
		var name = storage.getItem("name").trim();
		if(name.length > 0)
		{
			nameinput.value = name;
			SaveTextInput.call(nameinput);	
		}
	}
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

		if(hours > 5)
			header.innerText = "Good Evening ";
		else
			header.innerText = "Good Afternoon ";
	}
	else
	{
		if(hours === 0)
		{
			hours = 12;
		}
		midday = "AM";
		header.innerText = "Good Morning ";
	}

	time.innerText = hours + ":" + String(d.getMinutes()).padStart(2, '0') + ":" + String(d.getSeconds()).padStart(2, '0') + " " + midday;
}

function CrossOffTask()
{
	var child = this.parentNode.parentNode.children[0];
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

function EditItemFromText(event)
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
		this.previousElementSibling.classList.remove("empty");
	}
	else
	{
		this.classList.add("empty");
		this.classList.remove("filled");
		this.previousElementSibling.classList.add("empty");
	}

	this.parentNode.classList.remove("edit");
}


function SaveTasklist()
{
	var taskArray = [];
	var taskString = "";

	var text = [].slice.call(checklist.querySelectorAll("p"));

	for(var i = text.length - 1; i >= 0; --i)
	{
		if(text[i].innerText.length == 0)
			continue;
		taskString = text[i].innerText + ":" + (text[i].classList.contains("completed") ? 1 : 0)
		taskArray.push(taskString);
	}

	storage.setItem("name", nameinput.value.trim());

	storage.setItem("tasks", JSON.stringify(taskArray));

}



