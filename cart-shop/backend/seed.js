import "dotenv/config"
import mongoose from "mongoose";
import Product from "./models/product.model.js"; // Adjust the path to your Product model

// Sample seller IDs - Replace these with actual ObjectIds from your RegisteredUser collection
// You can get these by querying your database or creating sample users first
export const SAMPLE_SELLER_IDS = [
  "507f1f77bcf86cd799439011",
  "507f1f77bcf86cd799439012",
  "507f1f77bcf86cd799439013",
];

export const sampleProducts = [
  {
    name: "samsung galaxy s23 ultra",
    productCode: "SMSG-S23U-001",
    thumbnail:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    ],
    price: 89999,
    mrp: 124999,
    brand: "samsung",
    category: "smartphones",
    stock: 25,
    description:
      "Premium flagship smartphone with 200MP camera, S Pen support, and powerful performance.",
    features: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      camera: "200MP + 12MP + 10MP + 10MP",
      battery: "5000mAh",
      os: "Android 13",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[0]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: 'apple macbook pro 14"',
    productCode: "APPL-MBP14-001",
    thumbnail:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    ],
    price: 169900,
    mrp: 199900,
    brand: "apple",
    category: "laptops",
    stock: 15,
    description:
      "Powerful laptop with M3 Pro chip, stunning Liquid Retina XDR display, and exceptional battery life.",
    features: {
      processor: "Apple M3 Pro",
      display: '14.2" Liquid Retina XDR',
      ram: "18GB",
      storage: "512GB SSD",
      graphics: "Integrated GPU",
      battery: "Up to 18 hours",
      ports: "3x Thunderbolt 4, HDMI, SD card",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[1]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "sony wh-1000xm5 wireless headphones",
    productCode: "SONY-WH1000XM5-001",
    thumbnail:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    ],
    price: 24990,
    mrp: 29990,
    brand: "sony",
    category: "audio",
    stock: 50,
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality and comfort.",
    features: {
      type: "Over-ear",
      connectivity: "Bluetooth 5.2",
      noiseCancellation: "Advanced ANC",
      battery: "Up to 30 hours",
      fastCharging: "3 min = 3 hours",
      weight: "250g",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[0]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "logitech mx master 3s wireless mouse",
    productCode: "LOGI-MXM3S-001",
    thumbnail:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
    ],
    price: 8495,
    mrp: 10995,
    brand: "logitech",
    category: "computer accessories",
    stock: 100,
    description:
      "Premium wireless mouse with ergonomic design, quiet clicks, and multi-device support.",
    features: {
      connectivity: "Bluetooth & USB Receiver",
      dpi: "8000 DPI",
      battery: "Up to 70 days",
      buttons: "7 programmable buttons",
      scrollWheel: "MagSpeed electromagnetic",
      compatibility: "Windows, macOS, Linux",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[2]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: 'dell ultrasharp 27" 4k monitor',
    productCode: "DELL-U2723DE-001",
    thumbnail:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80",
    ],
    price: 45999,
    mrp: 52999,
    brand: "dell",
    category: "monitors",
    stock: 30,
    description:
      "Professional 4K monitor with exceptional color accuracy and USB-C connectivity.",
    features: {
      size: "27 inches",
      resolution: "3840 x 2160 (4K UHD)",
      panelType: "IPS Black",
      refreshRate: "60Hz",
      colorGamut: "100% sRGB, 100% Rec. 709, 98% DCI-P3",
      ports: "USB-C, HDMI, DisplayPort",
      stand: "Height, tilt, swivel, pivot adjustable",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[1]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "nintendo switch oled",
    productCode: "NINT-SWOLED-001",
    thumbnail:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80",
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80",
    ],
    price: 29999,
    mrp: 34999,
    brand: "nintendo",
    category: "gaming",
    stock: 40,
    description:
      "Hybrid gaming console with vibrant OLED screen and versatile play modes.",
    features: {
      display: '7" OLED touchscreen',
      resolution: "1280 x 720 (handheld), 1920 x 1080 (docked)",
      storage: "64GB internal",
      battery: "4.5 - 9 hours",
      connectivity: "Wi-Fi, Bluetooth",
      modes: "TV, Tabletop, Handheld",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[0]),
    isApproved: false,
    isDeleted: false,
  },
  {
    name: "canon eos r6 mark ii mirrorless camera",
    productCode: "CANON-R6M2-001",
    thumbnail:
      "https://images.unsplash.com/photo-1606980707095-f2f4f74945f3?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606980707095-f2f4f74945f3?w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    ],
    price: 224990,
    mrp: 249990,
    brand: "canon",
    category: "cameras",
    stock: 8,
    description:
      "Professional full-frame mirrorless camera with advanced autofocus and 4K 60fps video.",
    features: {
      sensor: "24.2MP Full-Frame CMOS",
      processor: "DIGIC X",
      autofocus: "Dual Pixel CMOS AF II",
      video: "4K 60fps, Full HD 180fps",
      iso: "100-102400",
      burstShooting: "Up to 40fps",
      stabilization: "In-body 5-axis IS",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[2]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: 'samsung 55" neo qled 4k smart tv',
    productCode: "SMSG-QN55-001",
    thumbnail:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    ],
    price: 84990,
    mrp: 119990,
    brand: "samsung",
    category: "televisions",
    stock: 20,
    description:
      "Premium QLED TV with Quantum Matrix Technology and stunning picture quality.",
    features: {
      size: "55 inches",
      resolution: "3840 x 2160 (4K)",
      displayType: "Neo QLED",
      refreshRate: "120Hz",
      hdr: "HDR10+, HLG",
      smartTV: "Tizen OS",
      ports: "4x HDMI 2.1, 2x USB",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[1]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "dyson v15 detect cordless vacuum",
    productCode: "DYSN-V15D-001",
    thumbnail:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    ],
    price: 54900,
    mrp: 64900,
    brand: "dyson",
    category: "home appliances",
    stock: 12,
    description:
      "Advanced cordless vacuum with laser detection and intelligent cleaning.",
    features: {
      motor: "Hyperdymium motor",
      battery: "Up to 60 minutes",
      filtration: "Advanced 5-stage filtration",
      display: "LCD screen with particle count",
      laserDetection: "Yes",
      weight: "3.1kg",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[0]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "keychron k8 pro mechanical keyboard",
    productCode: "KEYCH-K8PRO-001",
    thumbnail:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    ],
    price: 9999,
    mrp: 12999,
    brand: "keychron",
    category: "computer accessories",
    stock: 75,
    description:
      "Premium wireless mechanical keyboard with hot-swappable switches and QMK/VIA support.",
    features: {
      layout: "TKL (87 keys)",
      switches: "Hot-swappable Gateron",
      connectivity: "Bluetooth 5.1 & USB-C",
      battery: "Up to 240 hours",
      backlighting: "RGB",
      compatibility: "Windows, macOS, Linux",
      programming: "QMK/VIA",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[2]),
    isApproved: false,
    isDeleted: false,
  },
  {
    name: "bose soundlink revolve+ bluetooth speaker",
    productCode: "BOSE-SLR+-001",
    thumbnail:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    ],
    price: 22900,
    mrp: 29900,
    brand: "bose",
    category: "audio",
    stock: 35,
    description:
      "360-degree portable Bluetooth speaker with deep bass and water resistance.",
    features: {
      sound: "360-degree coverage",
      battery: "Up to 17 hours",
      waterproof: "IP55 rated",
      connectivity: "Bluetooth, NFC",
      microphoneType: "Built-in speakerphone",
      handle: "Integrated carrying handle",
      weight: "910g",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[1]),
    isApproved: true,
    isDeleted: false,
  },
  {
    name: "fitbit charge 6 fitness tracker",
    productCode: "FITB-CHG6-001",
    thumbnail:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    ],
    price: 12999,
    mrp: 15999,
    brand: "fitbit",
    category: "wearables",
    stock: 60,
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and health insights.",
    features: {
      display: "AMOLED color touchscreen",
      battery: "Up to 7 days",
      sensors: "Heart rate, SpO2, GPS",
      waterResistance: "50m",
      tracking: "Steps, calories, sleep, 40+ exercise modes",
      compatibility: "iOS, Android",
    },
    seller: new mongoose.Types.ObjectId(SAMPLE_SELLER_IDS[0]),
    isApproved: true,
    isDeleted: false,
  },
];

// Database connection configuration
const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/your-database-name";

/**
 * Seed the database with sample product data
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Optional: Clear existing products (comment out if you want to keep existing data)
    console.log("\nClearing existing products...");
    await Product.deleteMany({});
    console.log("✓ Existing products cleared");

    // Insert sample products
    console.log("\nInserting sample products...");
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully inserted ${insertedProducts.length} products`);

    // Display summary
    console.log("\n=== Seeding Summary ===");
    console.log(`Total products: ${insertedProducts.length}`);
    console.log(
      `Approved products: ${insertedProducts.filter((p) => p.isApproved).length}`,
    );
    console.log(
      `Pending approval: ${insertedProducts.filter((p) => !p.isApproved).length}`,
    );

    // Display sample product codes
    console.log("\nSample Product Codes:");
    insertedProducts.slice(0, 5).forEach((product) => {
      console.log(`  - ${product.productCode}: ${product.name}`);
    });

    console.log("\n✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("✗ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
  }
}

// Run the seed function
seedDatabase();


