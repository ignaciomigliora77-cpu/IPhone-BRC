/* ============================================================
 *  Emporio Tecnología — lógica compartida
 * ============================================================ */

/* Colores de los swatches (tono aproximado para los botones de color) */
const COLOR_SWATCHES = {
  "Natural Titanium": "#cfd6d1", "Desert Titanium": "#c2a28b",
  "White Titanium": "#e7e7e2", "Black Titanium": "#3a3b40",
  "Ultramarine": "#1e4fd6", "Teal": "#1f8a84", "Pink": "#f2b0c9",
  "White": "#f3f3f3", "Black": "#202226",
  "Blue": "#3a7bd5", "Green": "#7ec464",
  "Midnight": "#232a31", "Starlight": "#f2e6d3", "Red": "#c8102e",
  "Graphite": "#5b5d62", "Gold": "#d9c08c", "Silver": "#d9dbe0",
  "Purple": "#8d74b4", "Sky Blue": "#b9d4ee",
  "Space Gray": "#787a7f", "Space Black": "#2c2d30",
  "Light Gold": "#d2b48c", "Yellow": "#f0d34e", "Orange": "#ee7a2f"
};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Precios ---------- */
const PRECIOS = {
  blue: CONFIG.dollarRateBlue,
  official: CONFIG.dollarRateOfficial,
  margin: CONFIG.dollarRateMargin,
  factor() { return this.blue + this.margin; },
  ars(usd) { return Math.round(usd * this.factor()); },
  fmtARS(n) { return "$ " + n.toLocaleString("es-AR"); }
};

async function cargarDolar() {
  try {
    const r = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const j = await r.json();
    PRECIOS.blue = j.blue.value_sell;
    PRECIOS.official = j.oficial.value_sell;
  } catch (e) {
    // sin conexión: se usa la cotización de respaldo de datos.js
  }
  document.dispatchEvent(new CustomEvent("precios:update"));
}

/* ---------- WhatsApp ---------- */
const linkWA = (mensaje) =>
  "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(mensaje);

const ICONO_WA =
  '<svg viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

const limpiaId = (v) => String(v || "").toLowerCase().replace(/\s+/g, " ").trim();
// Búsqueda estricta: solo coincidencia por id numérico o nombre exacto.
// Antes, el fallback por "includes" devolvía el primer producto (iPhone 16 Pro)
// cuando el id venía vacío o inválido. Ahora eso muestra "Producto no encontrado".
const productoPorId = (id) =>
  PRODUCTOS.find((p) => String(p.id) === String(id)) ||
  PRODUCTOS.find((p) => limpiaId(p.name) === limpiaId(id)) ||
  null;

/* ---------- Tarjeta de producto ---------- */
function precioPara(p) {
  return {
    actual: PRECIOS.ars(p.price),
    orig: p.isOnSale && p.originalPrice ? PRECIOS.ars(p.originalPrice) : null
  };
}

function tarjetaProducto(p) {
  const { actual, orig } = precioPara(p);
  const condLabel = condicionProducto(p);
  const badges =
    (p.isNew ? '<span class="badge badge-dark">Nuevo</span>' : "") +
    (p.isOnSale ? '<span class="badge badge-red">' + p.discountPercentage + "% OFF</span>" : "");
  const wha = linkWA(mensajeConsulta(p));
  return `
    <article class="product-card">
      <div class="pc-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${badges ? '<div class="pc-badges">' + badges + "</div>" : ""}
      </div>
      <div class="pc-body">
        <div>
          <div class="pc-top">
            <div>
              <h3 class="pc-name">${p.name}</h3>
              <span class="pc-cat">${p.category}</span>
            </div>
            <div class="pc-pre">
              ${orig !== null ? '<p class="pc-orig">' + PRECIOS.fmtARS(orig) + "</p>" : ""}
              <p class="pc-ars${p.isOnSale ? " oferta" : ""}">${PRECIOS.fmtARS(actual)}</p>
              <p class="pc-usd">USD ${p.price}</p>
            </div>
          </div>
          <p class="pc-desc">${p.description}</p>
        </div>
        <div class="pc-actions">
          <a class="btn btn-dark" href="${wha}" target="_blank" rel="noopener noreferrer">${ICONO_WA}<span class="pc-wa-txt">Consultar</span></a>
          <a class="btn btn-outline" href="producto?id=${p.id}"><span class="det-txt">Ver detalles</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
        </div>
      </div>
    </article>`;
}

