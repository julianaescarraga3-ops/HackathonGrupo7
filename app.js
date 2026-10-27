//Crear carrito de compras

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const catalogo = document.getElementById("catalogo");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

// Convertir el número a moneda local
function formatearprecio(valor){
    return "$" + valor.toLocaleString("es-CO");
}

// Funciones del carrito de compra
//Agregar al carrito 

function agregarAlCarrito(idRuta) {
  let rutaElegida = null;

  for (let i = 0; i < rutas.length; i++) {
    if (rutas[i].id === idRuta) {
      rutaElegida = rutas[i];
    }
  }

  if (rutaElegida !== null) {
    carrito.push(rutaElegida);
  }

  guardarCarrito();
  mostrarCarrito();
}

//eliminar del carrito

function eliminarDelCarrito(posicion) {
  let carritoNuevo = [];

  for (let i = 0; i < carrito.length; i++) {
    if (i !== posicion) {
      carritoNuevo.push(carrito[i]);
    }
  }

  carrito = carritoNuevo;

  guardarCarrito();
  mostrarCarrito();
}

// guardar el carrito 

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// mostrar el carrito 

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML =
      '<li>Tu carrito está vacío. Elige una ruta arriba.</li>';
  }

  for (let i = 0; i < carrito.length; i++) {
    let ruta = carrito[i];

    total = total + ruta.precio;

    listaCarrito.innerHTML +=
      "<li>" +
        ruta.origen + " → " + ruta.destino +
        " · " + formatearPrecio(ruta.precio) +
        ' <button onclick="eliminarDelCarrito(' + i + ')">Eliminar</button>' +
      "</li>";
  }

  totalCarrito.textContent = formatearPrecio(total);
  contadorCarrito.textContent = carrito.length;
}