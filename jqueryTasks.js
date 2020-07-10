
/*
Functions called on startup
*/

var storage = window.localStorage;

$(function() {

	$('#checklist').hover(
		function() {
			$(this).addClass('selected');
		},
		function() {
			$(this).removeClass('selected');
	});

	$('input:text').on("keydown", InputKeyPress);
	$('input:text').on("input", UpdateInputSize);

	if(storage.getItem("tasks") !== null)
	{
		var taskString, task, completed;

		var previousList = JSON.parse(storage.getItem("tasks"));

		var tc = 0; 

		AddTaskToList(previousList, tc);
	}
	else
	{
		console.log("nothing to load");
	}

	$('#createnewtask').on('click', function() {
		$(CreateNewTaskObject()).slideDown(300);
	});

	$('#clearall').on('click', function() {
		var rows = checklist.querySelectorAll("li");
		HideAndClearTasks(rows, rows.length - 1);
	});
});

function UpdateInputSize()
{
	$(this).prev().text(this.value)
	$(this).css('width', Math.max(100, $(this).prev().width()));
	$(this).prev().text("")
}

function InputKeyPress(event)
{
	if(event.which === 13)
	{
		this.blur();
	}
}


function HideAndClearTasks(rows, index)
{
	var newIndex = index;
	setTimeout(function() {
		var row = rows[newIndex];
		$(row).slideUp(200, function() {
			if(newIndex < 5)
			{
				var textinput = row.querySelector("input[type='text']")
				textinput.value = "";
				SaveTextInput.call(textinput);
			}
			else
			{
				$(this).remove();
			}
		});

		if(newIndex > 0)
			HideAndClearTasks(rows, --index);
		else
			ShowTasks(rows, index);
	}, 100);
}

function ShowTasks(rows, index)
{
	setTimeout(function() {
		var row = rows[index];
		$(row).slideDown(200);
		if(index < rows.length)
		{
			ShowTasks(rows, ++index);
		}
	}, 100);
}


function DeleteTask()
{
	$(this).parent().parent().slideUp(300, function() {
			$(this).remove();
		});

}

function AddTaskToList(previousList, tc)
{
	setTimeout(function() {

		if(tc < previousList.length)
		{
			var newTask = CreateNewTaskObject.call();

			taskString = previousList[previousList.length - 1 - tc].split(":");
			task = taskString[0];
			completed = taskString[1];

			var text = newTask.querySelector("input[type='text']");
			text.value = task;
			SaveTextInput.call(text);

			if(parseInt(completed, 10) === 1)
			{
				CrossOffTask.call(text.nextElementSibling);
			}

			$(newTask).slideDown(300);
		}
		else if(tc < 4)
		{
			var newTask = CreateNewTaskObject.call();
			$(newTask).slideDown(300);
		}

		if(tc < previousList.length || tc < 5)
			AddTaskToList(previousList, ++tc);

	}, 100);
}

function CreateNewTaskObject()
{
	var newTask = document.createElement("li");
	newTask.classList.add("row");

	var newCB = document.createElement("input");
	newCB.setAttribute('type', 'button');
	newCB.classList.add("complete");
	newCB.value = "Complete";

	var newP = document.createElement("p");
	newP.classList.add("empty");

	var newInput = document.createElement("input");
	newInput.classList.add("empty");
	newInput.setAttribute('type', 'text');

	var newDelButton = document.createElement("input");
	newDelButton.setAttribute('type', 'button');
	newDelButton.classList.add("delete");
	newDelButton.value = "Delete";

	var newSubtask = document.createElement("input");
	newSubtask.setAttribute('type', 'button');
	newSubtask.value = "Add Subtask";

	var newCont = document.createElement("div");
	newCont.classList.add("container");

	newCB.addEventListener("click", CrossOffTask);
	newP.addEventListener("click", EditItemFromText);
	newInput.addEventListener("click", EditItem);
	newInput.addEventListener("blur", SaveTextInput);
	newInput.addEventListener("keydown", InputKeyPress);

	newCont.appendChild(newSubtask);
	newCont.appendChild(newCB);
	newCont.appendChild(newDelButton);

	newTask.appendChild(newP);
	newTask.appendChild(newInput);
	newTask.appendChild(newCont);
	$(newTask).hover(
		function() {
			$(this).addClass('selected');
		},
		function() {
			$(this).removeClass('selected');
		});
		
	$(newDelButton).on('click', DeleteTask);

	$(newTask).toggle();

	checklist.appendChild(newTask);

	SaveTextInput.call(newInput);

	return newTask;
}
