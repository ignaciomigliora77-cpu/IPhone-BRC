// ============================================================
//  DATOS DEL SITIO — Iphone Store BRC
//  Editá acá: datos de contacto, productos y tabla de canje.
//  Imágenes: renders oficiales de Apple (CDN) descargadas a
//  images/products/<categoria>/ ; por color en imageGallery.
//  Descripciones: copy real de la Apple Store en español.
// ============================================================

const CONFIG = {
  storeName: "Iphone Store BRC",
  storeDescription: "Tu iPhone en manos expertas. Productos originales con garantía oficial en San Carlos de Bariloche.",
  whatsappNumber: "542944662166",
  email: null,
  instagram: "https://www.instagram.com/iphone_store_brc/",
  address: {
    gallery: "Galería Paseo de la Catedral",
    local: "Local 11",
    floor: "2º piso",
    city: "San Carlos de Bariloche",
    mapsQuery: "Galería Paseo de la Catedral Bariloche"
  },
  // Cotización respaldo (se intenta tomar la real en vivo desde bluelytics.com.ar)
  dollarRateOfficial: 1200,
  dollarRateBlue: 1300,
  dollarRateMargin: 20,
  sectionsOrder: ["sale", "refurbished", "tradein", "featured", "features"],
  categories: ["iPhones", "MacBook", "iPad", "AirPods"],
  tradeIn: {
    enabled: true,
    capacities: ["64GB", "128GB", "256GB", "512GB"],
    batteryConditions: ["90+", "-90%"],
    models: [
      {
        name: "12",
        values: {
          "64GB":  { "90+": 170, "-90%": 160 },
          "128GB": { "90+": 180, "-90%": 170 },
          "256GB": { "90+": 200, "-90%": 180 },
          "512GB": { "90+": 220, "-90%": 200 }
        }
      },
      {
        name: "12 Pro",
        values: {
          "64GB":  { "90+": 190, "-90%": 170 },
          "128GB": { "90+": 210, "-90%": 190 },
          "256GB": { "90+": 230, "-90%": 210 },
          "512GB": { "90+": 250, "-90%": 230 }
        }
      },
      {
        name: "12 Pro Max",
        values: {
          "64GB":  { "90+": 220, "-90%": 200 },
          "128GB": { "90+": 240, "-90%": 220 },
          "256GB": { "90+": 260, "-90%": 240 },
          "512GB": { "90+": 280, "-90%": 260 }
        }
      }
    ]
  }
};

// Dirección legible para mostrar en footer, contacto y detalle.
function direccionCompleta() {
  const a = CONFIG.address;
  return a.gallery + " · " + a.local + " · " + a.floor;
}

function mapsUrl() {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.address.mapsQuery);
}

const IMG = {
  iphones: "images/products/iphones",
  macbook: "images/products/macbook",
  ipad: "images/products/ipad",
  airpods: "images/products/airpods"
};

// Specs por defecto por categoría: se usan como respaldo si un producto no trae ficha propia.
const SPECS_DEFAULT = {
  iPhones: {
    "Pantalla": "OLED Super Retina XDR con colores vibrantes",
    "Resolución": "Alta densidad de píxeles (460 ppp)",
    "Chip": "Apple Silicon",
    "Cámara": "Sistema de cámaras de 48 Mpx / 12 Mpx según modelo",
    "Video": "Hasta 4K Dolby Vision",
    "Batería": "Todo el día con carga única",
    "Carga": "MagSafe y USB-C (según modelo)",
    "Resistencia": "Ceramic Shield y resistencia al agua IP68",
    "Conectividad": "5G · Wi-Fi · Bluetooth · NFC",
    "Garantía": "Garantía oficial de Apple"
  },
  MacBook: {
    "Pantalla": "Liquid Retina",
    "Chip": "Apple Silicon",
    "Memoria": "RAM unificada",
    "Almacenamiento": "SSD ultrarrápido",
    "Batería": "Hasta 18 horas",
    "Puertos": "Thunderbolt / MagSafe",
    "Cámara": "FaceTime HD con Centro de Encuadre",
    "Otros": "Touch ID · teclado retroiluminado",
    "Garantía": "Garantía oficial de Apple"
  },
  iPad: {
    "Pantalla": "Liquid Retina",
    "Chip": "Apple Silicon",
    "Cámara": "Ultra Gran Angular frontal",
    "Audio": "Cuatro altavoces",
    "Conectividad": "Wi-Fi y celular (según modelo)",
    "Batería": "Hasta 10 horas",
    "Otros": "Compatible con Apple Pencil",
    "Garantía": "Garantía oficial de Apple"
  },
  AirPods: {
    "Sonido": "Audio de alta calidad",
    "Chip": "Apple",
    "Control": "Toques / corona digital",
    "Batería": "Hasta 6 horas de escucha",
    "Carga": "Estuche con carga rápida",
    "Resistencia": "Resistencia al agua y sudor",
    "Garantía": "Garantía oficial de Apple"
  }
};

