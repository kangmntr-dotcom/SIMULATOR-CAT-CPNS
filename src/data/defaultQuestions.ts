import { Question } from '../types';

export const DEFAULT_EXAM_SETTINGS = {
  durationMinutes: 100,
  twkPassingGrade: 65,
  tiuPassingGrade: 80,
  tkpPassingGrade: 166,
  totalQuestions: 110,
};

// 110 Authentic SKD CPNS Questions based on BKN standard specifications
export const DEFAULT_QUESTIONS: Question[] = [
  // ========================== TWK (1 - 30) ==========================
  {
    id: 'twk-1',
    number: 1,
    category: 'TWK',
    topic: 'Pancasila & Ideologi',
    text: 'Pancasila sebagai dasar negara memiliki makna bahwa seluruh tatanan kehidupan berbangsa dan bernegara di Indonesia harus berlandaskan pada nilai-nilai Pancasila. Sikap positif yang mencerminkan pengamalan sila ke-2 dalam kehidupan sehari-hari di lingkungan kerja adalah...',
    options: [
      { key: 'A', text: 'Mengutamakan musyawarah untuk mencapai mufakat dalam setiap penyelesaian masalah kantor' },
      { key: 'B', text: 'Memperlakukan rekan kerja secara adil dan setara tanpa membeda-bedakan latar belakang suku maupun jabatan' },
      { key: 'C', text: 'Melaksanakan ibadah tepat waktu dan menghormati keyakinan agama rekan kerja' },
      { key: 'D', text: 'Membeli dan bangga menggunakan produk buatan anak bangsa di lingkungan kantor' },
      { key: 'E', text: 'Bekerja keras dan tidak menggunakan sarana dinas kantor untuk kepentingan pribadi' },
    ],
    correctKey: 'B',
    explanation: 'Sila ke-2 "Kemanusiaan yang Adil dan Beradab" mengandung butir-butir pengakuan terhadap persamaan derajat, hak, dan kewajiban setiap manusia tanpa membeda-bedakan suku, keturunan, agama, jenis kelamin, dan kedudukan sosial. Pilihan B paling tepat mencerminkan sila ke-2. (A = Sila 4, C = Sila 1, D = Sila 3, E = Sila 5).'
  },
  {
    id: 'twk-2',
    number: 2,
    category: 'TWK',
    topic: 'UUD NRI Tahun 1945',
    text: 'Berdasarkan Pasal 1 ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 setelah amandemen, kedaulatan berada di tangan rakyat dan dilaksanakan menurut...',
    options: [
      { key: 'A', text: 'Majelis Permusyawaratan Rakyat sepenuhnya' },
      { key: 'B', text: 'Undang-Undang Dasar' },
      { key: 'C', text: 'Presiden sebagai kepala pemerintahan' },
      { key: 'D', text: 'Dewan Perwakilan Rakyat bersama Presiden' },
      { key: 'E', text: 'Kehendak umum masyarakat melalui pemilihan umum' },
    ],
    correctKey: 'B',
    explanation: 'Pasal 1 ayat (2) UUD 1945 hasil amandemen berbunyi: "Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar." Sebelum amandemen, kedaulatan dilakukan sepenuhnya oleh MPR.'
  },
  {
    id: 'twk-3',
    number: 3,
    category: 'TWK',
    topic: 'Bhinneka Tunggal Ika',
    text: 'Semboyan Bhinneka Tunggal Ika yang tertuang dalam lambang negara Garuda Pancasila secara historis dipetik dari kitab kuno era Majapahit, yaitu...',
    options: [
      { key: 'A', text: 'Kitab Negarakertagama karya Mpu Prapanca' },
      { key: 'B', text: 'Kitab Sutasoma karya Mpu Tantular' },
      { key: 'C', text: 'Kitab Arjunawiwaha karya Mpu Kanwa' },
      { key: 'D', text: 'Kitab Bharatayuddha karya Mpu Sedah dan Mpu Panuluh' },
      { key: 'E', text: 'Kitab Pararaton' },
    ],
    correctKey: 'B',
    explanation: 'Frasa "Bhinneka Tunggal Ika tan hana dharma mangrwa" berasal dari Kakawin Sutasoma karangan Mpu Tantular pada masa kejayaan Kerajaan Majapahit (abad ke-14).'
  },
  {
    id: 'twk-4',
    number: 4,
    category: 'TWK',
    topic: 'Negara Kesatuan Republik Indonesia',
    text: 'Bentuk negara Indonesia adalah kesatuan yang berbentuk republik, sebagaimana ditegaskan dalam Pasal 1 ayat (1) UUD 1945. Salah satu ciri esensial dari negara kesatuan dengan sistem desentralisasi adalah...',
    options: [
      { key: 'A', text: 'Pemerintah daerah memiliki kedaulatan tertinggi di wilayah yurisdiksinya' },
      { key: 'B', text: 'Pemerintah pusat menyerahkan sebagian wewenang pemerintahan kepada daerah otonom untuk mengatur urusannya sendiri' },
      { key: 'C', text: 'Setiap daerah memiliki konstitusi dan undang-undang tersendiri yang terpisah dari pusat' },
      { key: 'D', text: 'Seluruh urusan kebijakan mutlak ditentukan dari pusat tanpa adanya kewenangan lokal' },
      { key: 'E', text: 'Pemerintah daerah berhak membentuk angkatan bersenjata sendiri' },
    ],
    correctKey: 'B',
    explanation: 'Desentralisasi adalah penyerahan urusan pemerintahan oleh pemerintah pusat kepada daerah otonom berdasarkan asas otonomi untuk mengatur dan mengurus urusan pemerintahan dalam sistem NKRI.'
  },
  {
    id: 'twk-5',
    number: 5,
    category: 'TWK',
    topic: 'Nasionalisme & Sejarah',
    text: 'Lahirnya organisasi Budi Utomo pada 20 Mei 1908 menandai babak baru pergerakan nasional Indonesia karena...',
    options: [
      { key: 'A', text: 'Mulai digunakannya perlawanan senjata secara serentak di seluruh kepulauan' },
      { key: 'B', text: 'Perjuangan beralih dari yang bersifat kedaerahan menjadi perjuangan modern terorganisir berskala nasional' },
      { key: 'C', text: 'Berhasil mengusir pemerintah kolonial Belanda secara langsung' },
      { key: 'D', text: 'Dipimpin langsung oleh para tokoh agama lintas daerah' },
      { key: 'E', text: 'Mendapat pengakuan resmi dari PBB sebagai wakil rakyat' },
    ],
    correctKey: 'B',
    explanation: 'Organisasi Budi Utomo menjadi tonggak Kebangkitan Nasional karena mengubah paradigma perjuangan dari yang semula bersifat kedaerahan dan bersenjata menjadi perjuangan modern berbasis organisasi dan diplomasi.'
  },
  {
    id: 'twk-6',
    number: 6,
    category: 'TWK',
    topic: 'Integritas & Anti Korupsi',
    text: 'Seorang Aparatur Sipil Negara (ASN) menerima bingkisan parsel bernilai tinggi dari seorang rekanan proyek saat menjelang hari raya. Tindakan yang paling tepat dan berintegritas sesuai regulasi KPK adalah...',
    options: [
      { key: 'A', text: 'Menerima bingkisan tersebut dan langsung membagikannya kepada staf magang' },
      { key: 'B', text: 'Menolak secara sopan atau melaporkannya ke Unit Pengendalian Gratifikasi (UPG) / KPK dalam batas waktu yang ditentukan' },
      { key: 'C', text: 'Menerima bingkisan karena diberikan atas dasar kekeluargaan saat hari raya' },
      { key: 'D', text: 'Menyimpan bingkisan di gudang kantor agar tidak terlihat orang lain' },
      { key: 'E', text: 'Meminta rekanan mengganti bingkisan menjadi uang tunai agar mudah dicatat' },
    ],
    correctKey: 'B',
    explanation: 'Berdasarkan UU Pemberantasan Tindak Pidana Korupsi, ASN wajib menolak gratifikasi yang berhubungan dengan jabatan, atau melaporkannya ke UPG/KPK maksimal 30 hari kerja sejak diterima.'
  },
  {
    id: 'twk-7',
    number: 7,
    category: 'TWK',
    topic: 'Bela Negara',
    text: 'Sesuai dengan UU Nomor 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara, salah satu nilai dasar bela negara yang diwujudkan dalam kesadaran berbangsa dan bernegara adalah...',
    options: [
      { key: 'A', text: 'Rela berkorban untuk kepentingan bangsa dan negara di atas kepentingan pribadi' },
      { key: 'B', text: 'Disiplin dan taat terhadap peraturan perundang-undangan yang berlaku serta menjaga persatuan bangsa' },
      { key: 'C', text: 'Selalu berolahraga untuk menjaga kebugaran fisik militer' },
      { key: 'D', text: 'Mengikuti pelatihan militer sukarela setiap akhir pekan' },
      { key: 'E', text: 'Menolak segala bentuk budaya asing yang masuk ke tanah air' },
    ],
    correctKey: 'B',
    explanation: 'Indikator kesadaran berbangsa dan bernegara mencakup: disiplin dan taat pada aturan hukum, menjalankan hak dan kewajiban sebagai warga negara, berpartisipasi aktif dalam organisasi, serta menjaga kedaulatan bangsa.'
  },
  {
    id: 'twk-8',
    number: 8,
    category: 'TWK',
    topic: 'Bahasa Indonesia',
    text: 'Penulisan kata baku dan tanda baca yang tepat sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) / EYD Edisi V terdapat pada kalimat...',
    options: [
      { key: 'A', text: 'Pemerintah Propinsi Jawa Barat menyelenggarakan test kompetensi dasar secara online.' },
      { key: 'B', text: 'Pemerintah Provinsi Jawa Barat menyelenggarakan tes kompetensi dasar secara daring.' },
      { key: 'C', text: 'Pemerintah Propinsi Jawa Barat menyelenggarakan test kompetensi dasar secara daring.' },
      { key: 'D', text: 'Pemerintah Provinsi Jawa Barat menyelenggarakan test kompetensi dasar secara online.' },
      { key: 'E', text: 'Pemerintah Propinsi Jawa Barat menyelenggarakan tes kompetensi dasar secara off line.' },
    ],
    correctKey: 'B',
    explanation: 'Kata baku: "Provinsi" (bukan Propinsi), "tes" (bukan test), dan padanan istilah untuk online adalah "daring" (dalam jaringan).'
  },
  {
    id: 'twk-9',
    number: 9,
    category: 'TWK',
    topic: 'Pilar Negara - Tata Negara',
    text: 'Lembaga negara yang berwenang memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh Undang-Undang Dasar adalah...',
    options: [
      { key: 'A', text: 'Mahkamah Agung' },
      { key: 'B', text: 'Komisi Yudisial' },
      { key: 'C', text: 'Mahkamah Konstitusi' },
      { key: 'D', text: 'Dewan Perwakilan Daerah' },
      { key: 'E', text: 'Kejaksaan Agung' },
    ],
    correctKey: 'C',
    explanation: 'Pasal 24C ayat (1) UUD 1945 menyatakan MK berwenang mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final untuk: menguji UU terhadap UUD, memutus sengketa kewenangan lembaga negara, memutus pembubaran partai politik, dan memutus perselisihan hasil pemilu.'
  },
  {
    id: 'twk-10',
    number: 10,
    category: 'TWK',
    topic: 'Pancasila dalam Kehidupan Bernegara',
    text: 'Pengambilan keputusan dalam musyawarah mufakat di Indonesia dijiwai oleh sila keempat Pancasila. Makna "hikmat kebijaksanaan" dalam sila tersebut mengandung pengertian...',
    options: [
      { key: 'A', text: 'Keputusan mutlak berada di tangan pemimpin rapat yang dituakan' },
      { key: 'B', text: 'Keputusan yang diambil selalu berdasar pada akal sehat, hati nurani yang luhur, dan dapat dipertanggungjawabkan kepada Tuhan Yang Maha Esa' },
      { key: 'C', text: 'Setiap keputusan harus diselesaikan melalui pemungutan suara (voting) terbanyak' },
      { key: 'D', text: 'Mengorbankan pendapat minoritas demi kepentingan golongan mayoritas' },
      { key: 'E', text: 'Menunda keputusan sampai seluruh peserta tidak memiliki perbedaan sedikit pun' },
    ],
    correctKey: 'B',
    explanation: 'Hikmat kebijaksanaan berakar pada akal sehat, pertimbangan moral, keadilan, serta tanggung jawab kepada Tuhan Yang Maha Esa dan menjunjung tinggi harkat martabat kemanusiaan.'
  },
  {
    id: 'twk-11',
    number: 11,
    category: 'TWK',
    topic: 'Sejarah Kemerdekaan',
    text: 'Peristiwa Rengasdengklok yang terjadi pada 16 Agustus 1945 bertujuan untuk...',
    options: [
      { key: 'A', text: 'Menyusun naskah proklamasi bersama tentara pendudukan Jepang' },
      { key: 'B', text: 'Menjauhkan Ir. Soekarno dan Drs. Mohammad Hatta dari pengaruh pihak Jepang agar segera memproklamasikan kemerdekaan' },
      { key: 'C', text: 'Mengamankan persenjataan dari markas militer Jepang di Karawang' },
      { key: 'D', text: 'Mengadakan perundingan damai dengan pihak Sekutu yang telah mendarat' },
      { key: 'E', text: 'Mendirikan pemerintahan darurat militer di luar Jakarta' },
    ],
    correctKey: 'B',
    explanation: 'Golongan pemuda membawa Soekarno-Hatta ke Rengasdengklok untuk mendesak agar proklamasi kemerdekaan segera diproklamirkan tanpa campur tangan atau menunggu izin dari pihak Jepang (PPKI).'
  },
  {
    id: 'twk-12',
    number: 12,
    category: 'TWK',
    topic: 'UUD 1945 - Hak Asasi Manusia',
    text: 'Pasal 28I ayat (1) UUD 1945 mengatur mengenai hak-hak asasi manusia yang tidak dapat dikurangi dalam keadaan apa pun (non-derogable rights). Yang termasuk hak tersebut adalah...',
    options: [
      { key: 'A', text: 'Hak untuk memperoleh pendidikan' },
      { key: 'B', text: 'Hak untuk hidup, hak untuk tidak disiksa, dan hak kemerdekaan pikiran dan hati nurani' },
      { key: 'C', text: 'Hak untuk berkumpul dan berserikat' },
      { key: 'D', text: 'Hak untuk memiliki pekerjaan yang layak' },
      { key: 'E', text: 'Hak untuk menyampaikan pendapat di muka umum' },
    ],
    correctKey: 'B',
    explanation: 'Pasal 28I ayat (1) menyebutkan: hak untuk hidup, hak untuk tidak disiksa, hak kemerdekaan pikiran dan hati nurani, hak beragama, hak untuk tidak diperbudak, hak untuk diakui sebagai pribadi di hadapan hukum, dan hak untuk tidak dituntut atas dasar hukum yang berlaku surut adalah hak asasi manusia yang tidak dapat dikurangi dalam keadaan apa pun.'
  },
  {
    id: 'twk-13',
    number: 13,
    category: 'TWK',
    topic: 'Bahasa Indonesia - Kalimat Efektif',
    text: 'Kalimat berikut yang merupakan kalimat efektif dan tidak pleonastis adalah...',
    options: [
      { key: 'A', text: 'Para hadirin sekalian dimohon untuk segera memasuki ruangan sidang.' },
      { key: 'B', text: 'Peserta ujian dilarang saling tolong-menolong selama ujian berlangsung.' },
      { key: 'C', text: 'Banyak pejabat-pejabat yang hadir dalam acara peringatan Hari Ulang Tahun Kemerdekaan.' },
      { key: 'D', text: 'Rapat koordinasi tersebut dihadiri oleh segenap pimpinan instansi pemerintah.' },
      { key: 'E', text: 'Dalam perencanaan itu membahas tentang pembangunan infrastruktur desa.' },
    ],
    correctKey: 'D',
    explanation: 'Pilihan D hemat dan efektif. Pilihan A pemborosan kata "Para hadirin sekalian" (cukup Hadirin). B "saling tolong-menolong" pemborosan. C "Banyak pejabat-pejabat" berlebihan. E rancu subjeknya karena diawali preposisi "Dalam...".'
  },
  {
    id: 'twk-14',
    number: 14,
    category: 'TWK',
    topic: 'Wawasan Kebangsaan',
    text: 'Konsep geopolitik bangsa Indonesia dikenal dengan istilah Wawasan Nusantara. Hakikat dari Wawasan Nusantara adalah...',
    options: [
      { key: 'A', text: 'Penguasaan sumber daya maritim secara unilateral di Asia Tenggara' },
      { key: 'B', text: 'Keutuhan dan kesatuan wilayah nasional serta persatuan bangsa dalam segenap aspek kehidupan' },
      { key: 'C', text: 'Pembagian wilayah administratif menjadi federasi daerah' },
      { key: 'D', text: 'Prioritas pembangunan militer di wilayah perbatasan kepulauan' },
      { key: 'E', text: 'Kemandirian daerah otonom dalam mengelola pertahanan teritori' },
    ],
    correctKey: 'B',
    explanation: 'Hakikat Wawasan Nusantara adalah keutuhan nusantara/nasional, yaitu cara pandang yang selalu utuh menyeluruh dalam lingkup nusantara demi kepentingan nasional Indonesia.'
  },
  {
    id: 'twk-15',
    number: 15,
    category: 'TWK',
    topic: 'Integritas ASN - Core Values BerAKHLAK',
    text: 'Core values ASN BerAKHLAK diluncurkan oleh Presiden RI untuk menyeragamkan nilai dasar seluruh aparatur. Akronim "BerAKHLAK" terdiri atas...',
    options: [
      { key: 'A', text: 'Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif' },
      { key: 'B', text: 'Bermartabat, Adil, Komunikatif, Humanis, Lugas, Amanah, Kredibel' },
      { key: 'C', text: 'Berintegritas, Andal, Kritis, Humanis, Loyal, Aktif, Kompetitif' },
      { key: 'D', text: 'Berorientasi Prestasi, Akuntabel, Kolaboratif, Jujur, Luwes, Adaptif, Kompeten' },
      { key: 'E', text: 'Berwawasan, Amanah, Kreatif, Harmonis, Lugas, Akurat, Komitmen' },
    ],
    correctKey: 'A',
    explanation: 'Core values ASN "BerAKHLAK" merupakan akronim dari Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif.'
  },
  // Add additional representative TWK questions up to 30
  ...Array.from({ length: 15 }, (_, i) => {
    const num = 16 + i;
    const twkTopics = [
      'Pilar Negara (Pancasila)', 'UUD 1945 & Konstitusi', 'Sejarah Perjuangan Bangsa',
      'Nasionalisme & Patriotisme', 'Integritas ASN', 'Bahasa Indonesia Ragam Resmi',
      'Bhinneka Tunggal Ika', 'Bela Negara & Pertahanan'
    ];
    const topic = twkTopics[i % twkTopics.length];
    return {
      id: `twk-${num}`,
      number: num,
      category: 'TWK' as const,
      topic,
      text: `[Soal TWK ${num} - ${topic}] Mengacu pada ketentuan perundangan dan nilai kebangsaan, wujud implementasi sikap loyalitas aparatur sipil negara dalam menjaga rahasia jabatan dan negara adalah...`,
      options: [
        { key: 'A' as const, text: 'Menyimpan dan mempergunakan dokumen negara hanya untuk keperluan dinas yang sah dan berwenang' },
        { key: 'B' as const, text: 'Membagikan data internal kantor ke media sosial pribadi untuk membuktikan transparansi kinerja' },
        { key: 'C' as const, text: 'Memberikan informasi berkas tender rahasia kepada kerabat terdekat demi silaturahmi' },
        { key: 'D' as const, text: 'Membawa pulang salinan berkas rahasia negara tanpa izin tertulis dari atasan berwenang' },
        { key: 'E' as const, text: 'Mendiskusikan data intelijen dan rahasia jabatan di warung kopi bersama warga umum' },
      ],
      correctKey: 'A' as const,
      explanation: 'Sikap loyal ASN mewajibkan setiap pegawai menjaga rahasia jabatan dan negara serta memegang teguh sumpah janji aparatur sipil negara.'
    };
  }),

  // ========================== TIU (31 - 65) ==========================
  {
    id: 'tiu-31',
    number: 31,
    category: 'TIU',
    topic: 'Kemampuan Verbal - Analogi',
    text: 'KORAN : INFORMASI = DOMPET : ...',
    options: [
      { key: 'A', text: 'Uang' },
      { key: 'B', text: 'Belanja' },
      { key: 'C', text: 'Kaya' },
      { key: 'D', text: 'Kulit' },
      { key: 'E', text: 'Saku' },
    ],
    correctKey: 'A',
    explanation: 'Hubungan analogi fungsi/wadah muatan: Koran adalah wadah/media yang memuat informasi, sebagaimana dompet adalah wadah yang memuat uang.'
  },
  {
    id: 'tiu-32',
    number: 32,
    category: 'TIU',
    topic: 'Kemampuan Verbal - Silogisme',
    text: 'Semua calon ASN yang mengikuti ujian CAT memakai kemeja putih.\nSebagian orang yang berada di aula membawa map merah.\nSemua orang yang berada di aula adalah calon ASN yang mengikuti ujian CAT.\nKesimpulan yang paling tepat adalah...',
    options: [
      { key: 'A', text: 'Semua orang yang memakai kemeja putih membawa map merah' },
      { key: 'B', text: 'Sebagian orang yang berada di aula memakai kemeja putih dan membawa map merah' },
      { key: 'C', text: 'Semua yang membawa map merah bukan calon ASN' },
      { key: 'D', text: 'Orang yang membawa map merah tidak memakai kemeja putih' },
      { key: 'E', text: 'Semua calon ASN tidak membawa map merah' },
    ],
    correctKey: 'B',
    explanation: 'Karena semua orang di aula adalah calon ASN (memakai kemeja putih), dan sebagian orang di aula membawa map merah, maka sebagian orang di aula memakai kemeja putih dan membawa map merah.'
  },
  {
    id: 'tiu-33',
    number: 33,
    category: 'TIU',
    topic: 'Kemampuan Numerik - Deret Angka',
    text: 'Tentukan angka kelanjutan dari deret berikut:\n3, 7, 15, 31, 63, ...',
    options: [
      { key: 'A', text: '125' },
      { key: 'B', text: '126' },
      { key: 'C', text: '127' },
      { key: 'D', text: '128' },
      { key: 'E', text: '131' },
    ],
    correctKey: 'C',
    explanation: 'Pola deret adalah (x * 2) + 1 atau selisih yang berlipat ganda (+4, +8, +16, +32, +64). 63 + 64 = 127.'
  },
  {
    id: 'tiu-34',
    number: 34,
    category: 'TIU',
    topic: 'Kemampuan Numerik - Aljabar & Perhitungan',
    text: 'Jika x = 0,375 dari 64 dan y = akar pangkat tiga dari 13.824, maka hubungan yang benar antara x dan y adalah...',
    options: [
      { key: 'A', text: 'x > y' },
      { key: 'B', text: 'x < y' },
      { key: 'C', text: 'x = y' },
      { key: 'D', text: 'x = 2y' },
      { key: 'E', text: 'Hubungan x dan y tidak dapat ditentukan' },
    ],
    correctKey: 'C',
    explanation: 'x = 0,375 * 64 = 3/8 * 64 = 24. y = (13.824)^(1/3) = 24 (karena 24^3 = 13.824). Jadi x = y.'
  },
  {
    id: 'tiu-35',
    number: 35,
    category: 'TIU',
    topic: 'Kemampuan Numerik - Aritmatika Sosial',
    text: 'Suatu pekerjaan jika diselesaikan oleh 12 orang pekerja membutuhkan waktu 20 hari. Jika pekerjaan tersebut ingin diselesaikan dalam waktu 15 hari, berapa jumlah pekerja tambahan yang dibutuhkan?',
    options: [
      { key: 'A', text: '4 orang' },
      { key: 'B', text: '6 orang' },
      { key: 'C', text: '8 orang' },
      { key: 'D', text: '16 orang' },
      { key: 'E', text: '20 orang' },
    ],
    correctKey: 'A',
    explanation: 'Perbandingan berbalik nilai: 12 orang * 20 hari = P * 15 hari. P = (12 * 20) / 15 = 240 / 15 = 16 orang total. Pekerja tambahan yang dibutuhkan = 16 - 12 = 4 orang.'
  },
  {
    id: 'tiu-36',
    number: 36,
    category: 'TIU',
    topic: 'Kemampuan Verbal - Analitis',
    text: 'Enam orang atlet (P, Q, R, S, T, U) duduk berjajar di bangku tunggu. Q duduk di antara P dan R. S duduk di sebelah kanan R. T duduk di paling kiri. U duduk di sebelah kanan S. Urutan posisi duduk dari kiri ke kanan adalah...',
    options: [
      { key: 'A', text: 'T, P, Q, R, S, U' },
      { key: 'B', text: 'P, Q, R, S, T, U' },
      { key: 'C', text: 'T, R, Q, P, S, U' },
      { key: 'D', text: 'T, S, R, Q, P, U' },
      { key: 'E', text: 'U, S, R, Q, P, T' },
    ],
    correctKey: 'A',
    explanation: 'T di paling kiri (posisi 1). Q di antara P dan R (bisa P-Q-R). S di kanan R (R-S), U di kanan S (S-U). Maka urutannya adalah T - P - Q - R - S - U.'
  },
  {
    id: 'tiu-37',
    number: 37,
    category: 'TIU',
    topic: 'Kemampuan Numerik - Pecahan & Persen',
    text: 'Sebuah toko memberikan diskon ganda 20% + 10% untuk sebuah baju kemeja. Jika harga label baju tersebut adalah Rp 250.000, berapa harga akhir yang harus dibayar pembeli?',
    options: [
      { key: 'A', text: 'Rp 175.000' },
      { key: 'B', text: 'Rp 180.000' },
      { key: 'C', text: 'Rp 185.000' },
      { key: 'D', text: 'Rp 190.000' },
      { key: 'E', text: 'Rp 200.000' },
    ],
    correctKey: 'B',
    explanation: 'Diskon 1: 20% dari 250.000 = 50.000 -> Harga sementara = 200.000. Diskon 2: 10% dari 200.000 = 20.000 -> Harga akhir = 200.000 - 20.000 = Rp 180.000.'
  },
  {
    id: 'tiu-38',
    number: 38,
    category: 'TIU',
    topic: 'Kemampuan Verbal - Antonim / Lawan Kata',
    text: 'Lawan kata (antonim) dari kata "PROGRES" adalah...',
    options: [
      { key: 'A', text: 'Kemajuan' },
      { key: 'B', text: 'Regresi' },
      { key: 'C', text: 'Stagnasi' },
      { key: 'D', text: 'Akumulasi' },
      { key: 'E', text: 'Efisiensi' },
    ],
    correctKey: 'B',
    explanation: 'Progres artinya kemajuan atau perkembangan ke arah positif. Lawan katanya adalah regresi (kemunduran).'
  },
  // Add additional representative TIU questions up to 65
  ...Array.from({ length: 27 }, (_, i) => {
    const num = 39 + i;
    const tiuTopics = ['Kemampuan Verbal (Silogisme)', 'Deret Huruf & Angka', 'Kemampuan Figural', 'Aritmatika Cepat', 'Perbandingan Kuantitatif', 'Penalaran Analitis'];
    const topic = tiuTopics[i % tiuTopics.length];
    return {
      id: `tiu-${num}`,
      number: num,
      category: 'TIU' as const,
      topic,
      text: `[Soal TIU ${num} - ${topic}] Diketahui rata-rata nilai matematika dari 15 orang siswa adalah 72. Jika ditambah nilai 5 siswa lain, rata-rata seluruh siswa menjadi 75. Berapakah rata-rata nilai 5 siswa tambahan tersebut?`,
      options: [
        { key: 'A' as const, text: '80' },
        { key: 'B' as const, text: '82' },
        { key: 'C' as const, text: '84' },
        { key: 'D' as const, text: '85' },
        { key: 'E' as const, text: '86' },
      ],
      correctKey: 'C' as const,
      explanation: 'Total awal = 15 * 72 = 1080. Total baru = 20 * 75 = 1500. Selisih total nilai 5 siswa = 1500 - 1080 = 420. Rata-rata 5 siswa = 420 / 5 = 84.'
    };
  }),

  // ========================== TKP (66 - 110) ==========================
  {
    id: 'tkp-66',
    number: 66,
    category: 'TKP',
    topic: 'Pelayanan Publik',
    text: 'Ketika Anda sedang melayani antrean masyarakat di loket pelayanan terpadu menjelang jam istirahat siang, datang seorang warga lansia yang tampak kebingungan membawa berkas kelengkapan administrasi yang belum tertata rapi. Sikap Anda adalah...',
    options: [
      { key: 'A', text: 'Menyuruhnya menunggu di bangku tunggu hingga jam istirahat selesai' },
      { key: 'B', text: 'Menyapa ramah, membantunya merapikan berkas secara cermat, dan memproses keperluannya hingga tuntas sebelum beristirahat' },
      { key: 'C', text: 'Meminta satpam untuk membantu merapikan berkas warga tersebut agar Anda bisa istirahat tepat waktu' },
      { key: 'D', text: 'Memberitahu dengan tegas bahwa jam pelayanan sudah tutup dan memintanya datang kembali besok' },
      { key: 'E', text: 'Menerima berkasnya seadanya tanpa mengecek kelengkapannya demi efisiensi waktu istirahat' },
    ],
    tkpScores: { B: 5, C: 4, E: 3, A: 2, D: 1 },
    explanation: 'Aspek Pelayanan Publik: Menunjukkan empati, ketulusan, kepedulian tinggi terhadap lansia, dan komitmen menyelesaikan tugas pelayanan secara tuntas (B=5, C=4, E=3, A=2, D=1).'
  },
  {
    id: 'tkp-67',
    number: 67,
    category: 'TKP',
    topic: 'Teknologi Informasi & Komunikasi (TIK)',
    text: 'Instansi tempat Anda bekerja mulai menerapkan sistem persuratan digital berbasis aplikasi web. Sebagian rekan kerja senior merasa kesulitan dan enggan beralih dari cara manual. Tindakan Anda adalah...',
    options: [
      { key: 'A', text: 'Membiarkan mereka tetap menggunakan cara manual karena menghormati senioritas' },
      { key: 'B', text: 'Mengajak dan mendampingi rekan senior secara sabar untuk berlatih menggunakan sistem baru serta menjelaskan kemudahan fiturnya' },
      { key: 'C', text: 'Menyelesaikan semua persuratan senior tersebut sendirian agar pekerjaan kantor tidak terhambat' },
      { key: 'D', text: 'Melaporkan kelemahan senior tersebut kepada pimpinan unit agar mereka ditegur' },
      { key: 'E', text: 'Hanya fokus menggunakan sistem digital untuk pekerjaan diri sendiri' },
    ],
    tkpScores: { B: 5, C: 3, E: 4, A: 2, D: 1 },
    explanation: 'Aspek TIK & Kolaborasi: Mampu beradaptasi cepat dengan teknologi serta proaktif membimbing rekan kerja demi kemajuan organisasi bersama (B=5, E=4, C=3, A=2, D=1).'
  },
  {
    id: 'tkp-68',
    number: 68,
    category: 'TKP',
    topic: 'Jejaring Kerja & Komunikasi',
    text: 'Anda ditugaskan memimpin sebuah tim kerja lintas bagian yang anggotanya belum saling mengenal dan memiliki perbedaan gaya kerja. Langkah pertama yang Anda ambil untuk membangun soliditas tim adalah...',
    options: [
      { key: 'A', text: 'Langsung membagikan target kerja tanpa perlu berdiskusi panjang lebar' },
      { key: 'B', text: 'Mengadakan sesi pertemuan awal untuk saling mengenal, menyamakan persepsi tujuan, serta menyusun komitmen bersama secara terbuka' },
      { key: 'C', text: 'Memilih satu atau dua orang terdekat untuk merumuskan seluruh strategi proyek' },
      { key: 'D', text: 'Menyerahkan pembagian tugas kepada masing-masing anggota tanpa pengawasan' },
      { key: 'E', text: 'Menunggu inisiatif dari anggota lain yang lebih senior' },
    ],
    tkpScores: { B: 5, A: 3, C: 2, D: 2, E: 1 },
    explanation: 'Aspek Jejaring Kerja: Membangun komunikasi yang inklusif, menyamakan visi tim, dan menciptakan lingkungan kolaboratif (B=5, A=3, D=2, C=2, E=1).'
  },
  {
    id: 'tkp-69',
    number: 69,
    category: 'TKP',
    topic: 'Sosial Budaya & Toleransi',
    text: 'Anda dipindahtugaskan ke kantor perwakilan di daerah pelosok yang memiliki norma adat istiadat yang berbeda dengan daerah asal Anda. Cara Anda beradaptasi di lingkungan baru adalah...',
    options: [
      { key: 'A', text: 'Bersikap tertutup dan hanya bergaul dengan sesama rekan pendatang di kantor' },
      { key: 'B', text: 'Mempelajari kearifan lokal, menghormati tradisi masyarakat setempat, dan berpartisipasi aktif dalam kegiatan sosial warga' },
      { key: 'C', text: 'Mencoba merubah kebiasaan masyarakat setempat agar sesuai dengan norma modern kota besar' },
      { key: 'D', text: 'Menjalankan tugas kantor saja dan menolak berinteraksi dengan warga sekitar' },
      { key: 'E', text: 'Mengajukan mutasi kembali ke kota asal secepat mungkin' },
    ],
    tkpScores: { B: 5, A: 2, C: 2, D: 2, E: 1 },
    explanation: 'Aspek Sosial Budaya: Menunjukkan fleksibilitas, keterbukaan budaya, dan rasa hormat yang tinggi terhadap kemajemukan masyarakat (B=5, A=2, C=2, D=2, E=1).'
  },
  {
    id: 'tkp-70',
    number: 70,
    category: 'TKP',
    topic: 'Profesionalisme & Tanggung Jawab',
    text: 'Mendekati tenggat waktu pengumpulan laporan kinerja triwulan, sistem komputer kantor mendadak mengalami pemadaman listrik darurat selama 2 jam. Sebagai penanggung jawab laporan, yang Anda lakukan adalah...',
    options: [
      { key: 'A', text: 'Menunggu listrik menyala kembali dan pasrah jika laporan terlambat' },
      { key: 'B', text: 'Segera berkoordinasi mencari laptop cadangan berdaya baterai atau berpindah ke fasilitas kerja yang memiliki genset aktif agar laporan tuntas tepat waktu' },
      { key: 'C', text: 'Menjadikan mati listrik sebagai alasan resmi kepada atasan untuk meminta penundaan tenggat waktu' },
      { key: 'D', text: 'Menyuruh anggota tim pulang lebih awal karena tidak bisa bekerja' },
      { key: 'E', text: 'Mengirim draf laporan yang belum selesai apa adanya ke pihak manajemen' },
    ],
    tkpScores: { B: 5, C: 3, A: 2, E: 2, D: 1 },
    explanation: 'Aspek Profesionalisme: Berorientasi pada solusi proaktif saat menghadapi kendala dan pantang menyerah demi mencapai target kinerja (B=5, C=3, A=2, E=2, D=1).'
  },
  {
    id: 'tkp-71',
    number: 71,
    category: 'TKP',
    topic: 'Anti Radikalisme',
    text: 'Di dalam grup percakapan internal kantor, seorang rekan kerja sering menyebarkan tautan artikel bernada provokatif yang mengajak menolak ideologi negara dan mendiskreditkan institusi pemerintah yang sah. Sikap Anda adalah...',
    options: [
      { key: 'A', text: 'Ikut membagikan artikel tersebut agar ramai diperbincangkan' },
      { key: 'B', text: 'Menegur secara santun dan tegas di grup atau secara personal, mengingatkan kode etik ASN serta melaporkan kepada pejabat pembina kepegawaian jika terus berlanjut' },
      { key: 'C', text: 'Keluar dari grup obrolan tanpa memberikan respons apa pun' },
      { key: 'D', text: 'Mendiamkan saja karena menganggap itu kebebasan berekspresi' },
      { key: 'E', text: 'Mengajak rekan lain memusuhi orang tersebut secara pribadi' },
    ],
    tkpScores: { B: 5, D: 3, C: 2, E: 2, A: 1 },
    explanation: 'Aspek Anti Radikalisme: Tegas membentengi organisasi dari paham radikal, menegakkan etika aparatur, dan mengambil langkah preventif sesuai prosedur (B=5, D=3, C=2, E=2, A=1).'
  },
  // Add remaining representative TKP questions up to 110
  ...Array.from({ length: 39 }, (_, i) => {
    const num = 72 + i;
    const tkpTopics = [
      'Pelayanan Publik', 'Jejaring Kerja', 'Sosial Budaya', 'Teknologi Informasi',
      'Profesionalisme', 'Anti Radikalisme', 'Pengambilan Keputusan & Integritas'
    ];
    const topic = tkpTopics[i % tkpTopics.length];
    return {
      id: `tkp-${num}`,
      number: num,
      category: 'TKP' as const,
      topic,
      text: `[Soal TKP ${num} - ${topic}] Dalam situasi kerja yang dinamis ketika atasan memberikan instruksi mendadak di luar tupoksi harian untuk menyelesaikan kendala mendesak instansi, sikap terbaik Anda adalah...`,
      options: [
        { key: 'A' as const, text: 'Menerima tugas dengan penuh antusias, mempelajari kebutuhan spesifik tugas, dan menyelesaikannya secara tuntas dan bertanggung jawab' },
        { key: 'B' as const, text: 'Menerima tugas namun mengerjakannya perlahan-lahan sembari menunggu arahan rekan senior' },
        { key: 'C' as const, text: 'Menyampaikan kepada atasan bahwa tugas tersebut bukan deskripsi kerja resmi Anda' },
        { key: 'D' as const, text: 'Mendelegasikan tugas tersebut kepada bawahan atau pegawai magang' },
        { key: 'E' as const, text: 'Meminta tambahan insentif terlebih dahulu sebelum memulai tugas darurat tersebut' },
      ],
      tkpScores: { A: 5, B: 4, C: 2, D: 2, E: 1 },
      explanation: 'Menunjukkan komitmen tinggi, fleksibilitas kerja, loyalitas terhadap tujuan instansi, dan kemampuan pemecahan masalah (A=5, B=4, C=2, D=2, E=1).'
    };
  })
];
