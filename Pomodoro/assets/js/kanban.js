
let mode = true;

let to_do_workspace = $("#to_do_workspace"),
    to_do_list = $("#to-do-list"),
    kanban = $("#kanban"),
    tomato_img_to_do = $("#tomato_img_to_do"),
    to_do_title = $('#to_do_title'),
    progress = $('#progress');

// Initial values
kanban.hide();
progress.hide();

function list_mode() {
    if (mode) {
        // KANBAN MODE
        to_do_list.css('flex-direction', 'column-reverse');
        to_do_list.css('height', '700px');
        to_do_title.css('left', '580px');
        to_do_title.html('KANBAN');
        to_do_workspace.hide();
        progress.show();
        kanban.show();
        tomato_img_to_do.hide();
        mode = false;
    } else {
        // NORMAL MODE
        to_do_list.css('flex-direction', 'row');
        to_do_list.css('height', '566px');
        to_do_title.css('left', '310px');
        to_do_title.html('TO-DO LIST');
        to_do_workspace.show();
        progress.hide();
        kanban.hide();
        tomato_img_to_do.show();
        mode = true;
    }
}

function updateProgressBar() {
    let total_tasks = todo + doing + done,
        porcentage_todo = (todo / total_tasks) * 100,
        porcentage_doing = (doing / total_tasks) * 100,
        porcentage_done = (done / total_tasks) * 100;

    let bar_todo = $('#bar_todo'),
        bar_doing = $('#bar_doing')
        bar_done = $('#bar_done');

    bar_todo.css('width', `${porcentage_todo}%`);
    bar_doing.css('width', `${porcentage_doing}%`);
    bar_done.css('width', `${porcentage_done}%`);

    // Sweet Alert for all work done
    if (porcentage_done == 100) allWorkDone();
}

function allWorkDone() {
	Swal.fire(
		'Excellent Work!',
		'You has completed all your tasks',
		'success'
	);
}