// Productos. Precios en USD (lista oficial de Apple, salvo seminuevos).
//  isNew / condition "refurbished" / isOnSale controlan pestañas y badges.
//  highlights / specs / inTheBox / storageOptions alimentan la página de detalle completa.
const PRODUCTOS = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    description: "El Pro más Pro. Titanio grado aeroespacial, chip A18 Pro, cámara Fusion de 48 Mpx con zoom 5x y Apple Intelligence.",
    price: 999,
    category: "iPhones",
    stock: 4,
    isNew: true,
    isFeatured: true,
    chip: "A18 Pro",
    colors: ["Natural Titanium", "Desert Titanium", "White Titanium", "Black Titanium"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/16pro-naturaltitanium.png",
    imageGallery: {
      "Natural Titanium": IMG.iphones + "/16pro-naturaltitanium.png",
      "Desert Titanium": IMG.iphones + "/16pro-deserttitanium.png",
      "White Titanium": IMG.iphones + "/16pro-whitetitanium.png",
      "Black Titanium": IMG.iphones + "/16pro-blacktitanium.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 130 },
      { label: "512 GB", price: 280 },
      { label: "1 TB", price: 430 }
    ],
    highlights: [
      "Titanio grado aeroespacial: más liviano y tan fuerte como siempre.",
      "Cámara Fusion de 48 Mpx con zoom telefoto de 5 aumentos.",
      "Apple Intelligence integrada para escribir, resumir y crear.",
      "Pantalla ProMotion de 120 Hz con Always-On.",
      "Botón Control de Cámara para capturar al instante.",
      "USB-C con carga rápida y ecosistema MagSafe."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,3\" con ProMotion (120 Hz) y Always-On",
      "Resolución": "2.622 × 1.206 px · 460 ppp",
      "Chip": "A18 Pro con Neural Engine de 16 núcleos",
      "Memoria": "8 GB de RAM",
      "Cámara": "Fusion de 48 Mpx + Ultra Gran Angular + telefoto 5x",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 120 fps · Modo Cine · ProRes",
      "Batería": "Hasta 27 horas de reproducción de video",
      "Carga": "USB-C · MagSafe · Qi2 (carga rápida)",
      "Peso": "199 g",
      "Dimensiones": "149,6 × 71,5 × 8,25 mm",
      "Material": "Titanio grado aeroespacial · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6E · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 16 Pro",
      "Cable de carga USB-C (1 m)",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    description: "La mejor pantalla de iPhone (6,9\"), la mayor autonomía y el chip A18 Pro. Para los que lo quieren todo.",
    price: 1199,
    category: "iPhones",
    stock: 3,
    isNew: true,
    isFeatured: true,
    chip: "A18 Pro",
    colors: ["Natural Titanium", "Desert Titanium", "White Titanium", "Black Titanium"],
    storageCapacity: "256GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/16promax-naturaltitanium.png",
    imageGallery: {
      "Natural Titanium": IMG.iphones + "/16promax-naturaltitanium.png",
      "Desert Titanium": IMG.iphones + "/16promax-deserttitanium.png",
      "White Titanium": IMG.iphones + "/16promax-whitetitanium.png",
      "Black Titanium": IMG.iphones + "/16promax-blacktitanium.png"
    },
    storageOptions: [
      { label: "256 GB", price: 0 },
      { label: "512 GB", price: 150 },
      { label: "1 TB", price: 300 }
    ],
    highlights: [
      "La pantalla más grande en un iPhone: 6,9\" con ProMotion.",
      "Cámara Fusion de 48 Mpx con zoom telefoto de 5 aumentos.",
      "La mayor autonomía en un iPhone: hasta 33 horas de video.",
      "Titanio grado aeroespacial, el Pro más resistente.",
      "Apple Intelligence integrada en todo el sistema.",
      "Botón Control de Cámara y USB-C."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,9\" con ProMotion (120 Hz) y Always-On",
      "Resolución": "2.868 × 1.320 px · 460 ppp",
      "Chip": "A18 Pro con Neural Engine de 16 núcleos",
      "Memoria": "8 GB de RAM",
      "Cámara": "Fusion de 48 Mpx + Ultra Gran Angular + telefoto 5x",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 120 fps · Modo Cine · ProRes",
      "Batería": "Hasta 33 horas de reproducción de video",
      "Carga": "USB-C · MagSafe · Qi2 (carga rápida)",
      "Peso": "227 g",
      "Dimensiones": "163,0 × 77,6 × 8,25 mm",
      "Material": "Titanio grado aeroespacial · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6E · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 16 Pro Max",
      "Cable de carga USB-C (1 m)",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 3,
    name: "iPhone 16",
    description: "Rendimiento increíble, diseño duradero. Chip A18, Botón Acción y cámara Fusion de 48 Mpx.",
    price: 799,
    category: "iPhones",
    stock: 6,
    isNew: true,
    chip: "A18",
    colors: ["Ultramarine", "Teal", "Pink", "White", "Black"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/16-ultramarine.png",
    imageGallery: {
      "Ultramarine": IMG.iphones + "/16-ultramarine.png",
      "Teal": IMG.iphones + "/16-teal.png",
      "Pink": IMG.iphones + "/16-pink.png",
      "White": IMG.iphones + "/16-white.png",
      "Black": IMG.iphones + "/16-black.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 120 },
      { label: "512 GB", price: 270 }
    ],
    highlights: [
      "Chip A18 con rendimiento de última generación.",
      "Cámara Fusion de 48 Mpx con calidad profesional.",
      "Botón Acción configurable a un toque.",
      "USB-C universal con carga rápida.",
      "Batería para todo el día: hasta 22 horas de video.",
      "Ceramic Shield y resistencia al agua IP68."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\"",
      "Resolución": "2.556 × 1.179 px · 460 ppp",
      "Chip": "A18 con Neural Engine de 16 núcleos",
      "Memoria": "8 GB de RAM",
      "Cámara": "Fusion de 48 Mpx + Ultra Gran Angular",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps · Espacial",
      "Batería": "Hasta 22 horas de reproducción de video",
      "Carga": "USB-C · MagSafe · Qi2",
      "Peso": "170 g",
      "Dimensiones": "147,6 × 71,6 × 7,80 mm",
      "Material": "Aluminio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 7 · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 16",
      "Cable de carga USB-C (1 m)",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 4,
    name: "iPhone 15 Pro",
    description: "Titanio. Tan fuerte, tan ligero, tan Pro. Chip A17 Pro, cámara de 48 Mpx y Dynamic Island.",
    price: 899,
    originalPrice: 999,
    discountPercentage: 10,
    category: "iPhones",
    stock: 5,
    isNew: true,
    isOnSale: true,
    chip: "A17 Pro",
    colors: ["Natural Titanium", "Blue Titanium"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/15pro-naturaltitanium.png",
    imageGallery: {
      "Natural Titanium": IMG.iphones + "/15pro-naturaltitanium.png",
      "Blue Titanium": IMG.iphones + "/15pro-bluetitanium.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 130 },
      { label: "512 GB", price: 280 }
    ],
    highlights: [
      "Titanio grado aeroespacial con acabado cepillado.",
      "Chip A17 Pro para gaming y apps profesionales.",
      "Cámara de 48 Mpx con zoom óptico 3x.",
      "Dynamic Island y Always-On.",
      "USB-C 3.0 de altísima velocidad.",
      "Promoción: precio rebajado por tiempo limitado."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\" con ProMotion (120 Hz)",
      "Resolución": "2.556 × 1.179 px · 460 ppp",
      "Chip": "A17 Pro con GPU de 6 núcleos",
      "Memoria": "8 GB de RAM",
      "Cámara": "Principal de 48 Mpx + Ultra Gran Angular + telefoto 3x",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps · Modo Cine",
      "Batería": "Hasta 23 horas de reproducción de video",
      "Carga": "USB-C 3.0 · MagSafe · Qi",
      "Peso": "187 g",
      "Dimensiones": "146,6 × 70,6 × 8,25 mm",
      "Material": "Titanio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6E · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 15 Pro",
      "Cable de carga USB-C (1 m)",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 5,
    name: "iPhone 15",
    description: "Isla Dinámica, cámara de 48 Mpx con zoom óptico 2x y chip A16 Bionic. Color vivo con vidrio mate.",
    price: 699,
    originalPrice: 799,
    discountPercentage: 13,
    category: "iPhones",
    stock: 7,
    isNew: true,
    isOnSale: true,
    chip: "A16 Bionic",
    colors: ["Blue", "Pink", "Green", "Black"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/15-blue.png",
    imageGallery: {
      "Blue": IMG.iphones + "/15-blue.png",
      "Pink": IMG.iphones + "/15-pink.png",
      "Green": IMG.iphones + "/15-green.png",
      "Black": IMG.iphones + "/15-black.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 120 },
      { label: "512 GB", price: 270 }
    ],
    highlights: [
      "Dynamic Island en un iPhone clásico.",
      "Cámara de 48 Mpx con zoom óptico 2x.",
      "Chip A16 Bionic con rendimiento sobresaliente.",
      "Color vivo, en vidrio con acabado mate por dentro.",
      "USB-C universal.",
      "Promoción: precio rebajado por tiempo limitado."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\"",
      "Resolución": "2.556 × 1.179 px · 460 ppp",
      "Chip": "A16 Bionic",
      "Memoria": "6 GB de RAM",
      "Cámara": "Fusion de 48 Mpx + Ultra Gran Angular",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps · Modo Cine",
      "Batería": "Hasta 20 horas de reproducción de video",
      "Carga": "USB-C · MagSafe · Qi",
      "Peso": "171 g",
      "Dimensiones": "147,6 × 71,6 × 7,80 mm",
      "Material": "Aluminio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6 · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 15",
      "Cable de carga USB-C (1 m)",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 6,
    name: "iPhone 14",
    description: "Grande en el buen sentido. Chip A15 Bionic, 5G, cámaras de 12 Mpx y gran duración de batería.",
    price: 599,
    category: "iPhones",
    stock: 8,
    isNew: true,
    chip: "A15 Bionic",
    colors: ["Blue", "Midnight"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/14-blue.png",
    imageGallery: {
      "Blue": IMG.iphones + "/14-blue.png",
      "Midnight": IMG.iphones + "/14-midnight.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 100 }
    ],
    highlights: [
      "Chip A15 Bionic con gran rendimiento.",
      "Cámaras de 12 Mpx que rinden de día y de noche.",
      "Batería para todo el día.",
      "5G ultrarrápido.",
      "Detecta accidentes: sos de emergencia vía satélite.",
      "Ceramic Shield y resistencia al agua IP68."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\"",
      "Resolución": "2.532 × 1.170 px · 460 ppp",
      "Chip": "A15 Bionic",
      "Memoria": "6 GB de RAM",
      "Cámara": "Gran Angular de 12 Mpx + Ultra Gran Angular",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps · Modo Cine",
      "Batería": "Hasta 20 horas de reproducción de video",
      "Carga": "Lightning · MagSafe · Qi",
      "Peso": "172 g",
      "Dimensiones": "146,7 × 71,5 × 7,80 mm",
      "Material": "Aluminio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6 · Bluetooth 5.3 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 14",
      "Cable de carga USB-C a Lightning",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 7,
    name: "iPhone 13",
    description: "Un todo en uno confiable: chip A15 Bionic, cámaras de 12 Mpx y seis colores para elegir.",
    price: 499,
    originalPrice: 549,
    discountPercentage: 9,
    category: "iPhones",
    stock: 9,
    isNew: true,
    isOnSale: true,
    chip: "A15 Bionic",
    colors: ["Midnight", "Blue", "Pink", "Starlight", "Green", "Red"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/13-midnight.png",
    imageGallery: {
      "Midnight": IMG.iphones + "/13-midnight.png",
      "Blue": IMG.iphones + "/13-blue.png",
      "Pink": IMG.iphones + "/13-pink.png",
      "Starlight": IMG.iphones + "/13-starlight.png",
      "Green": IMG.iphones + "/13-green.png",
      "Red": IMG.iphones + "/13-red.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 100 }
    ],
    highlights: [
      "Chip A15 Bionic ultrarrápido.",
      "Cámaras de 12 Mpx con modo Noche.",
      "OLED Super Retina XDR superbrillante.",
      "Seis colores para elegir.",
      "Gran duración de batería.",
      "Promoción: precio rebajado por tiempo limitado."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\"",
      "Resolución": "2.532 × 1.170 px · 460 ppp",
      "Chip": "A15 Bionic",
      "Memoria": "4 GB de RAM",
      "Cámara": "Gran Angular de 12 Mpx + Ultra Gran Angular",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps · Modo Cine",
      "Batería": "Hasta 19 horas de reproducción de video",
      "Carga": "Lightning · MagSafe · Qi",
      "Peso": "174 g",
      "Dimensiones": "146,7 × 71,5 × 7,65 mm",
      "Material": "Aluminio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6 · Bluetooth 5.0 · NFC",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPhone 13",
      "Cable de carga USB-C a Lightning",
      "Documentación y calcomanías"
    ]
  },
  {
    id: 8,
    name: "iPhone 12",
    description: "Seminuevo revisado. Diseño con bordes planos, chip A14 Bionic y compatibilidad total.",
    price: 349,
    category: "iPhones",
    stock: 6,
    condition: "refurbished",
    chip: "A14 Bionic",
    colors: ["Black", "White", "Blue", "Purple"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.iphones + "/12-black.png",
    imageGallery: {
      "Black": IMG.iphones + "/12-black.png",
      "White": IMG.iphones + "/12-white.png",
      "Blue": IMG.iphones + "/12-blue.png",
      "Purple": IMG.iphones + "/12-purple.png"
    },
    storageOptions: [
      { label: "64 GB", price: 0 },
      { label: "128 GB", price: 30 }
    ],
    highlights: [
      "Revisado y certificado por nuestro taller.",
      "Diseño con bordes planos, al estilo actual.",
      "Chip A14 Bionic con gran fluidez.",
      "Compatibilidad total con apps y accesorios.",
      "Garantía incluida en la tienda.",
      "Oportunidad para entrar al ecosistema Apple."
    ],
    specs: {
      "Pantalla": "OLED Super Retina XDR de 6,1\"",
      "Resolución": "2.532 × 1.170 px · 460 ppp",
      "Chip": "A14 Bionic",
      "Memoria": "4 GB de RAM",
      "Cámara": "Doble de 12 Mpx (Gran Angular + Ultra Gran Angular)",
      "Cámara frontal": "TrueDepth de 12 Mpx con Face ID",
      "Video": "4K Dolby Vision hasta 60 fps",
      "Batería": "Hasta 17 horas de reproducción de video",
      "Carga": "Lightning · MagSafe · Qi",
      "Peso": "164 g",
      "Dimensiones": "146,7 × 71,5 × 7,40 mm",
      "Material": "Aluminio · Ceramic Shield · IP68",
      "Conectividad": "5G · Wi-Fi 6 · Bluetooth 5.0 · NFC",
      "Garantía": "Garantía en tienda (seminuevo certificado)"
    },
    inTheBox: [
      "iPhone 12 seminuevo (certificado)",
      "Cable de carga USB-C a Lightning",
      "Documentación"
    ]
  },
  {
    id: 9,
    name: "MacBook Air 13\" (M5)",
    description: "MacBook Air. Listo para despegar. Chip M5, 18 horas de batería y diseño ultrasilencioso sin ventilador.",
    price: 999,
    category: "MacBook",
    stock: 4,
    isNew: true,
    chip: "M5",
    colors: ["Midnight", "Sky Blue", "Starlight", "Silver"],
    storageCapacity: "512GB",
    hasAppleWarranty: true,
    image: IMG.macbook + "/macbook-air.png",
    storageOptions: [
      { label: "512 GB", price: 0 },
      { label: "1 TB", price: 250 }
    ],
    highlights: [
      "Chip M5 con Neural Engine acelerado.",
      "Hasta 18 horas de batería en una carga.",
      "Sin ventilador: mantené la calma y la compostura.",
      "Cámara 12 Mpx FaceTime HD con Centro de Encuadre.",
      "Desbloqueo instantáneo con Touch ID.",
      "MagSafe 3 y dos puertos Thunderbolt 4."
    ],
    specs: {
      "Pantalla": "Liquid Retina de 13,6\" (LED con True Tone)",
      "Resolución": "2.560 × 1.664 · 224 ppp · P3",
      "Chip": "Apple M5 con Neural Engine",
      "Memoria": "16 GB de RAM unificada",
      "Almacenamiento": "512 GB SSD (ampliable)",
      "Batería": "Hasta 18 horas de video · carga rápida con MagSafe 3",
      "Peso": "1,24 kg",
      "Dimensiones": "30,41 × 21,24 × 1,13 cm",
      "Puertos": "MagSafe 3 · 2 × Thunderbolt 4 · jack 3,5 mm",
      "Cámara": "12 Mpx FaceTime HD con Centro de Encuadre",
      "Otros": "Touch ID · teclado retroiluminado · sin ventilador",
      "Colores": "Midnight, Sky Blue, Starlight y Silver",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "MacBook Air",
      "Cable de carga MagSafe (2 m)",
      "Adaptador de corriente USB-C de 35 W"
    ]
  },
  {
    id: 10,
    name: "MacBook Air 15\" (M5)",
    description: "Más pantalla, mismo peso pluma. Chip M5, Liquid Retina de 15,3\" y hasta 18 horas de batería.",
    price: 1199,
    category: "MacBook",
    stock: 3,
    isNew: true,
    chip: "M5",
    colors: ["Midnight", "Sky Blue", "Starlight", "Silver"],
    storageCapacity: "512GB",
    hasAppleWarranty: true,
    image: IMG.macbook + "/macbook-air.png",
    storageOptions: [
      { label: "512 GB", price: 0 },
      { label: "1 TB", price: 250 }
    ],
    highlights: [
      "Pantalla Liquid Retina de 15,3\".",
      "Chip M5 con Neural Engine acelerado.",
      "Mismo peso pluma, más espacio para trabajar.",
      "Hasta 18 horas de batería en una carga.",
      "Cámara 12 Mpx FaceTime HD con Centro de Encuadre.",
      "MagSafe 3 y dos puertos Thunderbolt 4."
    ],
    specs: {
      "Pantalla": "Liquid Retina de 15,3\" (LED con True Tone)",
      "Resolución": "2.880 × 1.864 · 224 ppp · P3",
      "Chip": "Apple M5 con Neural Engine",
      "Memoria": "16 GB de RAM unificada",
      "Almacenamiento": "512 GB SSD (ampliable)",
      "Batería": "Hasta 18 horas de video · carga rápida con MagSafe 3",
      "Peso": "1,51 kg",
      "Dimensiones": "34,04 × 23,76 × 1,15 cm",
      "Puertos": "MagSafe 3 · 2 × Thunderbolt 4 · jack 3,5 mm",
      "Cámara": "12 Mpx FaceTime HD con Centro de Encuadre",
      "Otros": "Touch ID · teclado retroiluminado · sin ventilador",
      "Colores": "Midnight, Sky Blue, Starlight y Silver",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "MacBook Air",
      "Cable de carga MagSafe (2 m)",
      "Adaptador de corriente USB-C de 35 W"
    ]
  },
  {
    id: 11,
    name: "MacBook Pro 14\" (M5 Pro)",
    description: "La velocidad viene de familia. Chip M5 Pro, pantalla Liquid Retina XDR y hasta 22 horas de batería.",
    price: 1599,
    category: "MacBook",
    stock: 2,
    isNew: true,
    isFeatured: true,
    chip: "M5 Pro",
    colors: ["Space Black", "Silver"],
    storageCapacity: "1TB",
    hasAppleWarranty: true,
    image: IMG.macbook + "/macbook-pro-14.png",
    storageOptions: [
      { label: "1 TB", price: 0 },
      { label: "2 TB", price: 500 },
      { label: "4 TB", price: 1200 }
    ],
    highlights: [
      "Chip M5 Pro para workflows profesionales sin freno.",
      "Pantalla Liquid Retina XDR con ProMotion de 120 Hz.",
      "Puertos Thunderbolt 5 de altísima velocidad.",
      "Hasta 22 horas de batería en una carga.",
      "Cámara 12 Mpx FaceTime HD con Centro de Encuadre.",
      "Diseño Space Black resistente a huellas."
    ],
    specs: {
      "Pantalla": "Liquid Retina XDR de 14,2\" (mini-LED · ProMotion 120 Hz)",
      "Resolución": "3.024 × 1.964 · 254 ppp · 1.000 nits (1.600 en HDR)",
      "Chip": "Apple M5 Pro",
      "Memoria": "24 GB de RAM unificada",
      "Almacenamiento": "1 TB SSD (ampliable)",
      "Batería": "Hasta 22 horas de video",
      "Peso": "1,55 kg",
      "Dimensiones": "31,26 × 22,12 × 1,55 cm",
      "Puertos": "3 × Thunderbolt 5 · HDMI · SDXC · MagSafe 3 · jack",
      "Cámara": "12 Mpx FaceTime HD con Centro de Encuadre",
      "Audio": "6 altavoces con Audio espacial y Dolby Atmos",
      "Otros": "Touch ID · teclado retroiluminado",
      "Colores": "Space Black y Silver",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "MacBook Pro",
      "Cable de carga MagSafe (2 m)",
      "Adaptador de corriente USB-C de 70 W"
    ]
  },
  {
    id: 12,
    name: "MacBook Pro 16\" (M5 Pro)",
    description: "Potencia que no conoce límites. Chip M5 Pro, Liquid Retina XDR de 16,2\" y puertos Thunderbolt 5.",
    price: 2499,
    category: "MacBook",
    stock: 1,
    isNew: true,
    chip: "M5 Pro",
    colors: ["Space Black", "Silver"],
    storageCapacity: "1TB",
    hasAppleWarranty: true,
    image: IMG.macbook + "/macbook-pro-14.png",
    storageOptions: [
      { label: "1 TB", price: 0 },
      { label: "2 TB", price: 500 },
      { label: "4 TB", price: 1200 }
    ],
    highlights: [
      "El portátil más potente del lineup MacBook Pro.",
      "Pantalla Liquid Retina XDR de 16,2\".",
      "Puertos Thunderbolt 5 de altísima velocidad.",
      "Hasta 24 horas de batería en una carga.",
      "Audio profesional con 6 altavoces.",
      "Diseño Space Black resistente a huellas."
    ],
    specs: {
      "Pantalla": "Liquid Retina XDR de 16,2\" (mini-LED · ProMotion 120 Hz)",
      "Resolución": "3.456 × 2.234 · 254 ppp · 1.000 nits (1.600 en HDR)",
      "Chip": "Apple M5 Pro",
      "Memoria": "24 GB de RAM unificada",
      "Almacenamiento": "1 TB SSD (ampliable)",
      "Batería": "Hasta 24 horas de video",
      "Peso": "2,14 kg",
      "Dimensiones": "35,57 × 24,81 × 1,68 cm",
      "Puertos": "3 × Thunderbolt 5 · HDMI · SDXC · MagSafe 3 · jack",
      "Cámara": "12 Mpx FaceTime HD con Centro de Encuadre",
      "Audio": "6 altavoces con Audio espacial y Dolby Atmos",
      "Otros": "Touch ID · teclado retroiluminado",
      "Colores": "Space Black y Silver",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "MacBook Pro",
      "Cable de carga MagSafe (2 m)",
      "Adaptador de corriente USB-C de 96 W"
    ]
  },
  {
    id: 13,
    name: "iPad Air 11\"",
    description: "Chip M4, compatible con Apple Pencil Pro y con el diseño ultraliviano. Para crear donde sea.",
    price: 599,
    category: "iPad",
    stock: 4,
    isNew: true,
    isFeatured: true,
    chip: "M4",
    colors: ["Blue", "Purple", "Starlight", "Space Gray"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.ipad + "/ipadair-blue.png",
    imageGallery: {
      "Blue": IMG.ipad + "/ipadair-blue.png",
      "Purple": IMG.ipad + "/ipadair-purple.png",
      "Starlight": IMG.ipad + "/ipadair-starlight.png",
      "Space Gray": IMG.ipad + "/ipadair-spacegray.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 120 },
      { label: "512 GB", price: 260 }
    ],
    highlights: [
      "Chip M4 con potencia de clase computación.",
      "Compatible con Apple Pencil Pro.",
      "Diseño ultraliviano (462 g).",
      "Cámara frontal Ultra Gran Angular en horizontal.",
      "Touch ID en el botón superior.",
      "Batería de hasta 10 horas."
    ],
    specs: {
      "Pantalla": "Liquid Retina de 11\" (LED con True Tone)",
      "Resolución": "2.360 × 1.640 · 264 ppp",
      "Chip": "Apple M4",
      "Memoria": "8 GB de RAM",
      "Almacenamiento": "128 GB (ampliable)",
      "Cámara": "Principal 12 Mpx · frontal Ultra Gran Angular 12 Mpx",
      "Batería": "Hasta 10 horas",
      "Peso": "462 g",
      "Dimensiones": "24,76 × 17,79 × 0,61 cm",
      "Accesorios": "Apple Pencil Pro · Magic Keyboard",
      "Otros": "Touch ID · USB-C · audio con 2 altavoces",
      "Colores": "Blue, Purple, Starlight y Space Gray",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPad Air",
      "Cable USB-C (1 m)",
      "Adaptador de 20 W"
    ]
  },
  {
    id: 14,
    name: "iPad Pro 11\"",
    description: "El iPad más delgado de Apple. Chip M4 y pantalla Ultra Retina XDR en tándem.",
    price: 999,
    category: "iPad",
    stock: 2,
    isNew: true,
    isFeatured: true,
    chip: "M4",
    colors: ["Space Black", "Silver"],
    storageCapacity: "128GB",
    hasAppleWarranty: true,
    image: IMG.ipad + "/ipadpro-spaceblack.png",
    imageGallery: {
      "Space Black": IMG.ipad + "/ipadpro-spaceblack.png",
      "Silver": IMG.ipad + "/ipadpro-silver.png"
    },
    storageOptions: [
      { label: "128 GB", price: 0 },
      { label: "256 GB", price: 150 },
      { label: "512 GB", price: 350 }
    ],
    highlights: [
      "El iPad más delgado de Apple (5,3 mm).",
      "Pantalla Ultra Retina XDR con OLED en tándem.",
      "Chip M4 con rendimiento descomunal.",
      "Compatible con Apple Pencil Pro.",
      "Face ID en cualquier orientación.",
      "Batería de hasta 10 horas."
    ],
    specs: {
      "Pantalla": "Ultra Retina XDR de 11\" (OLED en tándem · ProMotion 120 Hz)",
      "Resolución": "2.420 × 1.668 · 264 ppp",
      "Chip": "Apple M4",
      "Memoria": "8 GB de RAM",
      "Almacenamiento": "128 GB (ampliable)",
      "Cámara": "Principal 12 Mpx · frontal Ultra Gran Angular con Face ID",
      "Batería": "Hasta 10 horas",
      "Peso": "444 g",
      "Dimensiones": "24,97 × 17,81 × 0,53 cm",
      "Accesorios": "Apple Pencil Pro · Magic Keyboard",
      "Otros": "4 altavoces · LiDAR · USB-C Thunderbolt",
      "Colores": "Space Black y Silver",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "iPad Pro",
      "Cable USB-C (1 m)",
      "Adaptador de 20 W"
    ]
  },
  {
    id: 15,
    name: "AirPods Pro 2",
    description: "Cancelación activa de ruido 2x más potente, audio adaptativo y control táctil.",
    price: 249,
    originalPrice: 279,
    discountPercentage: 11,
    category: "AirPods",
    stock: 12,
    isNew: true,
    isOnSale: true,
    colors: ["White"],
    hasAppleWarranty: true,
    image: IMG.airpods + "/airpods-pro-2.png",
    highlights: [
      "Cancelación activa de ruido 2x más potente.",
      "Audio adaptable: se ajusta al entorno solo.",
      "Chip H2 con sonido premium.",
      "Resistencia al agua y al sudor (IP54).",
      "Carga con USB-C y MagSafe.",
      "Hasta 6 horas de escucha (30 con el estuche)."
    ],
    specs: {
      "Sonido": "Canc. activa de ruido · Modo Transparencia · Audio adaptable",
      "Audio espacial": "Con seguimiento dinámico de cabeza",
      "Chip": "Apple H2",
      "Resistencia": "IP54 (audífonos y estuche)",
      "Batería": "Hasta 6 h de escucha · 30 h con el estuche",
      "Carga": "USB-C · MagSafe · Qi",
      "Controles": "Táctiles con control de volumen",
      "Micrófonos": "Doble micrófono con aislamiento de voz",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "AirPods Pro 2",
      "Estuche de carga con USB-C",
      "Puntas de silicona (4 tamaños)",
      "Cable USB-C"
    ]
  },
  {
    id: 16,
    name: "AirPods 3",
    description: "Audio espacial con seguimiento de cabeza, resistentes al agua y muy cómodos.",
    price: 179,
    category: "AirPods",
    stock: 10,
    isNew: true,
    colors: ["White"],
    hasAppleWarranty: true,
    image: IMG.airpods + "/airpods-3.png",
    highlights: [
      "Audio espacial con seguimiento dinámico de cabeza.",
      "Diseño ergonómico para uso prolongado.",
      "Resistentes al agua y al sudor (IPX4).",
      "Cambio de audio automático entre dispositivos.",
      "Carga rápida en el estuche MagSafe.",
      "Hasta 6 horas de escucha (30 con el estuche)."
    ],
    specs: {
      "Sonido": "Audio espacial con seguimiento de cabeza",
      "Chip": "Apple H1",
      "Resistencia": "IPX4 (agua y sudor)",
      "Batería": "Hasta 6 h de escucha · 30 h con el estuche",
      "Carga": "MagSafe · Qi · Lightning",
      "Micrófonos": "Micrófonos con aislamiento de voz",
      "Controles": "Sensores de fuerza en el vástago",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "AirPods 3",
      "Estuche de carga MagSafe",
      "Cable Lightning"
    ]
  },
  {
    id: 17,
    name: "AirPods Max",
    description: "Sonido de alta fidelidad con cancelación activa de ruido y corona digital. Diseño de lujo.",
    price: 549,
    originalPrice: 599,
    discountPercentage: 8,
    category: "AirPods",
    stock: 4,
    isNew: true,
    isOnSale: true,
    colors: ["Midnight", "Blue", "Purple", "Orange", "Starlight"],
    hasAppleWarranty: true,
    image: IMG.airpods + "/max-midnight.png",
    imageGallery: {
      "Midnight": IMG.airpods + "/max-midnight.png",
      "Blue": IMG.airpods + "/max-blue.png",
      "Purple": IMG.airpods + "/max-purple.png",
      "Orange": IMG.airpods + "/max-orange.png",
      "Starlight": IMG.airpods + "/max-starlight.png"
    },
    highlights: [
      "Sonido de alta fidelidad con drivers de 40 mm.",
      "Cancelación activa de ruido + Modo Transparencia.",
      "Audio espacial con seguimiento dinámico de cabeza.",
      "Corona Digital para un control preciso.",
      "Batería de hasta 20 horas.",
      "Diseño de lujo en cinco colores."
    ],
    specs: {
      "Sonido": "Alta fidelidad con drivers de 40 mm",
      "Cancelación": "Activa de ruido · Modo Transparencia",
      "Audio espacial": "Con seguimiento dinámico de cabeza",
      "Chip": "Apple H1",
      "Batería": "Hasta 20 horas con una carga",
      "Carga": "USB-C + Smart Case (sleep)",
      "Control": "Corona Digital · botón de ruido",
      "Conectividad": "Bluetooth 5.0 · audio por cable (opcional)",
      "Colores": "Midnight, Blue, Purple, Orange y Starlight",
      "Garantía": "Garantía oficial de Apple"
    },
    inTheBox: [
      "AirPods Max",
      "Smart Case",
      "Cable de carga USB-C"
    ]
  }
];

// Helpers de condición / mensajes
function condicionProducto(p) {
  if (p.condition === "new") return "Nuevo";
  if (p.condition === "refurbished" || p.condition === "used") return "Semi nuevo";
  return p.isNew ? "Nuevo" : "Semi nuevo";
}

function mensajeConsulta(p) {
  return "Hola, estoy interesado en el " + p.name + " (" + condicionProducto(p) + ") que vi en " + CONFIG.storeName + ". ¿Me podrías dar más información?";
}