function renderLista(cont, productos, vacioTexto, animar = false) {
  if (!cont) return;
  if (!productos.length) {
    cont.innerHTML = `
      <div class="vacio">
        <div class="vacio-ic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m8.5 8.5 5 5"/><path d="m13.5 8.5-5 5"/></svg>
        </div>
        <p>No encontramos productos</p>
        <p class="vacio-sub">${vacioTexto || "No se encontraron productos."} Probá con otra búsqueda o quitá algunos filtros.</p>
        <a class="btn btn-outline vacio-cta" href="productos">Ver todo el catálogo</a>
      </div>`;
    return;
  }
  cont.innerHTML = `<div class="lista${animar ? " animar" : ""}">${productos
    .map(tarjetaProducto)
    .join("")}</div>`;
}

/* ---------- Buscador del navbar ---------- */
function iniciarBuscador() {
  $$("[data-nav-search]").forEach((box) => {
    const input = $("[data-search-input]", box);
    const res = $("[data-search-results]", box);
    if (!input || !res) return;

    function buscar(q) {
      if (!q || q.length < 2) return [];
      return PRODUCTOS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 5);
    }

    function pintar(q) {
      const lista = buscar(q);
      if (!lista.length) { res.innerHTML = ""; res.classList.remove("open"); return; }
      res.innerHTML =
        lista
          .map(
            (p) => `
            <a class="sr-item" href="producto?id=${p.id}">
              <img src="${p.image}" alt="" width="32" height="32">
              <div><p class="sr-name">${p.name}</p><p class="sr-cat">${p.category}</p></div>
            </a>`
          )
          .join("") +
        `<div class="sr-more"><button type="button" data-sr-todo>Ver todos los resultados para "${q}"</button></div>`;
      res.classList.add("open");
      $("[data-sr-todo]", res).addEventListener("click", () => {
        location.href = "productos?search=" + encodeURIComponent(q);
      });
    }

    input.addEventListener("input", (e) => pintar(e.target.value.trim().toLowerCase()));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = input.value.trim();
        if (q) location.href = "productos?search=" + encodeURIComponent(q);
      }
    });

    // botón para limpiar la búsqueda
    const navClear = $("[data-nav-clear]", box);
    if (navClear) {
      const syncNavClear = () => navClear.classList.toggle("visible", input.value.length > 0);
      input.addEventListener("input", syncNavClear);
      navClear.addEventListener("click", () => {
        input.value = "";
        res.innerHTML = "";
        res.classList.remove("open");
        syncNavClear();
        input.focus();
      });
      syncNavClear();
    }
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) { res.classList.remove("open"); }
    });
  });

  // menú móvil
  const burger = $("[data-burger]");
  const movil = $("[data-nav-mobile]");
  if (burger && movil) {
    burger.addEventListener("click", () => {
      const abierto = movil.classList.toggle("open");
      burger.setAttribute("aria-expanded", abierto);
    });
    // cerrar el menú al tocar cualquier enlace interno
    $$("a", movil).forEach((a) =>
      a.addEventListener("click", () => {
        movil.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus({ preventScroll: true });
      })
    );
  }
}

/* ---------- Plan Canje (calculadora) ---------- */
function valorCanje(m, cap, bat) {
  const modelo = CONFIG.tradeIn.models.find((x) => x.name === m);
  if (!modelo || !cap || !bat) return null;
  const v = modelo.values[cap];
  return v && typeof v[bat] === "number" ? v[bat] : null;
}

