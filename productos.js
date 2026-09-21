// ============================================================
//  CONFIGURACIÓN DEL NEGOCIO  (cambiá estos datos)
// ============================================================
const NEGOCIO = {
  whatsapp: "5492944000000",   // código país + área + número, sin + ni espacios
  instagram: "https://instagram.com/tu_usuario"
};

// ============================================================
//  PRODUCTOS  (para agregar uno, copiá un bloque y editalo)
//  categoria: "iPhone" | "Accesorios" | "Otros"
//  precio en USD. Poné stock: false para mostrarlo "Sin stock"
//  imagen: ruta a la foto, por ejemplo "img/iphone15.jpg" (opcional)
// ============================================================
const PRODUCTOS = [
  { nombre: "iPhone 15 Pro Max", detalle: "256 GB · Titanio natural", categoria: "iPhone", condicion: "Nuevo", precio: 1299, stock: true, imagen: "" },
  { nombre: "iPhone 15", detalle: "128 GB · Negro", categoria: "iPhone", condicion: "Nuevo", precio: 799, stock: true, imagen: "" },
  { nombre: "iPhone 14 Pro", detalle: "128 GB · Morado oscuro · Batería 91%", categoria: "iPhone", condicion: "Usado", precio: 699, stock: true, imagen: "" },
  { nombre: "iPhone 13", detalle: "128 GB · Medianoche · Batería 88%", categoria: "iPhone", condicion: "Usado", precio: 449, stock: false, imagen: "" },
  { nombre: "AirPods Pro (2.ª gen.)", detalle: "Con estuche MagSafe", categoria: "Accesorios", condicion: "Nuevo", precio: 229, stock: true, imagen: "" },
  { nombre: "Cargador 20W USB-C", detalle: "Original Apple", categoria: "Accesorios", condicion: "Nuevo", precio: 29, stock: true, imagen: "" },
  { nombre: "Funda de silicona MagSafe", detalle: "Varios colores", categoria: "Accesorios", condicion: "Nuevo", precio: 39, stock: true, imagen: "" },
  { nombre: "Apple Watch SE", detalle: "40 mm · GPS", categoria: "Otros", condicion: "Nuevo", precio: 249, stock: true, imagen: "" }
];