// Menu Hamburguesa
document.addEventListener("DOMContentLoaded", function () {
    const botonHamburguesa = document.querySelector(".hamburguesa");
    const menu = document.querySelector(".menu");

    botonHamburguesa.addEventListener("click", function () {
      menu.classList.toggle("abierto"); // Activa o desactiva la clase 'abierto'
    });
  });

// Cambio de inicio a registro
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".login-container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-in-mode2");
});

// Scroll Infinito
let imagenes = [];
let indiceImagenActual = 0;
let page = 1; // Número de página inicial
const perPage = 2; // Número de imágenes por página

// Función para cargar imágenes desde el archivo JSON local
function loadImages( ) {
    $.ajax({
        url: '/js/imagenes.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            const images = data.slice(startIndex, endIndex);
            displayImages(images); // Función para mostrar imágenes en la página
            page++; // Incrementa el número de página para la próxima carga
        },
        error: function (error) {
            console.error('Error al cargar imágenes:', error);
        }
    });
}

// Función para mostrar imágenes en la página
function displayImages(images) {
    const galeria = $('#galeria');
    
    images.forEach(image => {
        const imgElement = `<img src="${image.url}" alt="${image.alt}">`;
        galeria.append(imgElement);
    });
}

// Función para verificar si el usuario ha llegado al final de la página
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
        loadImages(); // Carga más imágenes cuando el usuario llega al final
    }
});

// Carga las primeras imágenes al cargar la página
loadImages();



// Mostrar el modal cuando se hace clic en una imagen
$('.imagen-pequena').on('click', function() {
    const src = $(this).attr('src');
    imagenes = $('.imagen-pequena').map(function() {
        return $(this).attr('src');
    }).get();
    indiceImagenActual = imagenes.indexOf(src);
    mostrarImagen(indiceImagenActual);
    $('#modal').css('display', 'block');
});
// Función para mostrar la imagen en el modal
function mostrarImagen(indice) {
    $('#imagen-ampliada').attr('src', imagenes[indice]);
}
// Función para cambiar la imagen en el modal
function cambiarImagen(direccion) {
    indiceImagenActual += direccion;
    if (indiceImagenActual < 0) {
        indiceImagenActual = imagenes.length - 1;
    } else if (indiceImagenActual >= imagenes.length) {
        indiceImagenActual = 0;
    }
    mostrarImagen(indiceImagenActual);
}

// Cerrar el modal cuando se hace clic en la "X"
$('.cerrar-modal').on('click', function() {
    $('#modal').css('display', 'none');
});

// Seleccionar los enlaces del menú
const enlaces = document.querySelectorAll('.menu-categorias a');

// Escuchar el evento de clic en cada enlace
enlaces.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    // Obtener la sección destino del enlace
    const seccionDestino = document.querySelector(enlace.getAttribute('href'));

    // Desplazar suavemente hacia la sección destino
    seccionDestino.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Resaltar el enlace activo
    enlaces.forEach(link => link.classList.remove('active'));
    enlace.classList.add('active');
  });
});

// Resaltar automáticamente según la sección visible al hacer scroll
window.addEventListener('scroll', () => {
  const secciones = document.querySelectorAll('.categoria');
  let scrollPos = window.scrollY;

  secciones.forEach(seccion => {
    const offsetTop = seccion.offsetTop - 100; // Ajuste para el menú sticky
    const offsetBottom = offsetTop + seccion.offsetHeight;

    const enlace = document.querySelector(`.menu-categorias a[href="#${seccion.id}"]`);

    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      enlaces.forEach(link => link.classList.remove('active'));
      enlace.classList.add('active');
    }
  });
});



