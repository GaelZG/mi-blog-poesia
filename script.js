// 1. Configuración de Firebase con tus credenciales reales
const firebaseConfig = {
    apiKey: "TU_API_KEY_REAL",
    authDomain: "TU_AUTH_DOMAIN_REAL",
    databaseURL: "TU_DATABASE_URL_REAL",
    projectId: "TU_PROJECT_ID_REAL",
    storageBucket: "TU_STORAGE_BUCKET_REAL",
    messagingSenderId: "TU_MESSAGING_SENDER_ID_REAL",
    appId: "TU_APP_ID_REAL"
};

// Inicializamos la base de datos global de Google
firebase.initializeApp(firebaseConfig);
const baseDeDatos = firebase.database();

const formulario = document.querySelector('form');
const contenedorPoemas = document.getElementById('contenedor-poemas');

function renderizarPoema(autor, titulo, contenido) {
    const nuevoArticulo = document.createElement('article');
    nuevoArticulo.innerHTML = `
        <h2>${titulo}</h2>
        <p><strong>Escrito por:</strong> ${autor}</p>
        <p>${contenido.replace(/\n/g, '<br>')}</p> 
    `;
    contenedorPoemas.prepend(nuevoArticulo);
}

// ESCUCHADOR GLOBAL: Al cargar la página o cuando alguien publique, descarga el poema automáticamente
baseDeDatos.ref('poemas').on('child_added', function(snapshot) {
    const poema = snapshot.val();
    renderizarPoema(poema.autor, poema.titulo, poema.contenido);
});

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