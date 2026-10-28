# Audit Performa, Animasi & UX

Tanggal: 29 Oktober 2026
Cakupan: kecepatan tampilan pertama, perpindahan halaman, animasi, dan stabilitas visual. Desain/layout **tidak** diubah.

---

## Ringkasan

| Hal | Sebelum | Sesudah |
|---|---|---|
| Pindah halaman sampai konten baru terlihat (CPU 4x) | 415–590 ms | 234–351 ms |
| Spinner/loading saat pindah halaman | – | tidak pernah muncul (diverifikasi) |
| Halaman lama "meluncur" scroll ke atas saat transisi | ya | tidak |
| `/about` dari Contact | blank ~0,5 s (transisi dobel) | satu transisi, 296 ms |
| Font final siap (slow 4G) | ~5,7 s (Google Fonts) | ~2,0 s (self-host) |
| Pergeseran layout saat font berganti (CLS) | ada (judul & paragraf loncat) | 0,000 |
| Event `load` (slow 4G) | 8,1 s | 1,4 s |
| Total transfer halaman home | 317 KB | 254 KB |
| Screenshot project | 2,4–5,3 MB per file | 30–70 KB per file |
| Scan sertifikat | 290–706 KB | 62–99 KB |
| Scroll (mobile, CPU 4x) | – | 60 fps, 0% frame > 34 ms |
| Animasi list Projects/Certifications | tidak jalan | stagger jalan |
| Section About setelah pindah ke Home | kadang tidak muncul sampai di-scroll | langsung animasi bersama header |

Catatan jujur: waktu sampai **judul pertama** (h1) muncul saat load awal di slow 4G tetap di kisaran **1,4–1,5 s**, sama seperti sebelumnya (selisih masih dalam noise ±100 ms antar sesi). Untuk SPA, angka ini dibatasi oleh ~150 KB JS (gzip) yang harus diunduh dan dijalankan sebelum apa pun bisa dirender. Cara memangkasnya secara signifikan ada di bagian *Peningkatan berikutnya* (prerender).

---

## Cara pengujian

Semua tes dijalankan otomatis di Chromium headless via Chrome DevTools Protocol terhadap **build production** (`vite build` + `vite preview`), plus server HTTP/2 lokal untuk meniru Vercel. Bug yang kamu laporkan juga direproduksi di **dev server** (`npm run dev`).

- **Kondisi lambat:** jaringan "Slow 4G" (1,6 Mbps, RTT 150 ms) + CPU diperlambat 4x, viewport mobile 390×844. Median dari 3–5 run.
- **Metrik load:** FCP, waktu h1 muncul, waktu font web siap, LCP, CLS, long tasks, ukuran transfer per resource.
- **Navigasi:** klik link antar halaman, rekam per frame posisi scroll, opacity halaman, kapan judul halaman baru muncul, dan apakah spinner pernah tampil.
- **Animasi:** hook `Element.prototype.animate` untuk memastikan framer-motion benar-benar menjalankan keyframe `opacity: [0, 1]` (bukan no-op `[1, 1]`), plus rekaman opacity per frame.
- **Kedipan:** rekaman screencast frame yang benar-benar di-paint + kecerahan rata-rata area konten per frame.
- **Rendering:** CPU profile dengan sourcemap + trace timeline (style, layout, paint, raster).
- **Fungsional:** semua route dibuka langsung (deep link): error console, request 4xx, gambar rusak, posisi scroll untuk link ber-hash.
- **Bug About:** matriks viewport 1280×680, 1366×657, 1440×760, 1536×730, 1920×960 × (klik Home, tombol Back browser).

---

## Temuan & keputusan

### 1. Animasi "hilang" — akar masalah `initial={false}`
`<AnimatePresence initial={false}>` di `App.jsx` ternyata merambat ke **semua** motion component di dalamnya: header, reveal section, dan list. Dibuktikan dengan hook `animate()`: keyframe-nya `[1, 1]` (tidak bergerak). Prop dihapus; keyframe kembali `[0, 1]`.

Hal yang sama ada di list Projects dan Certifications (`AnimatePresence initial={false}` per halaman), sehingga stagger item hanya jalan saat filter diganti. Dihapus juga.

Wrapper halaman di `App.jsx` sekarang hanya fade (tanpa geser vertikal) supaya gerakan tidak dobel dengan animasi elemen di dalamnya (penyebab kesan "clunky").

