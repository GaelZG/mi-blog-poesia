// 1. Identificamos el formulario y la sección donde se muestran los poemas
const formulario = document.querySelector('form');
const contenedorPoemas = document.getElementById('contenedor-poemas');

// 2. Al cargar la página, recuperamos los poemas guardados en LocalStorage
// Si no hay ninguno, creamos una lista vacía []
let listaPoemas = JSON.parse(localStorage.getItem('misPoemas')) || [];

// 3. Función única para pintar un poema en la pantalla de la bitácora
function renderizarPoema(autor, titulo, contenido) {
    const nuevoArticulo = document.createElement('article');
    nuevoArticulo.innerHTML = `
        <h2>${titulo}</h2>
        <p><strong>Escrito por:</strong> ${autor}</p>
        <p>${contenido.replace(/\n/g, '<br>')}</p> 
    `;
    contenedorPoemas.prepend(nuevoArticulo);
}

// 4. Pintamos todos los poemas que ya estaban guardados al abrir la página
listaPoemas.forEach(poema => {
    renderizarPoema(poema.autor, poema.titulo, poema.contenido);
});

// 5. Escuchamos el formulario cuando alguien envía (submit) una nueva publicación
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Frenamos el reinicio de la página

    const autor = document.getElementById('autor').value;
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    // Validación de campos vacíos
    if (autor === '' || titulo === '' || contenido === '') {
        alert('Por favor, llena todos los campos antes de continuar publicando escritor');
        return;
    }

    // A) Pintamos el nuevo poema en la pantalla de inmediato
    renderizarPoema(autor, titulo, contenido);

    // B) Creamos un objeto con los datos y lo metemos a nuestra lista en memoria
    const nuevoPoemaObjeto = { autor, titulo, contenido };
    listaPoemas.push(nuevoPoemaObjeto);

    // C) Guardamos la lista actualizada en el LocalStorage convirtiéndola a texto
    localStorage.setItem('misPoemas', JSON.stringify(listaPoemas));

    // D) Limpiamos las cajas de texto del formulario
    formulario.reset();
});