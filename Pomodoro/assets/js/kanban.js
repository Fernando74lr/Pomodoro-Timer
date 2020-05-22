
let mode = true;

let to_do_workspace = $("#to_do_workspace"),
    to_do_list = $("#to-do-list"),
    kanban = $("#kanban"),
    tomato_img_to_do = $("#tomato_img_to_do"),
    to_do_title = $('#to_do_title');

$(kanban).hide();

function list_mode() {
    if (mode) {
        // KANBAN MODE
        to_do_list.css('flex-direction', 'column-reverse');
        to_do_list.css('height', '700px');
        to_do_title.css('left', '580px');
        to_do_title.html('KANBAN');
        to_do_workspace.hide();
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
        kanban.hide();
        tomato_img_to_do.show();
        mode = true;
    }
}