const todoTitle = document.getElementById("title");
const todoDesc = document.getElementById("desc");
const submitTodoButton = document.getElementById("submit");
const mainList = document.getElementById("main");
import {toastify} from "./modules/components/toastify.js";


const savedLcTodos = localStorage.getItem("todosList");
const parseSavedLcTodos = JSON.parse(savedLcTodos) || [];
console.log(parseSavedLcTodos);
let saveTodos = [...parseSavedLcTodos];


const createNewTodo = (title,desc,id,checked) =>{
    const listItem = document.createElement("li");
    listItem.id = id;

    const todoTitleHeading = document.createElement("h3");
    const todoTitleInput = document.createElement("input");
    todoTitleInput.disabled = true ;
    todoTitleInput.className ="title-input"
    todoTitleInput.defaultValue = title;
    todoTitleHeading.appendChild(todoTitleInput);


    if(checked) {
        todoTitleHeading.style.color="#4b224dc9";
        todoTitleHeading.innerHTML = title + " checked!";
    };

    const todoDescPara = document.createElement("p");
    todoDescPara.innerHTML = desc;

    listItem.appendChild(todoTitleHeading);
    listItem.appendChild(todoDescPara);

    const todoDel = document.createElement("button");
    todoDel.innerText = "Delete";

    const todoEdit = document.createElement("button");
    todoEdit.innerText = "Edit";

    const todoUp = document.createElement("button");
    todoUp.innerText = "CHECK";

    todoDel.className = "buttonclass";
    todoEdit.className = "buttonclass";
    todoUp.className ="buttonclass";

    listItem.appendChild(todoDel);
    listItem.appendChild(todoEdit);
    listItem.appendChild(todoUp);

    listItem.style.color= "#4b224dc9";
    listItem.style.marginTop= "2rem";

    mainList.appendChild(listItem);
};


saveTodos.forEach((todo)=>createNewTodo(todo.title,todo.desc,todo.id,todo.checked));

const handleCreateNewTodo = (event) => {
    event.preventDefault();

    if(!todoTitle.value) return toastify("please inter valid title..." ,{
        time: "2000" , type:"warn"
    });

    const newTodo = {
        title : todoTitle.value,
        desc : todoDesc.value,
        id : Date.now(),
        checked : false,
    };

    saveTodos.push(newTodo);
    localStorage.setItem("todosList" , JSON.stringify(saveTodos));
    console.log(saveTodos);

    createNewTodo(newTodo.title,newTodo.desc,newTodo.id,newTodo.checked);

};

submitTodoButton.addEventListener("click", handleCreateNewTodo);


mainList.addEventListener("click", (e)=> {
    if (e.target.innerText ==="Delete") {
        const todoEl = e.target.parentElement;
        console.log(todoEl.id);
        const filtredTodos = saveTodos.filter(
            (item)=> item.id !==Number(todoEl.id)
        );
        localStorage.setItem("todosList",JSON.stringify(filtredTodos));
        location.reload();
    }else if(e.target.innerText==="CHECK"){
        const todoEl = e.target.parentElement;
        console.log(todoEl.id);
        const filtredTodo = saveTodos.filter(
            (item)=> item.id === Number(todoEl.id)
        );
        const updateFiltredTodo = {...filtredTodo[0], checked: true };
        const filtredTodos = saveTodos.filter(
            (item)=> item.id !==Number(todoEl.id)
        );
        const updateSavedTodos =[...filtredTodos,updateFiltredTodo];
        localStorage.setItem("todosList", JSON.stringify(updateSavedTodos));
        location.reload();
    }else if (e.target.innerText==="Edit"){
        const todoEl = e.target.parentElement;
        todoEl.children[0].children[0].disabled = false ;
        todoEl.children[0].children[0].select();
        todoEl.children[0].children[0].style.backgroundColor = "#cba5ccc9";
        e.target.innerText="Save";
        e.target.addEventListener("click", ()=>{
            const filtredTodo = saveTodos.filter(
                (item)=> item.id === Number(todoEl.id)
            );
            const updateFiltredTodo = {...filtredTodo[0],title: todoEl.children[0].children[0].value};
            const filtredTodos = saveTodos.filter(
                (item)=> item.id !==Number(todoEl.id)
            );
            const updateSavedTodos =[...filtredTodos,updateFiltredTodo];
            localStorage.setItem("todosList", JSON.stringify(updateSavedTodos));
            location.reload();
        })

    }
});