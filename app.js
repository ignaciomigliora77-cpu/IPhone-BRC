const $ = (s) => document.querySelector(s);
const grid = $("#grid");
const filtros = $("#filtros");
const buscador = $("#buscador");
const vacio = $("#vacio");

let categoriaActiva = "Todos";
let texto = "";

// ---------- WhatsApp ----------
function linkWA(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = linkWA(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
});

// ---------- Filtros ----------
function crearFiltros() {
  const cats = ["Todos", ...new Set(PRODUCTOS.map((p) => p.categoria))];
  filtros.innerHTML = "";
  cats.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (c === categoriaActiva ? " active" : "");
    b.textContent = c;
    b.addEventListener("click", () => {
      categoriaActiva = c;
      crearFiltros();
      render();
    });
    filtros.appendChild(b);
  });
}

// ---------- Tarjetas ----------
function tarjeta(p) {
  const foto = p.imagen
    ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">`
    : `<span class="ph">${p.nombre}</span>`;
  const boton = p.stock
    ? `<a class="btn btn-small" target="_blank" rel="noopener"
         href="${linkWA(`Hola! Me interesa el ${p.nombre} (${p.detalle}). ¿Está disponible?`)}">Consultar</a>`
    : `<span class="agotado">Sin stock</span>`;
  return `
    <article class="card${p.stock ? "" : " off"}">
      <div class="foto">${foto}<span class="tag">${p.condicion}</span></div>
      <div class="card-body">
        <h3>${p.nombre}</h3>
        <p class="detalle">${p.detalle}</p>
        <div class="card-foot">
          <strong class="precio">USD ${p.precio.toLocaleString("es-AR")}</strong>
          ${boton}
        </div>
      </div>
    </article>`;
}

function render() {
  const q = texto.trim().toLowerCase();
  const lista = PRODUCTOS.filter(
    (p) =>
      (categoriaActiva === "Todos" || p.categoria === categoriaActiva) &&
      (p.nombre + " " + p.detalle).toLowerCase().includes(q)
  );
  grid.innerHTML = lista.map(tarjeta).join("");
  vacio.hidden = lista.length > 0;
}

buscador.addEventListener("input", (e) => {
  texto = e.target.value;
  render();
});

$("#ig").href = NEGOCIO.instagram;
$("#anio").textContent = new Date().getFullYear();
crearFiltros();
render();