/* ============================================================
   LukaNusantara — js/data.js
   Satu sumber data untuk semua halaman.
   Pemilik bagian (lihat PLAN.md):
   - Dev A (Rasya)   : STATS, REGIONS, TIMELINE, SOURCES, TEAM
   - Dev B (Tamam)   : GALLERY, ACTIONS  (cari komentar "TODO Dev B")
   Jangan mengubah nama key tanpa kesepakatan tim.
   ============================================================ */

const SITE_DATA = {

  /* ------------------------------------------------------------
     STATS — statistik krisis ekologis (halaman Home)
     value : angka murni (diformat id-ID oleh counter)
     ------------------------------------------------------------ */
  STATS: [
    { value: 113500,   suffix: " ha",  label: "Deforestasi hutan Indonesia dalam setahun", source: "KLHK" },
    { value: 1241,     suffix: " kasus", label: "Kejadian banjir & banjir rob dalam setahun", source: "BNPB" },
    { value: 481000,   suffix: " ton", label: "Estimasi sampah plastik bocor ke laut per tahun", source: "Riset Jambeck et al." },
    { value: 7,        suffix: "%",    label: "Terumbu karang Indonesia dalam kondisi sangat baik", source: "LIPI/BRIN" },
  ],

  /* ------------------------------------------------------------
     REGIONS — peta interaktif (halaman Home)
     markerX/markerY : posisi marker dalam persen (%) di atas peta
     ------------------------------------------------------------ */
  REGIONS: {
    sumatera: {
      name: "Sumatera",
      icon: "flame",
      disaster: "Deforestasi & Karhutla",
      tagline: "Gambut yang kering, asap yang menyeberang negara",
      desc: "Hutan dan lahan gambut Sumatera terus menyusut akibat pembukaan lahan perkebunan, diperparah kebakaran hutan dan lahan (karhutla) pada musim kemarau panjang. Asap yang dihasilkan menjadi bencana lintas batas negara.",
      fakta: [
        { label: "Hutan hilang 2001–2023", value: "± 9,8 juta ha" },
        { label: "Luas lahan gambut", value: "± 7 juta ha" },
        { label: "Puncak karhutla", value: "2015, 2019" },
      ],
      penyebab: [
        "Pembukaan lahan dengan cara dibakar untuk perkebunan",
        "Drainase gambut membuat lahan kering dan mudah terbakar",
        "Ekspansi industri pulp & kertas di hutan alam",
        "Penegakan aturan tata ruang yang belum konsisten",
      ],
      mitigasi: [
        "Restorasi lahan gambut (pembasahan kembali & revegetasi)",
        "Sistem Masyarakat Peduli Api di desa rawan karhutla",
        "Sertifikasi & penataan wilayah perkebunan yang sah",
        "Pemantauan titik api satelit dengan respons cepat",
      ],
      markerX: 17.5, markerY: 45,
    },
    jawa: {
      name: "Jawa",
      icon: "waves",
      disaster: "Banjir & Rob",
      tagline: "Pesisir utara yang perlahan tenggelam",
      desc: "Pesisir utara Jawa (Pekalongan, Semarang, Demak) mengalami kombinasi paling berat: permukaan tanah menyusut karena ambungan air tanah, mangrove hilang, dan permukaan laut yang terus naik — rob kini masuk ke permukiman hampir setiap hari pasang.",
      fakta: [
        { label: "Ambungan tanah Pantura", value: "hingga 10 cm/tahun" },
        { label: "Kenaikan muka laut global", value: "± 3,7 mm/tahun" },
        { label: "Lahan terdampak rob Demak", value: "ribuan hektare" },
      ],
      penyebab: [
        "Ekstraksi air tanah berlebihan oleh industri & permukiman",
        "Hilangnya mangrove sebagai pemecah gelombang alami",
        "Alih fungsi lahan pesisir menjadi tambak dan kawasan terbangun",
        "Kenaikan permukaan laut akibat perubahan iklim",
      ],
      mitigasi: [
        "Rehabilitasi mangrove & tambak silvofishery",
        "Penyediaan air bersih alternatif agar berhenti bor air tanah",
        "Tata ruang pesisir berbasis riset ketahanan iklim",
        "Sistem drainase kota yang diperbaiki dan dirawat rutin",
      ],
      markerX: 43, markerY: 86,
    },
    kalimantan: {
      name: "Kalimantan",
      icon: "trees",
      disaster: "Deforestasi & Kekeringan Gambut",
      tagline: "Paru-paru dunia yang tercemar kanal dan asap",
      desc: "Kalimantan menjadi pusat deforestasi tropis: hutan alam dialihkan untuk perkebunan dan tambang, sementara kanal pembukaan gambut mengeringkan lapisan organiknya. Saat musim kemarau panjang, gambut yang terbakar menyimpan karbon ratusan tahun dan sulit dipadamkan.",
      fakta: [
        { label: "Hutan hilang 2001–2023", value: "± 9 juta ha" },
        { label: "Kedalaman gambut tropis", value: "hingga > 10 m" },
        { label: "Kebakaran gambut 2019", value: "> 1,6 juta ha terdampak" },
      ],
      penyebab: [
        "Kanal gambut untuk transportasi & perkebunan yang mengeringkan lahan",
        "Alih fungsi hutan alam menjadi lahan industri",
        "El Niño memperpanjang musim kemarau",
        "Pembakaran lahan sebagai cara termurah membuka areal",
      ],
      mitigasi: [
        "Penutupan & pembalikan kanal gambut (rewetting)",
        "Restorasi gambut nasional (BRGM) di prioritas Kalimantan",
        "Agroforestri & hutan desa sebagai ekonomi alternatif",
        "Moratorium izin baru di hutan alam primer",
      ],
      markerX: 54, markerY: 46,
    },
    sulawesi: {
      name: "Sulawesi",
      icon: "cloud-rain",
      disaster: "Banjir Bandang, Longsor & Erosi",
      tagline: "Ketika lereng gundul tak mampu menahan hujan",
      desc: "Topografi Sulawesi yang curam memang rentan, tetapi intensitas bencana hidrometeorologis meningkat saat tutupan hutan DAS (daerah aliran sungai) menyusut. Hujan deras di lereng gundul berubah menjadi banjir bandang dan longsor yang menjangkau permukiman.",
      fakta: [
        { label: "Bencana hidrometeorologis", value: "dominan banjir & longsor" },
        { label: "DAS kritis nasional", value: "sebagian ada di Sulawesi" },
        { label: "Tragedi Palu 2018", value: "fatality + kerusakan berat" },
      ],
      penyebab: [
        "Deforestasi di hulu DAS mempercepat limpasan hujan",
        "Pertambangan & perladangan di lereng berisiko tinggi",
        "Curah hujan ekstrem yang makin sering akibat iklim",
        "Permukiman tumbuh di jalur rawan longsor/banjir",
      ],
      mitigasi: [
        "Reboisasi hulu DAS & konservasi tanah (rill/check dam)",
        "Peta risiko & relokasi permukiman dari zona rawan",
        "Sistem peringatan dini banjir bandang berbasis komunitas",
        "Kesepakatan tata ruang kawasan tambang yang ketat",
      ],
      markerX: 67.5, markerY: 51,
    },
    papua: {
      name: "Papua",
      icon: "tree-pine",
      disaster: "Deforestasi Hutan Primer",
      tagline: "Hutan primer terluas yang kini mulai terbuka",
      desc: "Papua menyimpan hutan alam primer tropis terluas di Indonesia — habitat cendrawasih hingga kantong semar. Tekanan industri sawit dan HTI mulai merambah, padahal hutan ini adalah penyangga iklim dan penghidupan masyarakat adat.",
      fakta: [
        { label: "Hutan alam tersisa", value: "± 32 juta ha" },
        { label: "Konsentrasi hutan primer", value: "terbesar di Indonesia" },
        { label: "Masyarakat adat", value: "± 250 suku bergantung hutan" },
      ],
      penyebab: [
        "Ekspansi perkebunan kelapa sawit ke wilayah timur",
        "Permit HTI (hutan tanaman industri) di hutan alam",
        "Infrastruktur baru membuka akses ke pedalaman",
        "Pengakuan hak hutan adat yang masih terbatas",
      ],
      mitigasi: [
        "Percepatan pengakuan & pemetaan hutan adat",
        "Moratorium izin di hutan primer & gambut",
        "Eco-development berbasis ekonomi masyarakat lokal",
        "Monitoring satelit independen terhadap pembukaan lahan",
      ],
      markerX: 86, markerY: 46,
    },
  },

  /* ------------------------------------------------------------
     GALLERY — halaman Eksplorasi
     TODO Dev B: isi ±12 kartu lintas 4 kategori.
     category harus salah satu dari: "Banjir Rob" | "Deforestasi" | "Kekeringan" | "Limbah Plastik"
     image : URL Unsplash/Pexels (bebas royalti). Fallback offline
             otomatis ditangani window.__imgFallback() di main.js.
     Contoh 1 item terlampir sebagai acuan format.
     ------------------------------------------------------------ */
  GALLERY: [
    {
      id: "contoh-rob-pekalongan",
      title: "Rob Menelan Pesisir Utara Jawa",
      category: "Banjir Rob",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
      alt: "Air laut masuk ke kawasan pesisir",
      desc: "Banjir rob di pesisir utara Jawa bukan lagi kejadian langka — ia hadir tiap pasang penuh, merendam permukiman, tambak, dan jalan nasional.",
      fakta: [
        "Ambungan tanah di Pekalongan mencapai ±10 cm per tahun",
        "Rob kini terjadi ±40 hari lebih dalam setahun di titik terdampak",
      ],
      penyebab: [
        "Ambungan akibat ekstraksi air tanah berlebih",
        "Hilangnya sabuk mangrove pesisir",
      ],
      aksi: [
        "Tanam & rawat mangrove di pesisir setempat",
        "Dukung penggantian sumber air tanah kota",
      ],
    },
    // TODO Dev B: tambahkan 11 kartu lainnya di sini (3-4 per kategori)
  ],

  /* ------------------------------------------------------------
     ACTIONS — kalkulator komitmen hijau (halaman Contact)
     TODO Dev B: isi 6 aksi. Satuan:
     co2     = kg CO₂e yang dihemat per tahun (angka)
     plastic = jumlah item plastik terhindarkan per tahun (angka, boleh 0)
     Contoh format terlampir.
     ------------------------------------------------------------ */
  ACTIONS: [
    {
      id: "tumbler",
      icon: "cup-soda",
      title: "Bawa Tumbler Sendiri",
      desc: "Mengganti air kemasan plastik satu kali pakai.",
      co2: 38, plastic: 156,
    },
    // TODO Dev B: tambahkan 5 aksi lain (hemat listrik, transportasi umum,
    // tanam pohon, kurangi plastik sekali pakai, kurangi daging merah)
  ],

  /* ------------------------------------------------------------
     TIMELINE — alur edukasi (halaman About)
     ------------------------------------------------------------ */
  TIMELINE: [
    {
      icon: "user-activity",
      title: "Aktivitas Manusia",
      desc: "Ekspansi ekonomi — perkebunan, tambang, kota — menuntut lahan dan sumber daya yang jauh melampaui daya dukung ekosistem.",
    },
    {
      icon: "activity",
      title: "Degradasi Ekosistem",
      desc: "Hutan terfragmentasi, gambut mengering, terumbu memutih, dan sungai tercemar. Penyangga alami lingkungan luruh perlahan.",
    },
    {
      icon: "alert-triangle",
      title: "Bencana Ekologis",
      desc: "Sistem yang rusak tidak mampu lagi meredam tekanan: karhutla, banjir rob, kekeringan, dan longsor menjadi musim tahunan.",
    },
    {
      icon: "sprout",
      title: "Aksi Mitigasi & Pemulihan",
      desc: "Restorasi gambut, mangrove, DAS, dan tata ruang berbasis riset. Pemulihan butuh dekade — dan dimulai dari keputusan hari ini.",
    },
  ],

  /* ------------------------------------------------------------
     SOURCES — transparansi data (halaman About)
     ------------------------------------------------------------ */
  SOURCES: [
    { name: "BNPB", desc: "Data kejadian bencana nasional: banjir, longsor, karhutla.", url: "https://bnpb.go.id" },
    { name: "BMKG", desc: "Data iklim, kenaikan muka laut, dan meteorologi.", url: "https://bmkg.go.id" },
    { name: "KLHK", desc: "Data tutupan hutan, deforestasi, dan kualitas lingkungan.", url: "https://klhk.go.id" },
    { name: "BRIN", desc: "Riset biota, terumbu karang, dan ekosistem gambut.", url: "https://brin.go.id" },
    { name: "Global Forest Watch", desc: "Monitoring deforestasi satelit global.", url: "https://globalforestwatch.org" },
  ],

  /* ------------------------------------------------------------
     TEAM — profil pembuat karya (halaman About)
     ------------------------------------------------------------ */
  TEAM: [
    {
      name: "Muhamad Rasya Naufal Khadafi",
      role: "Dev A — Struktur & Animasi",
      desc: "Mahasiswa Universitas Darussalam Gontor (462025611050). Menggarap halaman Home, animasi Anime.js, dan peta interaktif.",
    },
    {
      name: "Tamam Ni'amillah",
      role: "Dev B — Konten & Interaksi",
      desc: "Mahasiswa Universitas Darussalam Gontor (462025611095). Menggarap halaman Eksplorasi, Contact, dan pengelolaan data galeri.",
    },
  ],
};