### 2. Pindah halaman tanpa loading
- Halaman selain Home dipisah jadi chunk sendiri (1–6 KB gzip), lalu **di-prefetch saat browser idle** setelah Home tampil.
- Dipakai helper `preloadable` (bukan `React.lazy` biasa): kalau chunk sudah ter-prefetch, komponen dirender langsung tanpa suspend. `React.lazy` biasa tetap suspend satu kali walau modulnya sudah di-cache, sehingga fallback sempat berkedip.
- Fallback `Suspense` tetap ada sebagai jaring pengaman (deep link di jaringan lambat), tapi spinner baru terlihat kalau loading > 400 ms. Di semua tes, spinner tidak pernah muncul.

### 3. Transisi & scroll
- **Glitch:** `scrollTo({ behavior: "auto" })` + `html { scroll-behavior: smooth }` membuat halaman lama di-scroll pelan ke atas selama transisi (terlihat "meluncur").
- **Keputusan:** reset scroll dipindah ke `onExitComplete` dengan `behavior: "instant"`, saat halaman lama sudah tidak terlihat. Durasi exit dipersingkat ke 120 ms (opacity saja).
- Scroll ke `#hash` lintas halaman dijalankan setelah halaman baru ter-mount. Sebelumnya bisa nyasar ke elemen ber-id sama di halaman lama (misalnya `#jcc` ada di Home dan di Projects).
- `/about` memakai key animasi yang sama dengan `/`, jadi redirect ke `/#about` tidak memicu transisi kedua.

### 4. Bug About tidak muncul setelah kembali ke Home
- **Penyebab:** reveal on-scroll (`whileInView`) dengan `margin: "-40px"`. Di viewport pendek, About sudah mengintip di bawah layar, tapi belum dianggap "terlihat", jadi tetap opacity 0 sampai di-scroll. Tereproduksi di 1280×680 dan 1366×657.
- **Keputusan:** About dianimasikan saat mount (seperti header profil, lewat prop `immediate` di `Section`). Section lain tetap reveal on-scroll, tapi tanpa margin negatif: 1 px terlihat sudah cukup untuk memicunya.
- Terverifikasi di 5 ukuran viewport × (klik Home, tombol Back), di dev dan production.

### 5. Font
- Google Fonts diganti **font self-host** (`public/fonts`, subset latin, total ~84 KB). Ini menghapus 2 origin eksternal dan CSS yang memblokir render.
- **Preload font sengaja TIDAK dipakai.** Diukur 6 varian (preload semua, sebagian, prioritas rendah, tanpa preload; HTTP/1.1 dan HTTP/2). Preload font selalu menunda tampilan pertama ~170 ms karena berebut bandwidth dengan JS.
- Supaya pergantian font tidak membuat konten loncat, ditambahkan **fallback font dengan metrik yang disamakan** (`size-adjust`, `ascent-override`, dll.) terhadap Arial dan Times New Roman. Nilainya dihitung dari file font asli.
- `max-w-[65ch]` dan sejenisnya diganti ke `em` setara. Satuan `ch` bergantung pada lebar glyph "0", sehingga lebar paragraf About berubah 607 → 744 px saat font berganti. Dengan font asli, lebarnya sama persis seperti sebelumnya.
- **Hasil:** CLS 0,000. Tinggi halaman desktop identik antara font fallback dan font asli. Di mobile tersisa selisih satu baris di section Projects dan Interests (jauh di bawah layar).

### 6. Gambar
- Dibuat versi **WebP** dengan resolusi sesuai ukuran tampil: screenshot project 1280 px, scan sertifikat 1600 px, foto profil 320 px, logo 128 px. File asli **tidak dihapus**, hanya tidak dipakai lagi.
- Foto profil (elemen LCP) di-preload dengan `fetchpriority="high"` supaya muncul bersamaan dengan teks, tidak menyusul belakangan.
- Favicon diganti PNG 64 px (6,5 KB). Sebelumnya favicon memakai foto 500 px (35 KB).
- Logo kecil di bawah layar memakai `loading="lazy"`.

### 7. Kedipan saat kembali ke halaman
- Kartu Featured fetch ulang ke GitHub API setiap kali Home dibuka, dan judulnya berubah setelah data datang. Sekarang di-cache per sesi; fetch juga terkena rate limit GitHub (60 request/jam).
- Komponen `Img` selalu menampilkan shimmer + fade 500 ms walau gambarnya sudah ter-cache. Sekarang gambar yang sudah pernah tampil langsung muncul.

