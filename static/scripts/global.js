window.addEventListener('load', () => {
    console.log("Js work") // Js check

    const ADD_BUTTON = document.getElementById("addButton");
    let task = document.getElementById("taskPlace");
    let taskDate = document.getElementById("timePlace");

    let taskList = [];  // All task list


    // Add task to list
    ADD_BUTTON.addEventListener("click", () => {
        if (task.value === "" || taskDate.value === "") {
            alert("Aizpildiet visus laukus!");
        }
        else{
            addTask = {task: task.value, taskDate: taskDate.value, status: false};
            taskList.push(addTask);
            task.value = "";
            taskDate.value = "";
            render();
        }
    })

    // Done and Delete buttons functionality
    document.querySelector("#tasks").addEventListener("click", function (e) {
        if(e.target.className === "doneButton"){ // When clicked "Done" button
            e.target.parentNode.style.backgroundColor = "#47DF21"; // Change task background-color because it's done
            e.target.style.display = "none"; // Hide "Done" button
            taskList.forEach(element => { // Find the task which done, and then change "done" status to true. This we need when we add new task to see if other tasks already done
                if (element.task === e.target.parentNode.childNodes[1].innerHTML)
                {
                    element.status = true;
                }
            });
        }
        else if (e.target.className === "deleteButton") // When clicked "Delete" button
        {
            e.target.parentNode.parentElement.removeChild(e.target.parentNode); // Remove task from list
            taskList.forEach(element => {
                if (element.task === e.target.parentNode.childNodes[1].innerHTML) {
                    let index = taskList.indexOf(element); // Delete task from task list
                    taskList.splice(index, 1)
                }
            })
        }
    })

    // Function which renders new and done tasks.
    function render() {
        let tasks = document.getElementById("tasks");
        let taskCode;
        tasks.innerHTML = "";
        taskList.forEach(e => {
            if (e.status === false)
            {
                taskCode = `
                <div class="taskForm">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <input type="button" class="deleteButton" value="Delete">
                    <input type="button" class="doneButton" value="Done">
                </div>`;
            }
            else{
                taskCode = `
                <div class="taskForm" style="background-color: #47DF21;">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <input type="button" class="deleteButton" value="Delete">
                </div>`;
            }
            tasks.innerHTML += taskCode;
        }) 
    }

})