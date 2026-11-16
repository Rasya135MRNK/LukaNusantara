/* ============================================================
   LukaNusantara — js/data.js
   Satu sumber data untuk semua halaman.
   Pemilik bagian awal (lihat PLAN.md):
   - Dev A (Rasya)   : STATS, REGIONS, STORY, TIMELINE, SOURCES, TEAM
   - Dev B (Tamam)   : GALLERY, ACTIONS (diisi saat integrasi final
     oleh Dev A atas nama Dev B)
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
      markerX: 12.0, markerY: 40.4,
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
      markerX: 33.0, markerY: 82.3,
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
      markerX: 40.5, markerY: 34.7,
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
      markerX: 57.5, markerY: 47.6,
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
      markerX: 88.0, markerY: 57.8,
    },
  },

  /* ------------------------------------------------------------
     STORY — scrollytelling "Nusantara yang Memudar" (cerita.html)
     filter  : CSS filter per adegan (indah → hancur)
     overlay : 0–1, kepekatan gradient gelap per adegan
     pos     : posisi crop object-position (opsional, default "center")
     ------------------------------------------------------------ */
  STORY: [
    {
      id: "s1",
      title: "Hutan yang Hidup",
      text: "Sebelum peta tahu nama-nama kita, hutan ini sudah bernapas. Kanopi rimbun menampung hujan, mengubah karbon menjadi oksigen, dan menyimpan kehidupan yang belum selesai diceritakan.",
      image: "https://images.pexels.com/photos/25306350/pexels-photo-25306350.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Hutan hujan tropis Indonesia yang rimbun dan lebat",
      filter: "saturate(1.1) brightness(1)",
      overlay: 0.25,
    },
    {
      id: "s2",
      title: "Denyut Kehidupan",
      text: "Air jatuh dari bukit, terumbu menyala di laut timur, gajah berjalan di lorong hijau. Nusantara adalah rumah bagi keanekaragaman yang membuat dunia iri.",
      image: "https://images.pexels.com/photos/14559571/pexels-photo-14559571.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Air terjun Tumpak Sewu yang mengalir deras di lereng Jawa Timur",
      filter: "saturate(1.05) brightness(0.97)",
      overlay: 0.3,
    },
    {
      id: "s3",
      title: "Suara Mesin & Gergaji",
      text: "Lalu aroma itu datang: mesin, gergaji, dan lembaran izin atas lahan. Kabut pagi mulai berbaur dengan sesuatu yang tidak wajar.",
      image: "https://images.pexels.com/photos/34273658/pexels-photo-34273658/free-photo-of-lumberjacks-working-in-forest-clearing-with-chainsaws.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Penebang kayu menggergaji batang pohon di areal tebangan",
      filter: "saturate(0.85) brightness(0.9)",
      overlay: 0.38,
    },
    {
      id: "s4",
      title: "Hutan Tumbang",
      text: "Pohon yang bertahan ratusan tahun tumbang dalam hitungan menit. Yang tertinggal hanya pangkalan, akar yang kering, dan sunyi yang aneh.",
      image: "https://images.pexels.com/photos/9305820/pexels-photo-9305820.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Tunggak dan batang pohon tebingan yang tersisa di hutan",
      filter: "saturate(0.6) brightness(0.8)",
      overlay: 0.45,
    },
    {
      id: "s5",
      title: "Kebakaran Hutan",
      text: "Kemarau memakai sisa-sisa itu sebagai bahan bakar. Api merangkak di bawah kanopi, asap menelan cakrawala, dan lahan yang baru saja gundul kini terbakar hingga ke akar gambutnya.",
      image: "https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Api dan asap kebakaran hutan merangkak di antara pepohonan",
      filter: "saturate(0.55) brightness(0.75) contrast(1.1) sepia(0.25)",
      overlay: 0.5,
    },
    {
      id: "s6",
      title: "Langit Menghitam",
      text: "Kemarau datang, gambut menyala di bawah permukaan. Langit berubah warna, dan anak-anak belajar mengenali ISPA sebelum mengenali bintang.",
      image: "https://images.pexels.com/photos/28345859/pexels-photo-28345859/free-photo-of-dramatic-sky-above-smoke-covered-mountain.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Langit yang gelap dan suram di atas pegunungan tertutup asap",
      filter: "saturate(0.5) brightness(0.7) contrast(1.05)",
      overlay: 0.52,
    },
    {
      id: "s7",
      title: "Laut yang Menelan",
      text: "Apa yang tidak dibakar, dibuang ke sungai — dan sungai membawanya ke laut. Plastik menemani arus, memutihkan terumbu, lalu kembali ke piring kita.",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1920&auto=format&fit=crop",
      alt: "Permukaan laut yang kelam",
      filter: "saturate(0.4) brightness(0.65)",
      overlay: 0.55,
    },
    {
      id: "s8",
      title: "Tenggelam",
      /* Foto dokumentasi Wikimedia Commons — CC BY-SA 4.0:
         "Banjir Jakarta, Perumahan di Tanjung Duren, 1 Januari 2020"
         (lokasi sama dengan banjir Tanjung Duren 14 November 2026) */
      text: "Hujan deras dan pasang laut datang bersamaan. Dalam hitungan jam, taman dan gang perumahan Jakarta berubah menjadi danau cokelat — ayunan taman bermain tenggelam sampai dudukannya, pagar-pagar hilang di bawah air keruh. Banjir rob datang setiap tahun, dan setiap tahun lebih tinggi. Nusantara tidak tumbang sekaligus — ia memudar, perlahan, sampai kita mengingatnya sebagai cerita.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Banjir_Jakarta_Perumahan_di_Tanjung_Duren_1_Januari_2020.jpg/1920px-Banjir_Jakarta_Perumahan_di_Tanjung_Duren_1_Januari_2020.jpg",
      alt: "Banjir merendam taman perumahan di Tanjung Duren, Jakarta Barat (dok. Wikimedia Commons, CC BY-SA 4.0)",
      pos: "center 40%",
      filter: "saturate(0.25) brightness(0.5) contrast(1.1)",
      overlay: 0.65,
    },
  ],

  /* ------------------------------------------------------------
     OUTRO_BG — slideshow latar penutup (cerita.html)
     Kumpulan foto bencana ekologis Indonesia; diganti otomatis
     tiap 5 detik oleh initOutro() di main.js.
     ------------------------------------------------------------ */
  OUTRO_BG: [
    {
      image: "https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=1920",
      label: "Karhutla — kebakaran hutan dan lahan",
    },
    {
      image: "https://images.pexels.com/photos/28345859/pexels-photo-28345859/free-photo-of-dramatic-sky-above-smoke-covered-mountain.jpeg?auto=compress&cs=tinysrgb&w=1920",
      label: "Asap karhutla menutup langit",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Banjir_Jakarta_Perumahan_di_Tanjung_Duren_1_Januari_2020.jpg/1920px-Banjir_Jakarta_Perumahan_di_Tanjung_Duren_1_Januari_2020.jpg",
      label: "Banjir merendam permukiman (dok. Wikimedia Commons, CC BY-SA 4.0)",
    },
    {
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1920&auto=format&fit=crop",
      label: "Banjir rob di pesisir",
    },
    {
      image: "https://images.pexels.com/photos/9305820/pexels-photo-9305820.jpeg?auto=compress&cs=tinysrgb&w=1920",
      label: "Deforestasi — rawan longsor & erosi",
    },
    {
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1920&auto=format&fit=crop",
      label: "Kekeringan — ladang pecah karena El Niño",
    },
  ],

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
      id: "rob-pekalongan",
      title: "Rob Menelan Pesisir Utara Jawa",
      category: "Banjir Rob",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
      alt: "Gelombang air laut yang masuk ke kawasan pesisir",
      desc: "Banjir rob di pesisir utara Jawa bukan lagi kejadian langka — ia hadir tiap pasang penuh, merendam permukiman, tambak, dan jalan nasional.",
      fakta: [
        "Ambungan tanah di Pekalongan mencapai ±10 cm per tahun",
        "Rob kini terjadi puluhan hari lebih sering dalam setahun di titik terdampak",
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
    {
      id: "jakarta-tenggelam",
      title: "Jakarta yang Perlahan Tenggelam",
      category: "Banjir Rob",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200&auto=format&fit=crop",
      alt: "Permukaan laut yang mengancam kawasan pesisir",
      desc: "Sebagian besar wilayah Jakarta Utara kini berada di bawah permukaan laut. Kombinasi ambungan tanah dan hujan ekstrem membuat banjir bukan lagi soal musim, melainkan soal pasang-surut.",
      fakta: [
        "Ambungan tanah Jakarta Utara mencapai 5–15 cm per tahun di titik rawan",
        "Sebagian besar kawasan pesisir ibu kota berada di bawah muka laut rata-rata",
      ],
      penyebab: [
        "Ekstraksi air tanah oleh industri dan permukiman padat",
        "Betonisasi kota menghambat resapan air hujan",
      ],
      aksi: [
        "Beralih dari sumur bor ke air bersih jaringan kota",
        "Dukung taman resapan dan greening kota",
      ],
    },
    {
      id: "mangrove-hilang",
      title: "Mangrove: Benteng yang Hilang",
      category: "Banjir Rob",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      alt: "Kanopi hijau dari udara di kawasan pesisir",
      desc: "Indonesia punya mangrove terluas di dunia, tetapi luasnya terus menyusut. Padahal lereng bakau adalah pemecah gelombang alami yang melindungi pesisir dari rob dan abrasi.",
      fakta: [
        "Indonesia menyimpan ±3 juta ha mangrove — terluas di dunia",
        "Sabuk mangrove cukup tebal mampu meredam energi gelombang secara signifikan",
      ],
      penyebab: [
        "Alih fungsi hutan bakau menjadi tambak dan kawasan terbangun",
        "Penebangan untuk arang dan kayu bangunan",
      ],
      aksi: [
        "Ikut serta penanaman mangrove dengan spesies lokal",
        "Lindungi area bakau yang masih utuh, jangan dibuka jadi tambak baru",
      ],
    },
    {
      id: "kanopi-sumatera",
      title: "Kehilangan Kanopi Sumatera",
      category: "Deforestasi",
      region: "Sumatera",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
      alt: "Cahaya menembus kanopi hutan tropis",
      desc: "Sumatera menjadi episentrum deforestasi Indonesia. Hutan alam dibuka untuk perkebunan dan industri pulp, menyisakan fragmen hutan yang makin sulit bernapas.",
      fakta: [
        "±9,8 juta ha hutan Sumatera hilang dalam dua dekade terakhir",
        "Lebih dari separuh tutupan hutan asli Sumatera telah berubah fungsi",
      ],
      penyebab: [
        "Ekspansi perkebunan kelapa sawit",
        "Konsesi industri pulp dan kertas di hutan alam",
      ],
      aksi: [
        "Pilih produk bersertifikasi keberlanjutan (RSPO/FSC)",
        "Dukung program koridor ekologis antarblok hutan",
      ],
    },
    {
      id: "gambut-terbakar",
      title: "Gambut yang Kering dan Terbakar",
      category: "Deforestasi",
      region: "Kalimantan",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop",
      alt: "Asap tebal membumbung dari lahan terbakar",
      desc: "Gambut yang dikeringkan oleh kanal mudah sekali terbakar saat kemarau. Api menyala di bawah permukaan tanah, sulit dipadamkan, dan melepas karbon yang tersimpan berabad-abad.",
      fakta: [
        "Kebakaran lahan 2019 menjangkau lebih dari 1,6 juta ha di Indonesia",
        "Asap karhutla menaikkan risiko ISPA berkali lipat di wilayah terdampak",
      ],
      penyebab: [
        "Kanal gambut mengeringkan lapisan organik",
        "Pembukaan lahan dengan cara dibakar",
      ],
      aksi: [
        "Dukung restorasi gambut (pembasahan kembali)",
        "Laporkan titik api melalui saluran resmi BNPB/KLHK",
      ],
    },
    {
      id: "koridor-satwa",
      title: "Koridor Satwa Terfragmentasi",
      category: "Deforestasi",
      region: "Sumatera",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
      alt: "Hutan berkabut yang terpotong kebun-kebun",
      desc: "Hutan yang terpecah-pecah memutus jalur migrasi gajah dan harimau. Ketika habitat menyempit, konflik manusia-satwa meningkat — dan satwa selalu pihak yang kalah.",
      fakta: [
        "Habitat harimau Sumatera tersisa di fragmen-fragmen kecil hutan",
        "Konflik gajah-manusia terjadi ratusan kasus per tahun di wilayah perbatasan hutan",
      ],
      penyebab: [
        "Kebun dan permukiman memisahkan blok hutan",
        "Jalur infrastruktur menembus koridor satwa",
      ],
      aksi: [
        "Dukung skema pembangunan ramah satwa di sekitar hutan",
        "Hindari produk yang berasal dari lahan pembukaan ilegal",
      ],
    },
    {
      id: "kemarau-panjang",
      title: "Musim Kemarau yang Makin Panjang",
      category: "Kekeringan",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
      alt: "Ladang kering kecokelatan di musim kemarau",
      desc: "Musim kemarau Indonesia memanjang seiring perubahan iklim. Sumber air menurun, panen terancam, dan kebakaran lahan semakin mudah terjadi.",
      fakta: [
        "Anomali curah hujan tercatat BMKG pada kemarau-kemarau ekstrem terakhir",
        "Sebagian besar daerah aliran sungai nasional berstatus terdegradasi",
      ],
      penyebab: [
        "Perubahan iklim memperpanjang durasi kemarau",
        "Deforestasi hulu DAS mengurangi cadangan air tanah",
      ],
      aksi: [
        "Praktikkan hemat air di rumah tangga",
        "Bangun panen hujan sederhana di halaman atau sekolah",
      ],
    },
    {
      id: "sumur-mengering",
      title: "Sumur Warga yang Mengering",
      category: "Kekeringan",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
      alt: "Perbukitan kars yang sulit menyimpan air",
      desc: "Di kawasan kars, air hujan cepat menghilang ke retakan batu. Saat kemarau, sumur dan mataair warga mengering dan truk tangki menjadi satu-satunya harapan.",
      fakta: [
        "Wilayah kars menyimpan air di bawah tanah yang sulit dijangkau sumur biasa",
        "Ratusan desa rawan kekeringan terbantu operasi air bersih saat kemarau puncak",
      ],
      penyebab: [
        "Geologi kars tidak mampu menahan air di permukaan",
        "Penebangan tutupan lahan mempercepat limpasan hujan",
      ],
      aksi: [
        "Dukung pembangunan embung dan sumur resapan",
        "Kelola rumah tangga dengan satuan air hemat",
      ],
    },
    {
      id: "el-nino-ladang",
      title: "Ladang Pecah karena El Niño",
      category: "Kekeringan",
      region: "Kalimantan",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
      alt: "Lahan pertanian yang layu saat kemarau",
      desc: "Saat El Niño menguat, kemarau di Kalimantan berubah parah: ladang gagal panen, gambut terbakar, dan asap menutup langit berminggu-minggu.",
      fakta: [
        "El Niño 2015 dan 2019 memicu kemarau dan karhutla paling parah dekade ini",
        "Gagal panen meluas saat musim kemarau ekstrem berlangsung",
      ],
      penyebab: [
        "Anomali suhu permukaan laut Pasifik mengubah pola hujan",
        "Lahan gambut kering menjadi mudah terbakar",
      ],
      aksi: [
        "Gunakan varietas tanam tahan kering",
        "Perlindungan asuransi pertanian untuk petani kecil",
      ],
    },
    {
      id: "sungai-plastik",
      title: "Sungai Beralas Plastik",
      category: "Limbah Plastik",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop",
      alt: "Aliran sungai yang terlihat dari udara",
      desc: "Sungai-sungai besar Jawa termasuk yang paling banyak membawa sampah plastik ke laut di dunia. Setiap hujan deras, plastik dari permukiman mengalir ke hilir tanpa saringan.",
      fakta: [
        "Beberapa sungai Jawa masuk daftar penyumbang plastik laut terbesar global",
        "Sampah plastik mendominasi komposisi sampah sungai perkotaan",
      ],
      penyebab: [
        "Konsumsi plastik sekali pakai yang tinggi",
        "Kapasitas pengelolaan sampah kota yang terbatas",
      ],
      aksi: [
        "Pilah sampah rumah: organik, anorganik, sisa",
        "Tolak kantong plastik, bawa tas belanja sendiri",
      ],
    },
    {
      id: "mikroplastik-piring",
      title: "Mikroplastik di Meja Makan",
      category: "Limbah Plastik",
      region: "Jawa",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop",
      alt: "Tangan yang menumbuhkan tanaman makanan",
      desc: "Plastik yang dibuang tak pernah benar-benar hilang — ia pecah menjadi partikel mikro, masuk ke garam, ikan, dan air minum, lalu kembali ke piring kita.",
      fakta: [
        "Mikroplastik terdeteksi pada sebagian besar sampel garam laut yang diteliti",
        "Ikan konsumsi umum ditemukan mengandung partikel mikroplastik",
      ],
      penyebab: [
        "Degradasi sampah plastik menjadi partikel mikro",
        "Serat sintetis dari pencucian pakaian",
      ],
      aksi: [
        "Kurangi plastik sekali pakai di dapur",
        "Pilih serat alami dan saring air minum",
      ],
    },
    {
      id: "laut-timur-plastik",
      title: "Plastik Sampai ke Laut Timur",
      category: "Limbah Plastik",
      region: "Papua",
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200&auto=format&fit=crop",
      alt: "Pesisir dan perairan di kawasan timur Indonesia",
      desc: "Arus lintas laut membawa sampah hingga ke perairan timur Indonesia. Kawasan yang begitu terpencil pun kini tidak luput dari plastik.",
      fakta: [
        "Estimasi ratusan ribu ton plastik Indonesia masuk laut setiap tahun",
        "Sampah plastik tercatat di kawasan konservasi pesisir timur Indonesia",
      ],
      penyebab: [
        "Layanan pengelolaan sampah di wilayah timur masih terbatas",
        "Arus laut memindahkan sampah antarperairan",
      ],
      aksi: [
        "Ikut bersih-bersih pesisir (beach clean-up) saat berkunjung",
        "Turunkan plastik kantor dan rumah: botol refill, tanpa sedotan",
      ],
    },
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
      desc: "Mengganti air kemasan plastik sekali pakai di luar rumah.",
      co2: 38, plastic: 156,
    },
    {
      id: "tas-belanja",
      icon: "shopping-bag",
      title: "Bawa Tas Belanja Sendiri",
      desc: "Menolak kantong plastik di minimarket dan pasar.",
      co2: 25, plastic: 300,
    },
    {
      id: "hemat-listrik",
      icon: "zap",
      title: "Hemat Listrik di Rumah",
      desc: "Matikan perangkat standby, atur suhu AC masuk akal.",
      co2: 250, plastic: 0,
    },
    {
      id: "transportasi-hijau",
      icon: "bike",
      title: "Naik Umum / Sepeda",
      desc: "Kurangi kendaraan pribadi untuk rute harian pendek.",
      co2: 500, plastic: 0,
    },
    {
      id: "tanam-pohon",
      icon: "tree-pine",
      title: "Tanam & Rawat 1 Pohon/Bulan",
      desc: "Pohon yang dirawat menyerap karbon bertahun-tahun ke depan.",
      co2: 252, plastic: 0,
    },
    {
      id: "kurangi-daging",
      icon: "utensils",
      title: "Kurangi Daging Merah",
      desc: "Ganti beberapa porsi daging merah per minggu dengan nabati.",
      co2: 300, plastic: 0,
    },
  ],

  /* ------------------------------------------------------------
     TIMELINE — alur edukasi (halaman About)
     ------------------------------------------------------------ */
  TIMELINE: [
    {
      icon: "factory",
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
      name: "Tamam Ni'amillah Ramadhan Putra Widyana",
      role: "Dev B — Konten & Interaksi",
      desc: "Mahasiswa Universitas Darussalam Gontor (462025611095). Menggarap halaman Eksplorasi, Contact, dan pengelolaan data galeri.",
    },
  ],
};
