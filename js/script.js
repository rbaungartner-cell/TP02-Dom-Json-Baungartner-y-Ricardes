let tareas = [];

const input = document.getElementById("taskInputTexto");
const btn = document.getElementById("agregarBoton");
const lista = document.getElementById("contenedorTareas");
const error = document.getElementById("mensajeError");

const totalSpan = document.getElementById("contadorTotal");
const completedSpan = document.getElementById("contadorCompletadas");
const pendingSpan = document.getElementById("contadorPendientes");

//Escucha
btn.addEventListener("click", agregarTarea);

// FUNCIONES

function agregarTarea() {
  const texto = input.value.trim();

  // Validar
  if (texto === "") {
    mostrarError("La tarea no puede estar vacía");
    return;
  }

  if (texto.length > 50) {
    mostrarError("Máximo 50 caracteres");
    return;
  }

  limpiarError();

  const nuevaTarea = {
    id: Date.now(),
    texto: texto,
    completada: false,
    fecha: new Date().toLocaleString()
  };

  tareas.push(nuevaTarea);
  input.value = ""; // Limpiar el input

  render(); 
}

function render() {
  lista.innerHTML = ""; // Limpiar lista actual

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;

    // Marcar como completadi
    checkbox.addEventListener("change", function () {
      toggleTarea(index);
    });

    const span = document.createElement("span");
    span.textContent = `${tarea.texto} (Creada: ${tarea.fecha})`;

    if (tarea.completada) {
      span.classList.add("completed");
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    lista.appendChild(li);
  });

  actualizarContadores();
}

function toggleTarea(index) {
  tareas[index].completada = !tareas[index].completada;
  render();
}

function actualizarContadores() {
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = total - completadas;

  totalSpan.textContent = total;
  completedSpan.textContent = completadas;
  pendingSpan.textContent = pendientes;
}

function mostrarError(msg) {
  error.textContent = msg;
}

function limpiarError() {
  error.textContent = "";
}