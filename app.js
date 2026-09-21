/* ============================================================
 *  Iphone Store BRC — lógica compartida
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
const productoPorId = (id) =>
  PRODUCTOS.find((p) => String(p.id) === String(id)) ||
  PRODUCTOS.find((p) => limpiaId(p.name) === limpiaId(id)) ||
  PRODUCTOS.find((p) => limpiaId(p.name).includes(limpiaId(id))) ||
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
          <a class="btn btn-outline" href="producto.html?id=${p.id}"><span class="det-txt">Ver detalles</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ic"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
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
        <a class="btn btn-outline vacio-cta" href="productos.html">Ver todo el catálogo</a>
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
            <a class="sr-item" href="producto.html?id=${p.id}">
              <img src="${p.image}" alt="" width="32" height="32">
              <div><p class="sr-name">${p.name}</p><p class="sr-cat">${p.category}</p></div>
            </a>`
          )
          .join("") +
        `<div class="sr-more"><button type="button" data-sr-todo>Ver todos los resultados para "${q}"</button></div>`;
      res.classList.add("open");
      $("[data-sr-todo]", res).addEventListener("click", () => {
        location.href = "productos.html?search=" + encodeURIComponent(q);
      });
    }

    input.addEventListener("input", (e) => pintar(e.target.value.trim().toLowerCase()));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = input.value.trim();
        if (q) location.href = "productos.html?search=" + encodeURIComponent(q);
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
          Plan Canje BRC
        </div>
        <span class="tic2-badge">Estimación inmediata</span>
      </div>
      <p class="tic2-title">${variante === "product" && producto
        ? "Calculá cuánto pagás por " + producto.name
        : "Tomamos tu Apple usado y te ayudamos a renovar"}</p>
      <p class="tic2-desc">Completá los tres campos y te mostramos el valor de tu equipo al instante.</p>

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
          <select data-t-bat></select>
        </label>
      </div>

      <div class="tic2-result">
        <div class="tic2-val">
          <span class="tic2-let">Valor de tu equipo</span>
          <strong class="tic2-monto" data-t-valor>Sin cotización</strong>
          <span class="tic2-ars" data-t-ars></span>
        </div>
        ${variante === "product" && producto ? `
        <div class="tic2-val tic2-val-pagas">
          <span class="tic2-let">Solo pagás la diferencia</span>
          <strong class="tic2-monto" data-t-pagas>Seleccioná un usado</strong>
          <span class="tic2-ars" data-t-pagas-ars></span>
        </div>` : ""}
      </div>

      <details class="tic2-det">
        <summary>Ver detalle del cálculo</summary>
        <dl>
          <div><dt>Modelo</dt><dd data-t-d-modelo>—</dd></div>
          <div><dt>Capacidad</dt><dd data-t-d-cap>—</dd></div>
          <div><dt>Batería</dt><dd data-t-d-bat>—</dd></div>
        </dl>
      </details>

      <a class="btn btn-dark btn-full" href="#" target="_blank" rel="noopener noreferrer" data-t-wa>Quiero entregar mi usado</a>
    </div>`;

  const modelo = $(`[data-t-modelo]`, contenedor);
  const cap = $(`[data-t-cap]`, contenedor);
  const bat = $(`[data-t-bat]`, contenedor);
  const wa = $(`[data-t-wa]`, contenedor);
  const tVal = $(`[data-t-valor]`, contenedor);
  const tArs = $(`[data-t-ars]`, contenedor);
  const tPag = $(`[data-t-pagas]`, contenedor);
  const tPagArs = $(`[data-t-pagas-ars]`, contenedor);
  const dModelo = $(`[data-t-d-modelo]`, contenedor);
  const dCap = $(`[data-t-d-cap]`, contenedor);
  const dBat = $(`[data-t-d-bat]`, contenedor);

  const setOpciones = (sel, valores) => {
    sel.innerHTML = valores
      .map((v) => `<option value="${v}">${v}</option>`)
      .join("");
  };

  const opcionesModelo = [...new Set(CONFIG.tradeIn.models.map((m) => m.name))];
  setOpciones(modelo, opcionesModelo);
  setOpciones(cap, CONFIG.tradeIn.capacities);
  setOpciones(bat, CONFIG.tradeIn.batteryConditions);

  function pintar() {
    const m = modelo.value, c = cap.value, b = bat.value;
    dModelo.textContent = m || "—";
    dCap.textContent = c || "—";
    dBat.textContent = b || "—";

    const y = valorCanje(m, c, b);
    const usdOk = y !== null;
    const ars = usdOk ? PRECIOS.ars(y) : null;

    tVal.textContent = usdOk ? "US$ " + y : "Sin cotización";
    tArs.innerHTML = ars !== null
      ? PRECIOS.fmtARS(ars) + " ARS"
      : "";

    let mensaje;
    if (producto) {
      const monto = usdOk ? Math.max(producto.price - y, 0) : null;
      const montoArs = usdOk ? Math.max(PRECIOS.ars(producto.price) - ars, 0) : null;
      tPag.textContent = monto !== null ? "US$ " + monto : "Seleccioná un usado";
      tPagArs.textContent = montoArs !== null ? PRECIOS.fmtARS(montoArs) + " ARS" : "";

      mensaje =
        "Hola, quiero realizar el plan canje.\n\n" +
        "Producto consultado: " + producto.name + " (" + condicionProducto(producto) + ")\n" +
        "Equipo que entrego: " + (m || "—") + " " + (c || "—") + " (Batería " + (b || "—") + ")\n" +
        "Valor estimado de mi usado: " + (usdOk ? "US$ " + y : "Sin cotización") +
          " (" + (ars !== null ? PRECIOS.fmtARS(ars) + " ARS" : "Sin cotización") + ")\n" +
        "Monto final a pagar: " + (monto !== null ? "US$ " + monto : "A definir") +
          " (" + (montoArs !== null ? PRECIOS.fmtARS(montoArs) + " ARS" : "A definir") + ")";
    } else {
      mensaje =
        "Hola, quiero coordinar una evaluación para plan canje.\n\n" +
        "Equipo que entrego: " + (m || "—") + " " + (c || "—") + " (Batería " + (b || "—") + ")\n" +
        "Valor estimado de mi usado: " + (usdOk ? "US$ " + y : "Sin cotización") +
          " (" + (ars !== null ? PRECIOS.fmtARS(ars) + " ARS" : "Sin cotización") + ")";
    }
    wa.href = linkWA(mensaje);
  }

  [modelo, cap, bat].forEach((s) => s.addEventListener("change", pintar));
  document.addEventListener("precios:update", pintar);
  pintar();
}

/* ---------- Home ---------- */
function pintarHome() {
  const fr = (sel) => $(sel);
  const featured = PRODUCTOS.filter((p) => p.isFeatured);
  const onSale = PRODUCTOS.filter((p) => p.isOnSale);
  const refurb = PRODUCTOS.filter((p) => p.condition === "refurbished");

  renderLista(fr("[data-contenido-ofertas]"), onSale,
    "No hay productos en oferta actualmente.");
  renderLista(fr("[data-contenido-seminuevos]"), refurb.slice(0, 4),
    'Agregá productos con condición "seminuevo".');
  renderLista(fr("[data-contenido-destacados]"), featured,
    "Marca productos como destacados.");

  document.addEventListener("precios:update", () => {
    renderLista(fr("[data-contenido-ofertas]"), onSale,
      "No hay productos en oferta actualmente.");
    renderLista(fr("[data-contenido-seminuevos]"), refurb.slice(0, 4),
      'Agregá productos con condición "seminuevo".');
    renderLista(fr("[data-contenido-destacados]"), featured,
      "Marca productos como destacados.");
  });
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
      if (tab === "seminuevos") porTab = p.condition === "refurbished";
      return porBusqueda && porCat && porPrecio && porTab;
    });
    lista.sort((a, b) => b.price - a.price);
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
    $$(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("activo", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
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
      : "No se encontraron productos.";
    renderLista(cont, lista, texto, animarTab);
    pintarContador(lista);
  }

  function setCat(v) { cat = cat === v ? null : v; redibujar(); }
  function setPrecio(v) { precio = precio === v ? null : v; redibujar(); }

  // tabs (la lista entra con animación solo al cambiar de pestaña)
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    tab = t.dataset.tab;
    if (tab === "seminuevos" || tab === "ofertas" || tab === "nuevos" || tab === "todos") redibujar(true);
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
  document.addEventListener("precios:update", () => renderLista(cont, filtrar(), "No se encontraron productos."));
}

