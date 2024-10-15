const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];
runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    todoList.addEventListener("click",removeTodoUI);
    clearButton.addEventListener("click",clearAllTodos);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodoStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    });
}

function filter(e){
    const filteredValue = e.target.value.toLowerCase().trim(); 
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filteredValue)){
                todo.setAttribute("style","display : block");
            }
            else{
                todo.setAttribute("style","display : none !important");
            }
        });
    }
    else{
        showAlert("warning","Filtreleme işlemi yapabilmek için en az 1 todo olmalı!")
    }
}

function clearAllTodos(){
    checkTodoStorage();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
        });
        localStorage.clear();
            showAlert("success","Tüm Todo'lar Başarılı bir şekilde silindi.")
    }
    else{
        showAlert("warning","Silme işlemi yapabilmek için En az 1 adet Todo Eklemelisiniz!")
    }
     

}

function removeTodoUI(e){
            //UI'DAN SİL
    if(e.target.className === "fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        

             //STORAGE'DEN SİL
             removeTodoStorage(todo.textContent);
             showAlert("success","Todo Başarılı bir şekilde silinmiştir.");
    }
       
}

function removeTodoStorage(removeTodo){
    checkTodoStorage();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    
    const inputText = addInput.value.trim();
    if(inputText==null || inputText=="")
    {
        showAlert("warning","Lütfen Bir Değer Giriniz!");
    }
    else{
        //Arayüze Ekleme
        addTodoUI(inputText);
        //Storage Ekleme
        addTodoStorage(inputText);
        showAlert("success","Todo Başarılı Bir Şekilde Eklenmiştir!");
    }
    

    e.preventDefault();
}

function addTodoUI(newTodo){
//     <!-- <li class="list-group-item d-flex justify-content-between">Todo1
//     <a href="#" class="delete-item">
//         <i class="fa fa-remove"></i>
//     </a>
// </li> -->

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;
    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";
    const i = document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";

}

function addTodoStorage(newTodo){
    checkTodoStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    /*
        <div class="alert alert-success" role="alert">
                A simple success alert—check it out!
        </div>
    */
   const div = document.createElement("div");
   //div.className = "alert alert-"+type;
   div.className = `alert alert-${type}`;
   div.textContent = message;

   firstCardBody.appendChild(div);


   setTimeout(function(){
    div.remove();
   },2500);
}