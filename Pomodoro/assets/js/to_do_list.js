
// Variables
let id_tasks = 0,
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
    // If it's NOT empty...
    if (!(input_task.val() == '')) {
        tasks++;
        // Add a task with dynamic id and content.
        $("#task_list").append(`
            <li>
                <div class='tasks' id="task_${id_tasks}">
                    <p class="task_p">${input_task.val()}</p>
                    <button type="button" id="button_delete_${id_tasks}" 
                        class="delete_task" onclick="deleteTask(${id_tasks})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `);

        // Increment counter for next id
        id_tasks++;

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

// Print
let print = (value) => console.log(value);