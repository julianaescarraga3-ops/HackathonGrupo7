// ---------- Datos: una sola fuente para tarjetas y carrito ----------
const viajesBus = [
  {
    id: 1,
    titulo: "Bogotá ➔ Medellín",
    tipo: "Tour Paisaje Cafetero y Ciudad",
    partida: "Terminal Salitre (Bogotá)",
    destino: "Medellín, Antioquia",
    fecha: "2026-11-15",
    precio: 95000,
    cuposDisponibles: 12,
    imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ee/bd/59/penon-de-guatape.jpg?w=500&h=-1&s=1"
  },
  {
    id: 2,
    titulo: "Bogotá ➔ Cartagena",
    tipo: "Escapada Caribeña Express",
    partida: "Terminal del Sur (Bogotá)",
    destino: "Cartagena de Indias",
    fecha: "2026-12-01",
    precio: 180000,
    cuposDisponibles: 8,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyD3nm8jWxGUNZxrafn8e552paOwHXjp4oZHVPxgyGOM1_7pWM5admOVSB&s=10"
  },
  {
    id: 3,
    titulo: "Bogotá ➔ Villa de Leyva",
    tipo: "Tour Histórico y Fin de Semana",
    partida: "Terminal Salitre (Bogotá)",
    destino: "Villa de Leyva, Boyacá",
    fecha: "2026-11-08",
    precio: 65000,
    cuposDisponibles: 15,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinLkumlrp5gcToxdJImpZ1tTZ3-hpRPBA38k72gc7CGJxYBSDMia4DQc&s=10"
  },
  {
    id: 4,
    titulo: "Bogotá ➔ Eje Cafetero (Salento)",
    tipo: "Aventura Valle de Cocora",
    partida: "Terminal del Sur (Bogotá)",
    destino: "Salento, Quindío",
    fecha: "2026-11-20",
    precio: 120000,
    cuposDisponibles: 10,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfTSEJPU5rdoc1BL7LzljrQsVCg-cnxuBZTyq73qYcA&s=10"
  }
];

// ---------- Carrito de compras ----------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const contadorResumen = document.getElementById("contador-carrito-resumen");
const contenedorViajes = document.getElementById("lista-viajes");

// Convertir el número a moneda local
function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CO");
}

function formatearFecha(texto) {
  return new Date(texto + "T00:00:00").toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Agregar al carrito
function agregarAlCarrito(idViaje) {
  let viajeElegido = null;
  for (let i = 0; i < viajesBus.length; i++) {
    if (viajesBus[i].id === idViaje) {
      viajeElegido = viajesBus[i];
    }
  }
  if (viajeElegido !== null) {
    carrito.push({
      id: viajeElegido.id,
      titulo: viajeElegido.titulo,
      precio: viajeElegido.precio
    });
  }
  guardarCarrito();
  mostrarCarrito();
}

// Eliminar del carrito
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

// Guardar el carrito
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar el carrito
function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  if (carrito.length === 0) {
    listaCarrito.innerHTML =
      '<li class="carrito-vacio">Tu carrito está vacío. Elige una ruta arriba.</li>';
  }
  for (let i = 0; i < carrito.length; i++) {
    let ruta = carrito[i];
    let nombre = ruta.titulo || (ruta.origen + " ➔ " + ruta.destino);
    total = total + ruta.precio;
    listaCarrito.innerHTML +=
      '<li class="item-carrito">' +
      "<span>" + nombre + " · " + formatearPrecio(ruta.precio) + "</span>" +
      '<button type="button" class="boton-eliminar" onclick="eliminarDelCarrito(' + i + ')">Eliminar</button>' +
      "</li>";
  }
  totalCarrito.textContent = formatearPrecio(total);
  contadorCarrito.textContent = carrito.length;
  contadorResumen.textContent = carrito.length;
}

// ---------- Tarjetas de destinos ----------
function cargarViajes() {
  contenedorViajes.innerHTML = "";

  viajesBus.forEach((viaje) => {
    const col = document.createElement("div");
    col.className = "viaje-col col-12 col-sm-6 col-lg-3";

    const tarjeta = document.createElement("div");
    tarjeta.className = "viaje-card";
    tarjeta.tabIndex = 0;
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("aria-label", `Ver detalles del viaje a ${viaje.destino}`);

    tarjeta.innerHTML = `
      <div class="card-frente" style="background-image: url('${viaje.imagen}');">
        <div class="capa-oscura"></div>
        <div class="contenido-frente">
          <h3>${viaje.destino}</h3>
          <span>Ver detalles 🔄</span>
        </div>
      </div>
      <div class="card-dorso">
        <h4>${viaje.titulo}</h4>
        <p><strong>📅 Fecha:</strong> ${formatearFecha(viaje.fecha)}</p>
        <p><strong>💰 Precio:</strong> ${formatearPrecio(viaje.precio)} COP</p>
        <p><strong>💺 Cupos:</strong> ${viaje.cuposDisponibles} disponibles</p>
        <button class="boton-agregar boton-agregar-dorso" type="button">Agregar al carrito</button>
      </div>
    `;

    // Voltear la tarjeta con clic o con teclado
    tarjeta.addEventListener("click", () => {
      tarjeta.classList.toggle("volteada");
    });

    tarjeta.addEventListener("keydown", (evento) => {
      if (evento.target !== tarjeta) return;
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        tarjeta.classList.toggle("volteada");
      }
    });

    // El botón agrega al carrito sin voltear la tarjeta
    const botonAgregar = tarjeta.querySelector(".boton-agregar-dorso");
    botonAgregar.addEventListener("click", (evento) => {
      evento.stopPropagation();
      agregarAlCarrito(viaje.id);

      botonAgregar.textContent = "¡Agregado! ✓";
      setTimeout(() => {
        botonAgregar.textContent = "Agregar al carrito";
      }, 1200);
    });

    col.appendChild(tarjeta);
    contenedorViajes.appendChild(col);
  });
}

// ---------- Inicio ----------
cargarViajes();
mostrarCarrito();
