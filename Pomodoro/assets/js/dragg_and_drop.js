let current_card;

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
    
    let task = document.getElementById(`${event.target.id}`);
    let card = task.parentElement.parentElement.id;
    if (card == 'todo_content') card = 'task_list_2';
    if (card == 'doing_content') card = 'task_list_2_2';
    if (card == 'done_content') card = 'task_list_2_3';
    //console.log('DRAGZONE: ' + card);
    current_card = card;
    if (card == 'task_list_2') todo--;
    if (card == 'task_list_2_2') doing--;
    if (card == 'task_list_2_3') done--;
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
  
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
  
    dropzone.appendChild(draggableElement);
    let card = dropzone.id;
    let parent = document.getElementById(`${card}`).parentElement.id;
    
    if (parent == 'todo_content') nothing_to_do_2_1.addClass('hide');
    if (parent == 'doing_content') nothing_to_do_2_2.addClass('hide');
    if (parent == 'done_content') nothing_to_do_2_3.addClass('hide');

    //console.log('DROPZONE: ' + card);

    if (card == 'task_list_2') todo++;
    if (card == 'task_list_2_2') doing++;
    if (card == 'task_list_2_3') done++;
    
    if (todo == 0) nothing_to_do_2_1.removeClass('hide');
    if (doing == 0) nothing_to_do_2_2.removeClass('hide');
    if (done == 0) nothing_to_do_2_3.removeClass('hide');
    
    updateProgressBar();

    event
      .dataTransfer
      .clearData();
  }