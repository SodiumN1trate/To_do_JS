window.addEventListener('load', () => {
    console.log("Js work"); // Js check

    const ADD_BUTTON = document.getElementById("addButton");
    let task = document.getElementById("taskPlace");
    let taskDate = document.getElementById("timePlace");

    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];  // All task list

    render();

    // Add task to list
    ADD_BUTTON.addEventListener("click", () => {
        if (task.value === "" || taskDate.value === "") {
            document.getElementById("errorMessage").innerHTML = "Aizpildiet visus vajadzīgos laukus!";
            document.getElementById("errorMessage").style.display = "initial";
        }
        else if (taskDate.value === "04:20" || taskDate.value === "4:20"){
            document.body.classList.add("gradientImage");
            document.getElementById("container").classList.add("flyingClass");
            document.getElementById("title").classList.add("flyingClass2");
            document.body.style.overflow = "hidden";
        }
        else{
            addTasks();
        }
    })

    // Done and Delete buttons functionality
    document.getElementById("tasks").addEventListener("click", function (e) {
        if(e.target.className === "doneButton"){ // When clicked "Done" button
            e.target.parentNode.style.backgroundColor = "#47DF21"; // Change task background-color because it's done
            e.target.style.display = "none"; // Hide "Done" button
            taskList.forEach(element => { // Find the task which done, and then change "done" status to true. This we need when we add new task to see if other tasks already done
                if (element.task === e.target.parentNode.childNodes[1].innerHTML || element.taskDate === e.target.parentNode.childNodes[3].innerHTML)
                {
                    element.status = true;
                    render();
                }
            });
        }
        else if (e.target.className === "deleteButton") // When clicked "Delete" button
        {
            e.target.parentNode.parentElement.removeChild(e.target.parentNode); // Remove task from list
            taskList.forEach(element => {
                if (element.task === e.target.parentNode.childNodes[1].innerHTML || element.taskDate === e.target.parentNode.childNodes[3].innerHTML) {
                    let index = taskList.indexOf(element); // Delete task from task list
                    taskList.splice(index, 1);
                    render();
                }
            })
        }
        return;
    })


    function addTasks() {
        for (let index = 0; index < taskList.length; index++) {
            if (taskList[index].task == task.value){
                document.getElementById("errorMessage").innerHTML = "Tāds uzdevums jau ir pievienots!";
                document.getElementById("errorMessage").style.display = "initial";
                return 0;
            }
        }
        addTask = {task: task.value, taskDate: taskDate.value, status: false};
        taskList.push(addTask);
        task.value = "";
        taskDate.value = "";
        document.getElementById("errorMessage").innerHTML = "";
        document.getElementById("errorMessage").style.display = "none";
        render();
    }

    // Function which renders new and done tasks.
    function render() {
        let tasks = document.getElementById("tasks");
        let taskCode;
        tasks.innerHTML = "";
        taskList.forEach(e => {
            if (e.status === false)
            {
                taskCode = `
                <div id="taskForm">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <input type="button" class="deleteButton" value="Dzēst">
                    <input type="button" class="doneButton" value="Pabeigt">
                </div>`;
            }
            else{
                taskCode = `
                <div id="taskForm" style="background-color: #47DF21;">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <input type="button" class="deleteButton" value="Dzēst">
                </div>`;
            }
            tasks.innerHTML += taskCode;
        })
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }

})