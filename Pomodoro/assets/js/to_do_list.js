
// Variables
let id_tasks = 0,
    id_tasks_2 = 0,
    tasks = 0,
    todo = 0,
    doing = 0,
    done = 0;


// Do not let change to kanban mode
document.querySelector('#to_do_title').addEventListener("click", function() {
    let tomato = document.querySelector('#tomato_img');
    if (tomato.width == 445) list_mode();
});

let nothing_to_do_2_1 = $("#nothing_to_do_2_1");
let nothing_to_do_2_2 = $("#nothing_to_do_2_2");
let nothing_to_do_2_3 = $("#nothing_to_do_2_3");

// Tag variables
let input_task = $("#input_task");

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
                    <textarea data-edit="edit" id="editable_${id_tasks}" class="task_textarea" rows="4" cols="50" readonly="true" maxlength="88">${input_task.val()}</textarea>
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
            todo++;
            $("#task_list_2").append(`
                <li class='move'>
                    <div class='tasks_2 move' style="height:${height_2}px" id="task_${id_tasks_2}_2" draggable='true' ondragstart='onDragStart(event);'>
                        <textarea data-edit="edit" id="editable_${id_tasks_2}_2" class="task_textarea_2 move" rows="4" cols="50" readonly="true" maxlength="88">${input_task.val()}</textarea>
                        <button type="button" id="button_delete_${id_tasks_2}" 
                            class="delete_task" onclick="deleteTaskKanban(${id_tasks_2})">
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

    let task_selected;

    // Identify the task
    task_selected = $(`#task_${id_task}`);

    // Remove selected task
    task_selected.remove();

    // Show/Hide label about empty list
    emptyList(tasks);
}

function deleteTaskKanban(id_task) {

    let task_selected;

    // Identify the task
    task_selected = $(`#task_${id_task}_2`);
    
    let task = document.getElementById(`task_${id_task}_2`);
    let card = task.parentElement.parentElement.id;
    if (card == 'todo_content') card = 'task_list_2';
    if (card == 'doing_content') card = 'task_list_2_2';
    if (card == 'done_content') card = 'task_list_2_3';
    if (card == 'task_list_2') todo--;
    if (card == 'task_list_2_2') doing--;
    if (card == 'task_list_2_3') done--;

    console.log(card);
    if (todo == 0) nothing_to_do_2_1.removeClass('hide');
    if (doing == 0) nothing_to_do_2_2.removeClass('hide');
    if (done == 0) nothing_to_do_2_3.removeClass('hide');

    // Remove selected task
    task_selected.remove();
    card = '';
}

function emptyList(tasks_1) {
    let nothing_to_do = $("#nothing_to_do");

    (tasks_1 > 0) ? nothing_to_do.addClass('hide') : nothing_to_do.removeClass('hide');
    (todo > 0) ? nothing_to_do_2_1.addClass('hide') : nothing_to_do_2_1.removeClass('hide');
}