function mountCanje(contenedor, opts = {}) {
  opts = opts || {};
  const producto = opts.product || null;
  const variante = opts.variant || "home";

  contenedor.innerHTML = `
    <div class="tic2">
      <div class="tic2-mesh" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="tic2-head">
        <div class="tic2-eyebrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
Plan Canje
        </div>
        <span class="tic2-badge">Cotización por WhatsApp</span>
      </div>
      <p class="tic2-title">${variante === "product" && producto
        ? "Calculá cuánto pagás por " + producto.name
        : "Tomamos tu Apple usado y te ayudamos a renovar"}</p>
      <p class="tic2-desc">Contanos qué equipo traés y te pasamos el valor y los pasos por WhatsApp.</p>

      <div class="tic2-fields">
        <label>
          <span>Modelo a entregar</span>
          <select data-t-modelo></select>
        </label>
        <label>
          <span>Capacidad</span>
          <select data-t-cap></select>
        </label>
        <label>
          <span>Condición de batería</span>
          <div class="tic2-batrow">
            <input type="text" data-t-bat placeholder="Ej: 85% · todo impecable" autocomplete="off">
            <div class="tic2-chips" data-t-bat-chips></div>
          </div>
        </label>
      </div>

      <a class="btn btn-dark btn-full" href="#" target="_blank" rel="noopener noreferrer" data-t-wa aria-disabled="true">Valorar mi equipo</a>
    </div>`;

  const modelo = $(`[data-t-modelo]`, contenedor);
  const cap = $(`[data-t-cap]`, contenedor);
  const bat = $(`[data-t-bat]`, contenedor);
  const chips = $(`[data-t-bat-chips]`, contenedor);
  const wa = $(`[data-t-wa]`, contenedor);

  const setOpciones = (sel, valores) => {
    sel.innerHTML = valores
      .map((v) => `<option value="${v}">${v}</option>`)
      .join("");
  };

  setOpciones(modelo, [...new Set(CONFIG.tradeIn.models.map((m) => m.name))]);
  setOpciones(cap, CONFIG.tradeIn.capacities);

  chips.innerHTML = CONFIG.tradeIn.batteryConditions
    .map((c) => `<button type="button" class="tic2-chip" data-bat-chip>${c}</button>`)
    .join("");

  function pintar() {
    const m = modelo.value || "—";
    const c = cap.value || "—";
    const b = bat.value.trim();

    const completo = m !== "—" && !!c && !!b;
    wa.classList.toggle("disabled", !b);
    wa.setAttribute("aria-disabled", b ? "false" : "true");

    const datos =
      "Equipo a entregar: " + m + " " + c + "\n" +
      "Estado de batería: " + (b || "—");

    const mensaje = producto
      ? "¡Hola! 👋 Soy de " + CONFIG.storeName + " y quiero cotizar mi equipo para llegar a un " + producto.name + ".\n\n" +
        datos + "\n\n" +
        "¿Podrían pasarme el valor que me dan por mi usado y cuál sería el precio final del " + producto.name + " (" + condicionProducto(producto) + ")?\n" +
        "Quedo atento a su respuesta. ¡Gracias!"
      : "¡Hola! 👋 Soy de " + CONFIG.storeName + " y quiero hacer un plan canje con un equipo de su catálogo.\n\n" +
        datos + "\n\n" +
        "¿Podrían pasarme el valor de mi usado y cómo sería el proceso para renovar?\n" +
        "Quedo a su disposición, ¡gracias!";

    if (b) wa.href = linkWA(mensaje);
  }

  $$("[data-bat-chip]", contenedor).forEach((ch) =>
    ch.addEventListener("click", () => {
      bat.value = ch.textContent;
      $$("[data-bat-chip]", contenedor).forEach((x) => x.classList.toggle("active", x === ch));
      pintar();
    })
  );

  [modelo, cap, bat].forEach((s) => s.addEventListener("input", pintar));
  bat.addEventListener("input", () => {
    $$("[data-bat-chip]", contenedor).forEach((ch) => ch.classList.remove("active"));
    pintar();
  });
  pintar();
}

/* ---------- Home ---------- */
function pintarHome() {
  const fr = (sel) => $(sel);
  const featured = PRODUCTOS.filter((p) => p.isFeatured);
  const bestSellers = PRODUCTOS.filter((p) => p.isBestSeller);
  const onSale = PRODUCTOS.filter((p) => p.isOnSale);
  const refurb = PRODUCTOS.filter((p) => p.condition === "refurbished");

  renderLista(fr("[data-contenido-ofertas]"), onSale,
    "No hay productos en oferta actualmente.");
  renderLista(fr("[data-contenido-masvendidos]"), bestSellers.slice(0, 4),
    "Marca productos como más vendidos.");
  renderLista(fr("[data-contenido-seminuevos]"), refurb.slice(0, 4),
    'Agregá productos con condición "seminuevo".');
  renderLista(fr("[data-contenido-destacados]"), featured,
    "Marca productos como destacados.");

  document.addEventListener("precios:update", () => {
    renderLista(fr("[data-contenido-ofertas]"), onSale,
      "No hay productos en oferta actualmente.");
    renderLista(fr("[data-contenido-masvendidos]"), bestSellers.slice(0, 4),
      "Marca productos como más vendidos.");
    renderLista(fr("[data-contenido-seminuevos]"), refurb.slice(0, 4),
      'Agregá productos con condición "seminuevo".');
    renderLista(fr("[data-contenido-destacados]"), featured,
      "Marca productos como destacados.");
  });
}

