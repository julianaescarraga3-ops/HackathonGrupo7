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
  },
];

function cargarViajes() {
  const contenedor = document.getElementById("lista-viajes");
  contenedor.innerHTML = "";

  viajesBus.forEach(viaje => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card";

    // 2. Estructura HTML
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
        <p><strong>📅 Fecha:</strong> ${viaje.fecha}</p>
        <p><strong>💰 Precio:</strong> $ ${viaje.precio.toLocaleString()} COP</p>
        <p><strong>💺 Cupos:</strong> ${viaje.cuposDisponibles} disponibles</p>
      </div>
    `;

    tarjeta.addEventListener("click", () => {
      tarjeta.classList.toggle("volteada");
    });

    col.appendChild(tarjeta);
    contenedor.appendChild(col);
  });
}

// Ejecutar al cargar el script
cargarViajes();