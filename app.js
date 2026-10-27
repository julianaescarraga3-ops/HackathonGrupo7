// Rutas de ejemplo. Reemplaza estos valores con las rutas y tarifas oficiales.
const rutas = [
  { id: 1, origen: "Bogotá", destino: "Medellín", precio: 85000 },
  { id: 2, origen: "Bogotá", destino: "Cartagena", precio: 145000 },
  { id: 3, origen: "Medellín", destino: "Cali", precio: 92000 },
  { id: 4, origen: "Cali", destino: "Bogotá", precio: 78000 }
];

const catalogo = document.getElementById("catalogo");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const contadorResumen = document.getElementById("contador-carrito-resumen");

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    return Array.isArray(guardado) ? guardado.filter((ruta) => ruta && Number.isFinite(Number(ruta.precio))) : [];
  } catch {
    return [];
  }
}

let carrito = cargarCarrito();

function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CO");
}

function mostrarCatalogo() {
  catalogo.innerHTML = rutas.map((ruta) => `
    <article class="ruta-card">
      <div class="ruta-icono" aria-hidden="true">↗</div>
      <span class="ruta-etiqueta">Ruta ${String(ruta.id).padStart(2, "0")}</span>
      <h3>${ruta.origen} <span aria-hidden="true">→</span> ${ruta.destino}</h3>
      <p class="ruta-precio">${formatearPrecio(ruta.precio)} <small>por persona</small></p>
      <button class="boton-agregar" type="button" data-agregar="${ruta.id}">Agregar al carrito</button>
    </article>
  `).join("");
}

function agregarAlCarrito(idRuta) {
  const rutaElegida = rutas.find((ruta) => ruta.id === Number(idRuta));
  if (!rutaElegida) return;
  carrito.push(rutaElegida);
  guardarCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(posicion) {
  carrito.splice(Number(posicion), 1);
  guardarCarrito();
  mostrarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  listaCarrito.replaceChildren();
  let total = 0;

  if (carrito.length === 0) {
    const mensaje = document.createElement("li");
    mensaje.className = "carrito-vacio";
    mensaje.textContent = "Tu carrito está vacío. Elige una ruta para comenzar.";
    listaCarrito.append(mensaje);
  }

  carrito.forEach((ruta, posicion) => {
    total += Number(ruta.precio);
    const fila = document.createElement("li");
    fila.className = "item-carrito";
    const detalle = document.createElement("span");
    detalle.textContent = `${ruta.origen} → ${ruta.destino} · ${formatearPrecio(ruta.precio)}`;
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-eliminar";
    boton.dataset.eliminar = posicion;
    boton.textContent = "Eliminar";
    boton.setAttribute("aria-label", `Eliminar ruta ${ruta.origen} a ${ruta.destino}`);
    fila.append(detalle, boton);
    listaCarrito.append(fila);
  });

  totalCarrito.textContent = formatearPrecio(total);
  contadorCarrito.textContent = carrito.length;
  contadorResumen.textContent = carrito.length;
}

catalogo.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-agregar]");
  if (boton) agregarAlCarrito(boton.dataset.agregar);
});

listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-eliminar]");
  if (boton) eliminarDelCarrito(boton.dataset.eliminar);
});

mostrarCatalogo();
mostrarCarrito();