### 8. Build & dev server
- Vendor dipisah jadi chunk `react` dan `motion`. Diukur **netral** untuk load pertama, tapi pengunjung lama tidak perlu mengunduh ulang library setiap kali konten berubah.
- `server.warmup` dan `optimizeDeps` di `vite.config.js` mempercepat load pertama di `npm run dev`.
- Catatan: mode dev memang lebih lambat dari production (modul tidak di-bundle, dan StrictMode me-mount komponen dua kali). Blank 2–3 detik saat refresh di dev bukan representasi production.

### 9. Aksesibilitas
- `<MotionConfig reducedMotion="user">`: animasi framer-motion menghormati setelan "kurangi gerakan" dari OS.

### Yang diperiksa tapi sengaja TIDAK diubah
- **Backdrop blur di navbar & grain overlay:** scroll tetap 60 fps dengan atau tanpa efek ini, jadi desain dipertahankan.
- **Kedipan 1 frame di akhir animasi:** sempat terdeteksi dari bacaan JS, tapi rekaman frame yang benar-benar di-paint menunjukkan kurva mulus. Itu artefak urutan callback, bukan kedipan nyata.
- **`LazyMotion` (framer-motion versi ringan):** hemat ~20 KB gzip tapi harus mengganti semua `motion.*` di seluruh komponen. Risikonya tidak sebanding untuk saat ini.

---

## File yang diubah (audit ini)
`index.html`, `vite.config.js`, `tailwind.config.js`, `src/global.css`, `src/App.jsx`, `src/lib/motion.js`, `src/components/ui/Section.jsx`, `src/components/ui/Img.jsx`, `src/components/profile/{AboutSection,FeaturedSection,ProfileHeader,ProjectItem,ListSections}.jsx`, `src/components/CertificationLogo.jsx`, `src/components/layout/SubPageHeader.jsx`, `src/pages/{ProjectsPage,CertificationsPage,CertificationDetailPage}.jsx`, `src/data/{projects,certifications,profile}.js`.

File baru: `public/fonts/*.woff2`, `public/images/**/*.webp`, `public/images/favicon.png`.

---

## Peningkatan berikutnya (urut dari dampak terbesar)

1. **Prerender halaman Home (SSG).** Saat ini HTML kosong sampai JS ~150 KB selesai dijalankan. Dengan prerender, misalnya mode prerender React Router v7 atau `vite-plugin-ssr`/`vike`, konten Home sudah ada di HTML sehingga tampil sebelum JS. Ini satu-satunya cara memangkas waktu tampilan pertama secara drastis (estimasi 1,5 s → ~0,6 s di slow 4G).
2. **Hapus gambar asli yang tidak terpakai** di `public/images` (~15 MB PNG/JPEG). Saat ini masih ikut ter-deploy dan memperbesar repo. Simpan di luar repo kalau masih dibutuhkan.
3. **Data GitHub saat build, bukan saat runtime.** Featured masih memanggil API GitHub dari browser setiap sesi (rate limit 60/jam per IP). Bisa di-fetch sekali saat build dan disimpan sebagai data statis.
4. **Kurangi biaya mount Home** (~170 ms di CPU 4x, mayoritas style/layout). Opsi: `content-visibility: auto` untuk section jauh di bawah layar, atau hapus `layout` animation di list Skills kalau tidak penting.
5. **`LazyMotion` + `m.*`** untuk memangkas ~20 KB gzip dari framer-motion.
6. **Kembalikan posisi scroll saat tombol Back** (sekarang selalu ke atas). Bisa simpan posisi per `location.key`.
7. **Fallback font untuk Android.** Android tidak punya Arial/Times, jadi fallback bermetrik tidak aktif di sana. Bisa ditambah `local("Roboto")` dan `local("Noto Serif")` dengan nilai sendiri.
8. **Pause `CoverTerminal`** saat tidak terlihat (di mobile ia tersembunyi tapi timer tetap jalan).
9. **Bersih-bersih:** route sementara `/__currently` (`CurrentlyVariants`) masih ada; 2 error lint lama (`navItems` di `SiteFooter.jsx`, `school` di `ProfileHeader.jsx`).
