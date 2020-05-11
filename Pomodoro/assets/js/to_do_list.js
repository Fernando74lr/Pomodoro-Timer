
// Variables
let id_tasks = 0,
    id_tasks_2 = 0,
    tasks = 0;

// Tag variables
let input_task = $("#input_task"),
    button_add = $("#input_task");

// Listen for key Enter to execute addTask()
document.addEventListener('keypress', function(e) {
    if (e.code == 'Enter') 
        addTask();
});

// Add task
function addTask() {
    let height_1 = 60, height_2 = 80;
    // If it's NOT empty...
    if (!(input_task.val() == '')) {
        (input_task.val().length <= 44) ? height_1 = 50 : height_1 = 70;
        (input_task.val().length <= 33) ? height_2 = 50 : height_2 = 80;
        // Add a task with dynamic id and content.
        if (mode) {
            tasks++;
            $("#task_list").append(`
                <li>
                    <div class='tasks' style="height:${height_1}px" id="task_${id_tasks}">
                    <textarea class="task_textarea" rows="4" cols="50" readonly="true" maxlength="88">${input_task.val()}</textarea>
                        <button type="button" id="button_delete_${id_tasks}" 
                            class="delete_task" onclick="deleteTask(${id_tasks})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `);
            // Increment counter for next id
            id_tasks++;
        } else { 
            $("#task_list_2").append(`
                <li>
                    <div class='tasks_2' style="height:${height_2}px"" id="task_${id_tasks}">
                        <textarea class="task_textarea_2" rows="4" cols="50" readonly="true" maxlength="88">${input_task.val()}</textarea>
                        <button type="button" id="button_delete_${id_tasks}" 
                            class="delete_task" onclick="deleteTask(${id_tasks})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `);
            // Increment counter for next id
            id_tasks_2++;
        }

        // Reset input task
        input_task.val('');
    }

    // Show/Hide label about empty list
    emptyList(tasks);
}

function deleteTask(id_task) {
    tasks--;
    // Identify the task
    task_selected = $(`#task_${id_task}`);

    // Remove selected task
    task_selected.remove();

    // Show/Hide label about empty list
    emptyList(tasks);
}

function emptyList(tasks) {
    let nothing_to_do = $("#nothing_to_do");
    (tasks > 0) ? nothing_to_do.addClass('hide') : nothing_to_do.removeClass('hide');
}