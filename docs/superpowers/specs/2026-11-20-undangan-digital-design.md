# Rancangan: Undangan Pernikahan Digital React

## Tujuan

Membuat undangan pernikahan digital berbahasa Indonesia yang dibuka dari sampul animasi, terasa hangat dan personal, serta menyimpan RSVP dan ucapan tamu di file proyek.

## Pengguna

- Tamu membuka undangan melalui ponsel, membaca acara, lalu mengirim RSVP atau ucapan.
- Pasangan membuka file JSON di folder `data` untuk melihat RSVP dan ucapan. Tidak ada dasbor admin khusus di halaman undangan.

## Cakupan

- React SPA responsif, dengan prioritas ponsel.
- Sampul berisi “Undangan Pernikahan” dan tombol “Buka Undangan”; klik membuka isi dengan transisi halus.
- Isi undangan mencakup surat, mempelai, tanggal, jadwal, lokasi, konfirmasi kehadiran, ucapan, hadiah, dan musik.
- Form RSVP: nama, nomor WhatsApp, kehadiran (Hadir / Tidak Hadir), serta jumlah orang yang muncul dan wajib diisi jika memilih Hadir.
- Form ucapan: nama, alamat, dan ucapan.
- Semua field form yang diminta wajib diisi; nama maksimal 100 karakter, alamat 200 karakter, ucapan 1.000 karakter.
- Nomor menerima angka, spasi, tanda hubung, kurung, dan tanda `+`; tanda baca dibersihkan saat disimpan, kode negara dan angka awalan tetap dipertahankan, dan nomor harus memiliki 7 sampai 15 digit.
- Jumlah orang saat hadir berupa bilangan bulat 1 sampai 50. Saat tidak hadir, nilai jumlah orang disimpan `null`.
- RSVP dan ucapan dikirim ke API lokal dan disimpan di `data/rsvps.json` serta `data/wishes.json`; form menampilkan status berhasil atau gagal.
- Hadiah menampilkan detail rekening dan/atau QR dengan tombol salin setelah datanya tersedia.
- Pemutar musik memiliki kontrol putar/jeda. Pemutaran baru dicoba setelah interaksi pengguna membuka undangan; pengguna selalu dapat menjedanya.
- Semua form dan data tamu tetap privat dari pengunjung. Pengunjung dapat mengirim, tetapi tidak dapat membaca kiriman tamu lain.

## Bukan tujuan

- Membangun akun tamu, tautan pribadi per tamu, atau dasbor admin.
- Menampilkan daftar RSVP atau ucapan yang dikirim tamu kepada publik.
- Mengirim pesan WhatsApp otomatis.
- Membuat atau mengunggah audio, foto pasangan, QR, dan detail rekening yang belum diberikan.

## Pendekatan

1. **React + Vite + server Node dan file JSON (dipilih):** React menangani tampilan; server Node menerima dan memvalidasi POST lalu menulis data ke dua file lokal. Data mudah dibaca dan tidak memerlukan akun layanan database.
2. **React + Vite + Supabase:** menyimpan data di database hosted yang mudah diakses dari mana pun, tetapi memerlukan project dan kredensial layanan yang pengguna tidak inginkan.

Pengguna memilih penyimpanan file di proyek, menggantikan usulan Supabase. Server tidak menyediakan endpoint baca publik.

## Arah visual dan interaksi

- Pertahankan tema foto pernikahan romantis, warna hangat, tipografi editorial, serta ornamen tipis dari rancangan awal.
- Sampul menjadi pintu masuk utama. Tombol membuka undangan dengan gerak keluar/masuk yang singkat; hormati `prefers-reduced-motion`.
- Bagian RSVP, ucapan, hadiah, dan musik mengikuti contoh yang diberikan pengguna sejauh halaman Seri Kesuma dapat diperiksa. Tautan spesifik contoh tidak dapat dibuka oleh alat penelusuran; katalog umumnya saja yang terlihat.
- Foto, pasangan, acara, rekening, QR, dan lagu yang belum diberikan memakai placeholder yang jelas dan tidak berpura-pura sebagai data sebenarnya.

## Data dan keamanan

- File `data/rsvps.json` menyimpan entri `{id, name, whatsapp, attendance, guestCount, createdAt}`; `guestCount` bernilai `null` bila tamu tidak hadir.
- File `data/wishes.json` menyimpan entri `{id, name, address, message, createdAt}`.
- Server Node menerima hanya POST untuk menambahkan kiriman; tidak ada endpoint publik untuk membaca file atau daftar tamu.
- Validasi dilakukan di server sebelum penulisan: field wajib, panjang teks, format nomor WhatsApp, pilihan hadir, dan jumlah tamu minimal satu saat hadir.
- File JSON berada di luar aset statis dan data sebenarnya diabaikan Git agar nomor WhatsApp dan alamat tidak ikut terunggah ke repository.
- Penulisan ke tiap file diserialkan dan dilakukan secara atomik agar kiriman berdekatan tidak saling menimpa atau meninggalkan JSON rusak.
- Batas panjang dan bentuk nomor di atas adalah keputusan implementasi sementara; ubah bila detail acara memerlukan rentang lain.
- Form bersifat publik, sehingga kiriman spam tetap mungkin. Batasan server menolak input tak valid; mitigasi rate-limit/CAPTCHA tidak masuk cakupan awal.

## Batasan dan asumsi

- Stack belum ada di workspace; gunakan Vite dengan template React dan server Node kecil.
- Di komputer pengembangan, file tersimpan di workspace ini. Saat di-host online, proses Node dan folder data harus berada pada host dengan disk persisten; hosting serverless atau disk sementara dapat menghilangkan data setelah restart/deploy.
- File JSON mudah diperiksa untuk volume kecil dan satu proses Node, tetapi tidak dirancang untuk beberapa server instance atau volume besar; pindah ke database bila skala penggunaan meningkat.
- Nomor, tanggal, lokasi, foto, detail bank/QR, dan audio final belum diberikan. Gunakan placeholder yang nyata-nyata berlabel sampai diganti.
- File lagu akan disediakan pada `public/audio/wedding-song.mp3`; tanpa file tersebut, kontrol musik menjelaskan bahwa audio belum tersedia dan tidak berpura-pura dapat diputar.

## Keputusan yang diserahkan kepada implementer

- Detail komponen dan nama file di dalam aplikasi.
- Microcopy status form yang jelas, ramah, dan berbahasa Indonesia.
- Cara menampilkan field jumlah tamu saat Hadir dipilih serta menyembunyikannya saat Tidak Hadir.
- Penanganan kegagalan audio yang tidak menghalangi pembukaan undangan.

## Builder check

- Pilihan format WhatsApp diselesaikan dengan menerima format umum dan membersihkan tanda baca tanpa mengubah kode negara atau angka awalan.
- Semua field ucapan dibuat wajib karena pengguna menyebut ketiganya sebagai bagian form; batas karakter ditetapkan di atas dan diberlakukan di browser serta server.