/* ---------- Hero (rotación de destacados) ---------- */
function pintarHero() {
  const card = $("[data-hero-rot]");
  if (!card) return;
  const ids = CONFIG.heroProductIds || [];
  const lista = ids
    .map((id) => PRODUCTOS.find((p) => String(p.id) === String(id)))
    .filter(Boolean);
  if (!lista.length) return;

  const chipA = card.querySelector(".hv-chip-a");
  const img = card.querySelector(".hv-img");
  const usd = (p) => p.price.toLocaleString("es-AR");

  let i = 0;
  const mostrar = () => {
    const p = lista[i % lista.length];
    if (img) { img.src = p.image; img.alt = p.name; }
    if (chipA) {
      chipA.href = "producto?id=" + p.id;
      chipA.querySelector("b").textContent = p.name;
      chipA.querySelector("span").textContent = "Desde US$ " + usd(p);
    }
    card.classList.remove("hv-fade");
    void card.offsetWidth;
    card.classList.add("hv-fade");
    i++;
  };

  mostrar();
  setInterval(mostrar, 3500);
}

/* ---------- Productos ---------- */
function pintarProductos() {
  const cont = $("[data-resultados]");
  const enFiltro = (panel) => $$("[data-f-cat]", panel).concat($$("[data-f-precio]", panel));

  let tab = "todos";
  let cat = null;
  let precio = null;
  let busqueda = "";

  const params = new URLSearchParams(location.search);
  if (params.get("filter") === "ofertas") tab = "ofertas";
  if (params.get("filter") === "seminuevos") tab = "seminuevos";
  if (params.get("tab") === "masvendidos") tab = "masvendidos";
  busqueda = params.get("search") || "";
  cat = params.get("category") || null;

  function filtrar() {
    let lista = PRODUCTOS.filter((p) => {
      const porBusqueda =
        busqueda === "" ||
        p.name.toLowerCase().includes(busqueda) ||
        p.description.toLowerCase().includes(busqueda);
      const porCat = !cat || p.category === cat;
      let porPrecio = true;
      if (precio) {
        switch (precio) {
          case "under500": porPrecio = p.price < 500; break;
          case "500to1000": porPrecio = p.price >= 500 && p.price <= 1000; break;
          case "1000to2000": porPrecio = p.price > 1000 && p.price <= 2000; break;
          case "over2000": porPrecio = p.price > 2000; break;
        }
      }
      let porTab = true;
      if (tab === "nuevos") porTab = p.isNew;
      if (tab === "ofertas") porTab = p.isOnSale;
      if (tab === "masvendidos") porTab = p.isBestSeller;
      if (tab === "seminuevos") porTab = p.condition === "refurbished";
      return porBusqueda && porCat && porPrecio && porTab;
    });
    if (tab !== "masvendidos") lista.sort((a, b) => b.price - a.price);
    return lista;
  }

  function pintarFiltros() {
    const activosCat = cat, activosPrecio = precio;
    enFiltro(document).forEach((btn) => {
      const tipo = btn.dataset.fCat ? "cat" : "precio";
      const value = btn.dataset.fCat || btn.dataset.fPrecio;
      const activo = tipo === "cat" ? value === activosCat : value === activosPrecio;
      btn.classList.toggle("activo", !!activo);
    });
  }

  function pintarTabs() {
    const tabs = $(".tabs");
    let activo = null;
    $$(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      if (on) activo = t;
    });
    if (tabs && activo) {
      tabs.style.setProperty("--tx", activo.offsetLeft + "px");
      tabs.style.setProperty("--ty", activo.offsetTop + "px");
      tabs.style.setProperty("--tw", activo.offsetWidth + "px");
    }
  }

  function pintarContador(lista) {
    const contador = $("[data-contador]");
    if (contador) {
      contador.textContent = lista.length === 1 ? "1 producto" : lista.length + " productos";
    }
  }

  function syncLimpiar() {
    const limpiar = $("[data-limpiar-busqueda]");
    if (inputBusqueda && limpiar) {
      limpiar.classList.toggle("visible", inputBusqueda.value.trim().length > 0);
    }
  }

  let inputBusqueda;

  function redibujar(animarTab = false) {
    pintarTabs();
    pintarFiltros();
    const lista = filtrar();
    const texto = tab === "ofertas" ? "No hay productos en oferta actualmente."
      : tab === "nuevos" ? "No se encontraron productos nuevos."
      : tab === "masvendidos" ? "No se encontraron productos más vendidos."
      : "No se encontraron productos.";
    renderLista(cont, lista, texto, animarTab);
    pintarContador(lista);
  }

  function setCat(v) { cat = cat === v ? null : v; redibujar(); }
  function setPrecio(v) { precio = precio === v ? null : v; redibujar(); }

  // tabs (la lista entra con animación solo al cambiar de pestaña)
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    tab = t.dataset.tab;
    if (tab === "seminuevos" || tab === "ofertas" || tab === "nuevos" || tab === "masvendidos" || tab === "todos") redibujar(true);
  }));

  // filtros (sidebar + sheet)
  enFiltro(document).forEach((btn) => btn.addEventListener("click", () => {
    if (btn.dataset.fCat) setCat(btn.dataset.fCat);
    else setPrecio(btn.dataset.fPrecio);
  }));

  // buscador de la página
  inputBusqueda = $("[data-busqueda]");
  if (inputBusqueda) {
    inputBusqueda.value = busqueda;
    inputBusqueda.addEventListener("input", (e) => {
      busqueda = e.target.value.trim().toLowerCase();
      const html5 = new URLSearchParams(location.search);
      if (busqueda) html5.set("search", busqueda); else html5.delete("search");
      history.replaceState(null, "", "?" + html5.toString());
      redibujar();
    });
  }

  // botón para limpiar la búsqueda de la página
  const limpiarBusqueda = $("[data-limpiar-busqueda]");
  if (inputBusqueda && limpiarBusqueda) {
    inputBusqueda.addEventListener("input", syncLimpiar);
    limpiarBusqueda.addEventListener("click", () => {
      busqueda = "";
      inputBusqueda.value = "";
      syncLimpiar();
      redibujar();
      const html5 = new URLSearchParams(location.search);
      html5.delete("search");
      history.replaceState(null, "", "?" + html5.toString());
      inputBusqueda.focus();
    });
    syncLimpiar();
  }

  // sheet de filtros (móvil)
  const abrir = $("[data-filtro-abrir]");
  const sheet = $("[data-filtro-sheet]");
  const backdrop = $("[data-filtro-backdrop]");
  if (abrir && sheet && backdrop) {
    abrir.addEventListener("click", () => { sheet.classList.add("open"); backdrop.classList.add("visible"); });
    const cerrar = () => { sheet.classList.remove("open"); backdrop.classList.remove("visible"); };
    backdrop.addEventListener("click", cerrar);
    $$("[data-filtro-cerrar]", sheet).forEach((b) => b.addEventListener("click", cerrar));
  }

  redibujar();
  window.addEventListener("resize", () => { if ($(".tabs")) pintarTabs(); });
  document.addEventListener("precios:update", () => renderLista(cont, filtrar(), "No se encontraron productos."));
}

