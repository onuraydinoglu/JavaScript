let gorevListesi = [
    {id: 1, gorevAdi: "Görev 1"},
    {id: 2, gorevAdi: "Görev 2"},
    {id: 3, gorevAdi: "Görev 3"},
    {id: 4, gorevAdi: "Görev 4"}
];

let editId;
let isEditTask = false;

let input = document.querySelector("#todo-input");

const displayTasks = () => {
    let tasks = document.querySelector("#tasks");
    tasks.innerHTML = "";
    for (let gorev of gorevListesi) {
        let li = `
            <li class="task">
            <div class="content">
                <input 
                    type="text"
                    class="text"
                    value="${gorev.gorevAdi}"
                    id="${gorev.id}";
                    readonly
                />
            </div>
            <div class="actions">
                <button onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="edit">Edit</button>
                <button onclick="deleteTask(${gorev.id})" class="delete">Delete</button>
            </div>
            </li>
        `;
        tasks.insertAdjacentHTML("beforeend", li);
    }
}

displayTasks();

document.querySelector("#todo-button").addEventListener("click", (e) => { newTask(e); });

const newTask = (e) => {
    e.preventDefault();

    if(input.value == "") {
        alert("GÖrev Listesi Giriniz!");
    } else {
        if(!isEditTask) {
            gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": input.value});
        } else {
            // güncelleme
            for(let gorev of gorevListesi) {
                if(gorev.id == editId) {
                    gorev.gorevAdi = input.value;
                }
                isEditTask = false;
            }
        }
    }
    input.value = ""; 
    displayTasks();
}     

const deleteTask = (id) => {

    let deletedId;
    
    for(let index in gorevListesi) {
        if(gorevListesi[index].id == id) {
            deletedId = index;
        }
    }
    gorevListesi.splice(deletedId, 1);
    displayTasks();
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    input.value = taskName;
    input.focus();

    console.log("edit id:", editId);
    console.log("edit mode", isEditTask);
}