/* ---------- Detalle de producto ---------- */
function pintarProducto() {
  const id = new URLSearchParams(location.search).get("id");
  const p = productoPorId(id);
  const cont = $("[data-detalle]");
  if (!p || !cont) {
    if (cont) cont.innerHTML = `<div class="vacio"><p>Producto no encontrado.</p><p class="vacio-sub">Volvé a <a class="link" href="productos.html">Productos</a>.</p></div>`;
    return;
  }
  const { actual, orig } = precioPara(p);
  const wha = linkWA(mensajeConsulta(p));
  document.title = p.name + " | " + CONFIG.storeName;

  cont.innerHTML = `
    <div class="detalle-grid">
      <div class="detalle-media">
        <img src="${p.image}" alt="${p.name}" data-detalle-img>
      </div>
      <div class="detalle-info">
        <span class="pc-cat">${p.category}</span>
        <h1>${p.name}</h1>
        <p class="detalle-desc">${p.description}</p>
        <div class="detalle-pre">
          ${orig !== null ? '<p class="pc-orig">' + PRECIOS.fmtARS(orig) + "</p>" : ""}
          <p class="pc-ars detalle-ars${p.isOnSale ? " oferta" : ""}">${PRECIOS.fmtARS(actual)}</p>
          <p class="pc-usd">USD ${p.price}</p>
        </div>
        ${p.colors && p.colors.length ? `
        <div class="detalle-colores">
          <span class="detalle-colores-label">Colores</span>
          <div class="color-swatches" role="group" aria-label="Colores disponibles" data-swatches>
            ${p.colors.map((c, i) => `
              <button type="button" class="swatch${i === 0 ? " active" : ""}" style="--sw:${COLOR_SWATCHES[c] || "#999"}" aria-label="${c}" aria-pressed="${i === 0 ? "true" : "false"}" data-color="${c}" title="${c}"></button>`).join("")}
          </div>
        </div>` : ""}
        <ul class="detalle-specs">
          <li><span>Estado</span><strong>${condicionProducto(p)}</strong></li>
          ${p.chip ? `<li><span>Chip</span><strong>${p.chip}</strong></li>` : ""}
          ${p.storageCapacity ? `<li><span>Almacenamiento</span><strong>${p.storageCapacity}</strong></li>` : ""}
          ${p.stock != null ? `<li><span>Stock</span><strong>${p.stock}</strong></li>` : ""}
          ${p.hasAppleWarranty ? `<li><span>Garantía</span><strong>Garantía oficial de Apple</strong></li>` : ""}
        </ul>
        <div class="detalle-acc">
          <a class="btn btn-dark" href="${wha}" target="_blank" rel="noopener noreferrer">${ICONO_WA}Consultar</a>
          <a class="btn btn-outline" href="productos.html">Ver todos los productos</a>
        </div>
      </div>
    </div>`;

  // selector de tonos: cambia la imagen real del detalle
  const swatches = $("[data-swatches]", cont);
  const detImg = $("[data-detalle-img]", cont);
  if (swatches && detImg) {
    const btns = $$("[data-color]", swatches);
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        btns.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        const c = btn.dataset.color;
        if (p.imageGallery && p.imageGallery[c]) detImg.src = p.imageGallery[c];
      })
    );
  }

  mountCanje($("[data-canje-product]"), { variant: "product", product: p });
  document.addEventListener("precios:update", () => {
    pricingInDetalle(p);
  });
}