/* ---------- Detalle de producto (página completa) ---------- */
const HL_SVGS = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.7 6 .3-4.7 3.7 1.6 5.8-4.8-3.5-4.8 3.5 1.6-5.8L4.1 9l6-.3z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="7" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M12 12v3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>'
];
const ICONO_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const ICONO_MAP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>';

function specRows(p) {
  const specs =
    (p.specs && Object.keys(p.specs).length && p.specs) ||
    SPECS_DEFAULT[p.category] ||
    {};
  return Object.entries(specs)
    .map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
}

function pintarProducto() {
  const id = new URLSearchParams(location.search).get("id");
  const p = productoPorId(id);
  const cont = $("[data-detalle]");
  const crumb = $("[data-crumb]");
  if (!p || !cont) {
    if (crumb) crumb.innerHTML = "";
    if (cont) cont.innerHTML = `<div class="vacio"><p>Producto no encontrado.</p><p class="vacio-sub">Volvé al <a class="link" href="productos">catálogo</a>.</p></div>`;
    return;
  }
  document.title = p.name + " | " + CONFIG.storeName;

  if (crumb) {
    crumb.innerHTML =
      '<a class="link" href="productos?category=' + encodeURIComponent(p.category) + '">' + p.category + "</a> / " +
      "<strong>" + p.name + "</strong>";
  }

  const badges =
    (p.isNew ? '<span class="badge badge-dark">Nuevo</span>' : "") +
    (p.condition === "refurbished" ? '<span class="badge badge-dark">Seminuevo</span>' : "") +
    (p.isOnSale ? '<span class="badge badge-red">' + p.discountPercentage + "% OFF</span>" : "");

  const thumbs = p.imageGallery
    ? [p.image, ...Object.values(p.imageGallery)].filter((s, i, a) => a.indexOf(s) === i)
    : [];

  let delta = 0;
  const selStore = p.storageOptions && p.storageOptions.length ? p.storageOptions[0] : { label: p.storageCapacity || "", price: 0 };
  let colorSel = p.colors && p.colors.length ? p.colors[0] : "";
  const todosLosWA = [];

  const relacionadoList = PRODUCTOS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  const wrapRelacionados = relacionadoList.length
    ? `<section class="pdet-section">
        <div class="pdet-head"><span class="pdet-eyebrow">También podés querer</span><h2>Relacionados</h2></div>
        <div data-pdet-rel></div>
      </section>`
    : "";

  function pintarPrecio() {
    const block = $("[data-precio]", cont);
    if (!block) return;
    const usd = p.price + delta;
    const usdOrig = p.originalPrice ? p.originalPrice + delta : null;
    const ars = PRECIOS.ars(usd);
    const arsOrig = usdOrig !== null ? PRECIOS.ars(usdOrig) : null;
    block.innerHTML =
      (p.isOnSale && usdOrig !== null ? '<p class="pc-orig">' + PRECIOS.fmtARS(arsOrig) + "</p>" : "") +
      '<p class="pc-ars detalle-ars' + (p.isOnSale ? " oferta" : "") + '">' + PRECIOS.fmtARS(ars) + "</p>" +
      '<p class="pc-usd">USD ' + usd.toLocaleString("es-AR") + "</p>";
  }

  function mensajeCompra() {
    return (
      "Hola, me interesa el " + p.name +
      (selStore ? " " + selStore.label : "") +
      (colorSel ? " color " + colorSel : "") +
      ". ¿Me pasás disponibilidad y precio? Vi el anuncio en " + CONFIG.storeName + "."
    );
  }

  function actualizarWA() {
    const href = linkWA(mensajeCompra());
    todosLosWA.forEach((a) => (a.href = href));
  }

  function aplicarColor(c) {
    colorSel = c;
    if (p.imageGallery && p.imageGallery[c]) {
      const img = $("[data-detalle-img]", cont);
      if (img) img.src = p.imageGallery[c];
    }
    const lbl = $("[data-pcolor-label]", cont);
    if (lbl) lbl.textContent = c || "—";
    $$("[data-color]", cont).forEach((b) => {
      const on = b.getAttribute("data-color") === c;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$("[data-finish-color]", cont).forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-finish-color") === c)
    );
    if (p.imageGallery) {
      $$("[data-thumb]", cont).forEach((b) => {
        const src = b.getAttribute("data-thumb");
        b.classList.toggle("active", !!p.imageGallery[c] && p.imageGallery[c] === src);
      });
    }
    actualizarWA();
  }

  cont.innerHTML = `
    <article class="pdet">

      <div class="pdet-hero">
        <div class="pdet-media">
          ${thumbs.length
            ? '<div class="pdet-thumbs" role="group" aria-label="Imágenes">' +
              thumbs.map((s, i) => `<button type="button" class="pdet-thumb${i === 0 ? " active" : ""}" data-thumb="${s}" aria-label="Ver imagen ${i + 1}"><img src="${s}" alt=""></button>`).join("") +
              "</div>"
            : ""}
          <div class="pdet-imgbox">
            <img src="${p.image}" alt="${p.name}" data-detalle-img>
          </div>
        </div>

        <div class="pdet-info">
          <span class="pdet-badgecat">${p.category}</span>
          <div class="pdet-name">
            <h1>${p.name}</h1>
            ${badges ? '<div class="pdet-badges">' + badges + "</div>" : ""}
          </div>
          <p class="detalle-desc">${p.description}</p>
          <div class="pdet-precio" data-precio></div>

          ${p.colors && p.colors.length ? `
          <div class="pdet-colores">
            <span class="pdet-label">Colores: <b data-pcolor-label>${p.colors[0]}</b></span>
            <div class="color-swatches" role="group" aria-label="Colores disponibles" data-swatches>
              ${p.colors.map((c, i) => `
                <button type="button" class="swatch${i === 0 ? " active" : ""}" style="--sw:${COLOR_SWATCHES[c] || "#999"}" aria-label="${c}" aria-pressed="${i === 0 ? "true" : "false"}" data-color="${c}" title="${c}"></button>`).join("")}
            </div>
          </div>` : ""}

          ${p.storageOptions && p.storageOptions.length ? `
          <div class="pdet-store">
            <span class="pdet-label">Almacenamiento</span>
            <div class="pdet-optstore" data-stores>
              ${p.storageOptions.map((s, i) => `
                <button type="button" class="store-opt${i === 0 ? " active" : ""}" data-store="${s.price}" data-store-label="${s.label}">${s.label}</button>`).join("")}
            </div>
          </div>` : ""}

          <div class="pdet-trust">
            <span>${ICONO_CHECK}100% original</span>
            <span>${ICONO_CHECK}Garantía oficial</span>
            <span>${ICONO_CHECK}Envíos al país</span>
            <span>${ICONO_CHECK}Aceptamos USDT</span>
          </div>

          <div class="pdet-actions">
            <a class="btn btn-dark" href="#" target="_blank" rel="noopener noreferrer" data-compra-wa>${ICONO_WA}<span>Consultar por WhatsApp</span></a>
          </div>
        </div>
      </div>

      <section class="pdet-section">
        <div class="pdet-head">
          <span class="pdet-eyebrow">Lo más destacado</span>
          <h2>${p.name}: qué lo hace irresistible</h2>
        </div>
        <div class="pdet-features">
          ${(p.highlights || []).map((h, i) => `
            <div class="pdet-feat">
              <span class="pdet-feat-ic">${HL_SVGS[i % HL_SVGS.length]}</span>
              <span><b>${h}</b></span>
            </div>`).join("")}
        </div>
      </section>

      <section class="pdet-section">
        <div class="pdet-head">
          <span class="pdet-eyebrow">Ficha técnica</span>
          <h2>Especificaciones completas</h2>
        </div>
        <div class="pdet-specs">${specRows(p)}</div>
      </section>

      ${p.inTheBox && p.inTheBox.length ? `
      <section class="pdet-section">
        <div class="pdet-head"><span class="pdet-eyebrow">En la caja</span><h2>Qué incluye</h2></div>
        <ul class="pdet-box">${p.inTheBox.map((x) => `<li>${ICONO_CHECK}<span>${x}</span></li>`).join("")}</ul>
      </section>` : ""}

      ${p.colors && p.colors.length ? `
      <section class="pdet-section">
        <div class="pdet-head">
          <span class="pdet-eyebrow">Colores</span>
          <h2>Elegí el tuyo</h2>
          <p>Tocá un color para verlo aplicado en el equipo.</p>
        </div>
        <div class="pdet-finish">
          ${p.colors.map((c, i) => `
            <button type="button" class="finish-card${i === 0 ? " active" : ""}" data-finish-color="${c}" aria-label="${c}">
              <span class="finish-swatch" style="--sw:${COLOR_SWATCHES[c] || "#999"}"></span>
              <b>${c}</b>
            </button>`).join("")}
        </div>
      </section>` : ""}

      <section class="pdet-section">
        <div class="pdet-head">
          <span class="pdet-eyebrow">Nuestra tienda</span>
          <h2>Pasá a probarlo</h2>
        </div>
        <div class="ubica-card">
          <span class="ubica-ic">${ICONO_MAP}</span>
          <div>
            <b>${direccionCompleta()}</b>
            <p>${CONFIG.address.city}, Río Negro. Pasá a probarlo en el local.</p>
          </div>
          <div class="ubica-links">
            <a class="btn btn-outline" href="${mapsUrl()}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
            <a class="btn btn-dark" href="${linkWA('Hola, quiero pasar a ver el ' + p.name + ' en ' + direccionCompleta())}" target="_blank" rel="noopener noreferrer">${ICONO_WA}Escribinos</a>
          </div>
        </div>
      </section>

      ${wrapRelacionados}

      <section class="pdet-section">
        <div class="pdet-head">
          <span class="pdet-eyebrow">Consultas</span>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div class="pdet-faq">
          <details open>
            <summary>¿Tiene garantía?</summary>
            <p>${p.hasAppleWarranty ? "Sí, incluye la garantía oficial de Apple." : "Sí, los seminuevos incluyen garantía en tienda."}</p>
          </details>
          <details>
            <summary>¿Cómo funciona el Plan Canje?</summary>
            <p>Traé tu iPhone usado, estimamos su valor en el día y pagás solo la diferencia por un equipo nuevo o seminuevo.</p>
          </details>
          <details>
            <summary>¿Hacen envíos?</summary>
            <p>Sí, enviamos a todo el país con seguimiento y seguro. Coordinalo por WhatsApp.</p>
          </details>
        </div>
      </section>

      <section class="pdet-cta">
        <h2>¿Querés saber más de este equipo?</h2>
        <p>Escribinos y coordinamos tu compra, tu canje o una visita al local.</p>
        <div class="pdet-cta-actions">
          <a class="btn btn-dark" href="#" target="_blank" rel="noopener noreferrer" data-compra-wa>${ICONO_WA}Consultar por WhatsApp</a>
          <a class="btn btn-outline" href="productos">Ver más productos</a>
        </div>
      </section>
    </article>`;

  // Precio inicial
  pintarPrecio();

  // Enlace de compra compartido (dos ubicaciones)
  $$("[data-compra-wa]", cont).forEach((a) => todosLosWA.push(a));
  actualizarWA();

  // Swatches: cambia el color / imagen del hero (se mantiene la animación)
  $$("[data-color]", cont).forEach((btn) =>
    btn.addEventListener("click", () => aplicarColor(btn.getAttribute("data-color")))
  );

  // Miniaturas de la galería
  $$("[data-thumb]", cont).forEach((btn) =>
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-thumb");
      const img = $("[data-detalle-img]", cont);
      if (img) img.src = src;
      if (p.imageGallery) {
        const c = Object.keys(p.imageGallery).find((k) => p.imageGallery[k] === src);
        if (c) aplicarColor(c);
        else {
          $$("[data-thumb]", cont).forEach((b) => b.classList.toggle("active", b === btn));
        }
      }
    })
  );

  // Cards de color en el bloque "Elegí el tuyo"
  $$("[data-finish-color]", cont).forEach((btn) =>
    btn.addEventListener("click", () => aplicarColor(btn.getAttribute("data-finish-color")))
  );

  // Selector de almacenamiento: ajusta precio y mensaje
  const btnsStore = $$(".store-opt", cont);
  btnsStore.forEach((b) =>
    b.addEventListener("click", () => {
      btnsStore.forEach((s) => s.classList.toggle("active", s === b));
      delta = Number(b.getAttribute("data-store")) || 0;
      const sSel = (p.storageOptions || []).find((s) => String(s.price) === String(b.getAttribute("data-store")));
      if (sSel) {
        selStore.label = sSel.label;
        selStore.price = sSel.price;
      }
      pintarPrecio();
      actualizarWA();
    })
  );

  // Relacionados
  const relEl = $("[data-pdet-rel]", cont);
  if (relEl) renderLista(relEl, relacionadoList, "No hay productos relacionados.", true);

  // Refrescar precios cuando se actualiza la cotización del dólar
  document.addEventListener("precios:update", () => pintarPrecio());
}

