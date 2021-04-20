window.addEventListener('load', () => {
    console.log("Js work")
    const ADD_BUTTON = document.getElementById("addButton");
    let task = document.getElementById("taskPlace");
    let taskDate = document.getElementById("timePlace");

    let taskList = [];

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

    document.querySelector("#tasks").addEventListener("click", function (e) {
        if(e.target.className === "doneButton"){
            e.target.parentElement.parentElement.style.backgroundColor = "#47DF21";
            e.target.style.display = "none";
            taskList.forEach(element => {
                if (element.task === e.target.parentElement.parentElement.childNodes[1].innerHTML)
                {
                    element.status = true;
                }
            });
        }
        else if (e.target.className === "deleteButton")
        {
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
            taskList.forEach(element => {
                if (element.task === e.target.parentElement.parentElement.childNodes[1].innerHTML) {
                    let index = taskList.indexOf(element);
                    taskList.splice(index, 1)
                    console.log(taskList);
                }
            })
        }
    })

    function render() {
        let tasks = document.getElementById("tasks");
        tasks.innerHTML = "";
        taskList.forEach(e => {
            if (e.status === false)
            {
                let taskCode = `
                <div class="taskForm">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <span><input type="button" class="deleteButton" value="Delete"></span>
                    <span><input type="button" class="doneButton" value="Done"></span>
                </div>`;
                tasks.innerHTML += taskCode;
            }
            else{
                let taskCode = `
                <div class="taskForm" style="background-color: #47DF21;">
                    <span class="task">${e.task}</span>  -  <span class="time">${e.taskDate}</span>
                    <span><input type="button" class="deleteButton" value="Delete"></span>
                </div>`;
                tasks.innerHTML += taskCode;
            }
        }) 
    }

})