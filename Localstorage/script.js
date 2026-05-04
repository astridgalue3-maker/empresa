let tareas = JSON.parse(localStorage.getItem('mis_tareas')) || [];

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function renderizarTareas() {
    taskList.innerHTML = ''; 

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        
        if (tarea.completada) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text" onclick="toggleTarea(${tarea.id})">
                ${tarea.texto}
            </span>
            <button class="delete-btn" onclick="eliminarTarea(${tarea.id})">✕</button>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem('mis_tareas', JSON.stringify(tareas));
}

function agregarTarea() {
    const texto = taskInput.value.trim();
    
    if (texto !== "") {
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            completada: false 
        };

        tareas.push(nuevaTarea);
        taskInput.value = ''; 
        taskInput.focus(); 
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}

function toggleTarea(id) {
    tareas = tareas.map(t => {
        if (t.id === id) {
            return { ...t, completada: !t.completada };
        }
        return t;
    });
    renderizarTareas();
}

addBtn.addEventListener('click', agregarTarea);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarTarea();
});

renderizarTareas();