/* ---------- Arranque ---------- */
function iniciar() {
  iniciarBuscador();

  const home = $("[data-contenido-ofertas]");
  if (home) pintarHome();

  if ($("[data-hero-rot]")) pintarHero();

  if ($("[data-resultados]")) pintarProductos();

  if ($("[data-detalle]")) pintarProducto();

  const canjeHome = $("[data-canje-home]");
  if (canjeHome) mountCanje(canjeHome, { variant: "home" });

  // link "Plan Canje" en el navbar: si estamos en Inicio, scroll suave
  // y marca la píldora activa en el link correspondiente (evita que
  // quede trabada en "Inicio" al navegar a la sección).
  const marcarPlanActivo = () => {
    $$(".nav-link, [data-nav-mobile] a").forEach((el) => {
      const esPlan = (el.getAttribute("href") || "").indexOf("plan-canje") !== -1;
      el.classList.toggle("active", esPlan);
    });
  };
  $$("[data-plan-link]").forEach((a) =>
    a.addEventListener("click", (e) => {
      if (a.getAttribute("href").indexOf("plan-canje") !== -1) {
        const sec = document.getElementById("plan-canje");
        if (sec) {
          e.preventDefault();
          marcarPlanActivo();
          sec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    })
  );
  if ((location.hash || "").indexOf("plan-canje") !== -1) marcarPlanActivo();

  if (!sessionStorage.getItem("dolar")) cargarDolar();
}

document.addEventListener("DOMContentLoaded", iniciar);