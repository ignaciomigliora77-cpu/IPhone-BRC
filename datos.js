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
  // Cotización respaldo (se intenta tomar la real en vivo desde bluelytics.com.ar)
  dollarRateOfficial: 1200,
  dollarRateBlue: 1300,
  dollarRateMargin: 20,
  sectionsOrder: ["sale", "refurbished", "tradein", "featured", "features"],
  categories: ["iPhones", "MacBook", "iPad", "AirPods", "iMac"],
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

const IMG = {
  iphones: "images/products/iphones",
  macbook: "images/products/macbook",
  ipad: "images/products/ipad",
  airpods: "images/products/airpods",
  imac: "images/products/imac"
};

// Productos. Precios en USD (lista oficial de Apple, salvo seminuevos).
//  isNew / condition "refurbished" / isOnSale controlan pestañas y badges.
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    image: IMG.macbook + "/macbook-air.png"
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
    image: IMG.macbook + "/macbook-air.png"
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
    image: IMG.macbook + "/macbook-pro-14.png"
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
    image: IMG.macbook + "/macbook-pro-14.png"
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
    }
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
    }
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
    image: IMG.airpods + "/airpods-pro-2.png"
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
    image: IMG.airpods + "/airpods-3.png"
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
    }
  },
  {
    id: 18,
    name: "iMac 24\"",
    description: "El todo en uno con chip M4, pantalla 4.5K Retina y 7 colores. Compacto, silencioso y rapidísimo.",
    price: 1299,
    category: "iMac",
    stock: 2,
    isNew: true,
    isFeatured: true,
    chip: "M4",
    colors: ["Blue", "Purple", "Pink", "Orange"],
    storageCapacity: "256GB",
    hasAppleWarranty: true,
    image: IMG.imac + "/imac.png"
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