//service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso',reg))
    .catch(err => console.warn('Error al registrar SW',err))
}

// Obtén referencias a elementos HTML
const inputText = document.getElementById('inputText');
const aceptarButton = document.getElementById('aceptarButton');
const listaElementos = document.getElementById('listaElementos');

// Cargar datos del localStorage al cargar la página
document.addEventListener('DOMContentLoaded', cargarListaDesdeLocalStorage);

// Agregar evento click al botón "Agregar"
aceptarButton.addEventListener('click', agregarElemento);

function agregarElemento() {
    const texto = inputText.value.trim();
    if (texto !== '') {
        // Crear elemento de lista
        const li = document.createElement('li');
        li.textContent = texto;

        // Crear botón "X" para eliminar el elemento
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'X';
        botonEliminar.classList.add('eliminar');

        // Agregar evento click al botón "X" para eliminar el elemento
        botonEliminar.addEventListener('click', () => {
            li.remove();
            guardarListaEnLocalStorage();
        });

        // Agregar botón "X" al elemento de lista
        li.appendChild(botonEliminar);

        // Agregar elemento de lista a la lista
        listaElementos.appendChild(li);

        // Limpiar el cuadro de texto
        inputText.value = '';

        // Guardar la lista en el localStorage
        guardarListaEnLocalStorage();
    }
}

function guardarListaEnLocalStorage() {
    const elementos = [];
    listaElementos.querySelectorAll('li').forEach((elemento) => {
        // Clona el elemento <li> para eliminar los botones antes de agregarlo al array
        const elementoSinBoton = elemento.cloneNode(true);
        elementoSinBoton.querySelectorAll('button').forEach((button) => {
            // Elimina los botones dentro del elemento <li> clonado
            button.remove();
        });
        elementos.push(elementoSinBoton.textContent);
    });
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function cargarListaDesdeLocalStorage() {
    const elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    elementosGuardados.forEach((elementoTexto) => {
        const li = document.createElement('li');

        // Crear botón "X" para eliminar el elemento
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'X';
        botonEliminar.classList.add('eliminar');

        li.textContent = elementoTexto;

        // Agregar evento click al botón "X" para eliminar el elemento
        botonEliminar.addEventListener('click', () => {
            li.remove();
            guardarListaEnLocalStorage();
        });

        // Agregar botón "X" al elemento de lista
        li.appendChild(botonEliminar);

        listaElementos.appendChild(li);
    });
  
}