function pricingInDetalle(p) {
  const { actual, orig } = precioPara(p);
  const cont = $("[data-detalle]");
  if (!cont) return;
  const pre = $(".detalle-pre", cont);
  if (pre) {
    pre.innerHTML =
      (orig !== null ? '<p class="pc-orig">' + PRECIOS.fmtARS(orig) + "</p>" : "") +
      '<p class="pc-ars detalle-ars' + (p.isOnSale ? " oferta" : "") + '">' + PRECIOS.fmtARS(actual) + "</p>" +
      '<p class="pc-usd">USD ' + p.price + "</p>";
  }
}

/* ---------- Arranque ---------- */
function iniciar() {
  iniciarBuscador();

  const home = $("[data-contenido-ofertas]");
  if (home) pintarHome();

  if ($("[data-resultados]")) pintarProductos();

  if ($("[data-detalle]")) pintarProducto();

  const canjeHome = $("[data-canje-home]");
  if (canjeHome) mountCanje(canjeHome, { variant: "home" });

  // link "Plan Canje" en el navbar: si estamos en Inicio, scroll suave
  $$("[data-plan-link]").forEach((a) =>
    a.addEventListener("click", (e) => {
      if (a.getAttribute("href").indexOf("index.html") !== -1 || a.getAttribute("href").indexOf("#plan-canje") === 0) {
        const sec = document.getElementById("plan-canje");
        if (sec) { e.preventDefault(); sec.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    })
  );

  if (!sessionStorage.getItem("dolar")) cargarDolar();
}

document.addEventListener("DOMContentLoaded", iniciar);