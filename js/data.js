// Dữ liệu 24 sản phẩm mẫu
const PRODUCTS = [
    // --- SÚNG ĐỒ CHƠI (8) ---
    {
        id: "G01", name: "Súng mô hình M1911 Kim loại (Tỉ lệ 1:2.05)", category: "gun", price: 650000, oldPrice: 800000,
        stock: true, tags: ["hot", "sale"], brand: "Armory", shortDesc: "Mô hình tháo lắp, văng shell thép.",
        image: "pics/M1911.jpg"
    },
    {
        id: "G02", name: "Súng đạn xốp M4A1 Tactical", category: "gun", price: 1250000, oldPrice: null,
        stock: true, tags: ["new"], brand: "Blaster", shortDesc: "Bắn đạn xốp an toàn, pin sạc.",
        image: "pics/M4A1.jpg"
    },
    {
        id: "G03", name: "Glock 17 Đạn Thạch (Gel Blaster)", category: "gun", price: 850000, oldPrice: 950000,
        stock: true, tags: [], brand: "GelStrike", shortDesc: "Auto blowback, pin 7.4V.",
        image: "pics/Glock17.jpg"
    },
    {
        id: "G04", name: "AWM Sniper Đạn Xốp Văng Shell", category: "gun", price: 1500000, oldPrice: 1800000,
        stock: false, tags: ["hot"], brand: "Blaster", shortDesc: "Lên đạn từng viên, ném vỏ đạn thật.",
        image: "pics/AWM_Sniper.jpg"
    },
    {
        id: "G05", name: "Súng Nước Điện Cỡ Lớn", category: "gun", price: 450000, oldPrice: null,
        stock: true, tags: ["sale"], brand: "SummerToy", shortDesc: "Bắn liên tục, tầm xa 10m.",
        image: "pics/Water_Gun.jpg"
    },
    {
        id: "G06", name: "Mô hình AK47 Mini Hợp Kim", category: "gun", price: 250000, oldPrice: null,
        stock: true, tags: [], brand: "Armory", shortDesc: "Dài 20cm, không bắn được.",
        image: "pics/AK47_Mini.jpg"
    },
    {
        id: "G07", name: "Shotgun M870 Đạn Xốp", category: "gun", price: 1100000, oldPrice: 1300000,
        stock: true, tags: ["hot"], brand: "Blaster", shortDesc: "Pump action mượt mà.",
        image: "pics/M870_Shotgun.jpg"
    },
    {
        id: "G08", name: "Revolver Rulo Nhựa Mini", category: "gun", price: 150000, oldPrice: null,
        stock: true, tags: [], brand: "Toy", shortDesc: "Đồ chơi rẻ tiền, văng shell.",
        image: "pics/Revolver.jpg"
    },

    // --- CẬN CHIẾN (8) ---
    {
        id: "M01", name: "Kiếm Katana Zoro Gỗ (Wado)", category: "melee", price: 350000, oldPrice: 450000,
        stock: true, tags: ["hot", "sale"], brand: "CosplayPro", shortDesc: "Gỗ ép an toàn, tỉ lệ 1:1.",
        image: "pics/Katana_Zoro.jpg"
    },
    {
        id: "M02", name: "Dao Karambit Nhựa Tập Luyện", category: "melee", price: 120000, oldPrice: null,
        stock: true, tags: [], brand: "Train", shortDesc: "Không sắc bén, múa cực êm.",
        image: "pics/Karambit.jpg"
    },
    {
        id: "M03", name: "Búa Thor Mjolnir Cosplay 1:1", category: "melee", price: 1800000, oldPrice: 2000000,
        stock: true, tags: ["hot"], brand: "Marvelous", shortDesc: "Nhựa ABS đặc, nặng 2kg.",
        image: "pics/Thor_Hammer.jpg"
    },
    {
        id: "M04", name: "Khiên Captain America Nhựa", category: "melee", price: 850000, oldPrice: null,
        stock: true, tags: ["new"], brand: "Marvelous", shortDesc: "Đường kính 55cm, đai da.",
        image: "pics/Cap_Shield.jpg"
    },
    {
        id: "M05", name: "Kunai Naruto Nhựa (Set 3 cái)", category: "melee", price: 90000, oldPrice: 120000,
        stock: true, tags: ["sale"], brand: "AnimeToy", shortDesc: "Dài 13cm, nhựa dẻo.",
        image: "pics/Kunai_Set.jpg"
    },
    {
        id: "M06", name: "Dao Găm Huấn Luyện Cao Su", category: "melee", price: 150000, oldPrice: null,
        stock: true, tags: [], brand: "Train", shortDesc: "Dùng tập luyện, uốn cong được.",
        image: "pics/Rubber_Knife.jpg"
    },
    {
        id: "M07", name: "Thanh Long Đao Quan Vũ Xốp", category: "melee", price: 550000, oldPrice: null,
        stock: false, tags: [], brand: "CosplayPro", shortDesc: "Xốp EVA an toàn, tháo lắp 3 khúc.",
        image: "pics/Guan_Dao.jpg"
    },
    {
        id: "M08", name: "Rìu Leviathan God Of War (Xốp)", category: "melee", price: 600000, oldPrice: null,
        stock: true, tags: ["hot"], brand: "CosplayPro", shortDesc: "Sơn giả kim loại cực đẹp.",
        image: "pics/Leviathan_Axe.jpg"
    },

    // --- PHỤ KIỆN (8) ---
    {
        id: "A01", name: "Hộp 100 Viên Đạn Xốp", category: "accessory", price: 150000, oldPrice: null,
        stock: true, tags: [], brand: "Blaster", shortDesc: "Đầu hít/tròn tùy chọn.",
        image: "pics/Foam_Darts.jpg"
    },
    {
        id: "A02", name: "Gói 10000 Viên Đạn Thạch 7-8mm", category: "accessory", price: 50000, oldPrice: null,
        stock: true, tags: ["sale"], brand: "GelStrike", shortDesc: "Ngâm nước nở ra.",
        image: "pics/Gel_Balls.jpg"
    },
    {
        id: "A03", name: "Bình Xịt Dầu Bôi Trơn Silicon", category: "accessory", price: 80000, oldPrice: null,
        stock: true, tags: [], brand: "MainTech", shortDesc: "Bảo dưỡng ron, nhựa.",
        image: "pics/Silicone_Oil.jpg"
    },
    {
        id: "A04", name: "Bia Tập Bắn Điện Tử Tự Đứng", category: "accessory", price: 250000, oldPrice: 300000,
        stock: true, tags: ["hot"], brand: "Toy", shortDesc: "Ghi điểm tự động, phát nhạc.",
        image: "pics/Auto_Target.jpg"
    },
    {
        id: "A05", name: "Kệ Trưng Bày Treo Tường (Modular)", category: "accessory", price: 350000, oldPrice: null,
        stock: true, tags: ["new"], brand: "Armory", shortDesc: "Pegboard nhựa ABS đen.",
        image: "pics/Pegboard.jpg"
    },
    {
        id: "A06", name: "Dây Đeo Súng 2 Điểm Tactical", category: "accessory", price: 120000, oldPrice: null,
        stock: true, tags: [], brand: "Gear", shortDesc: "Dây dù chắc chắn, ngàm khóa kim loại.",
        image: "pics/Gun_Sling.jpg"
    },
    {
        id: "A07", name: "Kính Bảo Hộ Chống Đạn Thạch", category: "accessory", price: 70000, oldPrice: null,
        stock: true, tags: ["hot"], brand: "SafeGuard", shortDesc: "Cần thiết khi chơi Gel Blaster.",
        image: "pics/Safety_Goggles.jpg"
    },
    {
        id: "A08", name: "Balo Đựng Đồ Chơi Chiến Thuật", category: "accessory", price: 450000, oldPrice: 550000,
        stock: false, tags: [], brand: "Gear", shortDesc: "Vải oxford chống nước.",
        image: "pics/Tactical_Bag.jpg"
    }
];