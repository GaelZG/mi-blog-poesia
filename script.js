// 1. Configuración de Firebase con tus credenciales reales de Gael
const firebaseConfig = {
  apiKey: "AIzaSyDf-WrR7BvBlQbdHGJOMO8YmaMxM2HnyZI",
  authDomain: "bitacora-poetica-gael.firebaseapp.com",
  databaseURL: "https://bitacora-poetica-gael-default-rtdb.firebaseio.com",
  projectId: "bitacora-poetica-gael",
  storageBucket: "bitacora-poetica-gael.firebasestorage.app",
  messagingSenderId: "433915859922",
  appId: "1:433915859922:web:d06955f46a7f71ca5aee0b"
};

// Inicializamos la base de datos global de Google Firebase
firebase.initializeApp(firebaseConfig);
const baseDeDatos = firebase.database();

// 2. Identificamos los elementos del HTML
const formulario = document.querySelector('form');
const contenedorPoemas = document.getElementById('contenedor-poemas');

// 3. Función para pintar un poema en la pantalla
function renderizarPoema(autor, titulo, contenido) {
    const nuevoArticulo = document.createElement('article');
    nuevoArticulo.innerHTML = `
        <h2>${titulo}</h2>
        <p><strong>Escrito por:</strong> ${autor}</p>
        <p>${contenido.replace(/\n/g, '<br>')}</p> 
    `;
    contenedorPoemas.prepend(nuevoArticulo);
}

// 4. OYENTE EN TIEMPO REAL: Descarga en automático los poemas existentes y nuevos para todos los usuarios
baseDeDatos.ref('poemas').on('child_added', function(snapshot) {
    const poema = snapshot.val();
    renderizarPoema(poema.autor, poema.titulo, poema.contenido);
});

// 5. Captura del formulario al publicar
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const autor = document.getElementById('autor').value;
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    if (autor === '' || titulo === '' || contenido === '') {
        alert('Por favor, llena todos los campos antes de continuar publicando escritor');
        return;
    }

    // MANDAR A LA NUBE: Guardamos los datos en la base central de Firebase
    baseDeDatos.ref('poemas').push({
        autor: autor,
        titulo: titulo,
        contenido: contenido
    });

    formulario.reset();
});