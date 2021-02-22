var todoList = [];

function addTodo() {
    var todoText = $("#todoInputId").val();
    var listFromStorage = window.localStorage.getItem('todoList');
    if (listFromStorage) {
        let listFromStorageParsed = JSON.parse(listFromStorage);
        let todoId = listFromStorageParsed.length + 1;
        let todo = new Todo(todoId, todoText);
        listFromStorageParsed.push(todo);
        let todolistJSON = JSON.stringify(listFromStorageParsed);
        window.localStorage.setItem('todoList', todolistJSON);
    } else {
        let todoId = todoList.length + 1;
        let todo = new Todo(todoId, todoText);
        todoList.push(todo);
        let todolistJSON = JSON.stringify(todoList);
        window.localStorage.setItem('todoList', todolistJSON);
    }
    recalculateId();
    showTodos();
}
function getDataFromStorage() {
    var listOfItemsFromStorage = window.localStorage.getItem('todoList');
    var listParsed = JSON.parse(listOfItemsFromStorage);
    return listParsed;
}
function getFormatTodo() {
    var listParsed = getDataFromStorage();
    var concatenatedTodo = '';
    for (let index = 0; index < listParsed.length; index++) {
        const todo = listParsed[index];
        concatenatedTodo +=
            `<div class="card my-2" id="thisdiv${todo.id}" style="width: 20rem;">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <i id="checkbutton${todo.id}" style="color:green;width:21px;" class="fa fa-check" type="button" onclick="addToDone(${todo.id})" aria-hidden="true"></i>
                    <input class="btn-sm btn-close" type="button" onclick="removeTodo(${todo.id})">
                </div>
                <p id="paragraph${todo.id}">${todo.id}. ${todo.text}</p>
            </div>
        </div>`
    }
    return concatenatedTodo;
}
function recalculateId() {
    let listFromStorage = getDataFromStorage();
    for (let i = 0; i < listFromStorage.length; i++) {
        let itemFromStorage = listFromStorage[i];
        itemFromStorage.id = i + 1;
    }
    let listFromStorageStringed = JSON.stringify(listFromStorage);
    window.localStorage.setItem('todoList', listFromStorageStringed);
}
function removeTodo(id) {
    var listParsed = getDataFromStorage();
    for (let index = 0; index < listParsed.length; index++) {
        const todo = listParsed[index];
        if (todo.id == id) {
            listParsed.splice(index, 1);
            var listModifiedJSON = JSON.stringify(listParsed);
            window.localStorage.setItem('todoList', listModifiedJSON);
        }
    }
    recalculateId();
    showTodos();
}
function addToDone(id) {
    var listParsed = getDataFromStorage();
    for (let index = 0; index < listParsed.length; index++) {
        const todo = listParsed[index];
        if (todo.id == id) {
            $("#thisdiv" + todo.id).addClass("ischecked");
        }
        verifyIfChecked();
    }
}
function verifyIfChecked() {
    var listParsed = getDataFromStorage();
    for (let index = 0; index < listParsed.length; index++) {
        const todo = listParsed[index];
        if ($("#thisdiv" + todo.id).hasClass("ischecked")) {
            $("#paragraph" + todo.id).css('text-decoration', 'line-through');
            $("#checkbutton" + todo.id).remove();
        }
    }
}

function showTodos() {
    verifyIfChecked();
    var htmlToDo = getFormatTodo();
    $("#todosId").html(htmlToDo);
}
