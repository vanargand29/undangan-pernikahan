# Undangan Pernikahan

Undangan React dengan server Node. RSVP disimpan di `data/rsvps.json` dan ucapan di `data/wishes.json` setelah tamu mengirim form.

## Menjalankan lokal

```sh
npm install
npm run dev
```

Buka alamat Vite yang tampil di terminal. API Node berjalan di port 3001.

Untuk membuat versi produksi jalankan `npm run build`, lalu `npm start`. Server melayani halaman hasil build dan menerima kiriman form.

## Data dan hosting

File JSON dibuat saat kiriman pertama kali masuk dan tidak masuk Git. Jangan memindahkannya ke folder `public` atau `dist`. Untuk penggunaan online, jalankan server Node pada hosting dengan disk persisten dan set `HOST=0.0.0.0`. Serverless atau disk sementara dapat menghapus data saat deploy atau restart. Penyimpanan ini cocok untuk satu server dan volume undangan kecil.

## Konten yang perlu diganti

Nama pasangan, detail keluarga/acara, rekening atau QR, foto pasangan, dan file lagu masih memakai contoh atau placeholder. Letakkan file lagu di `public/audio/wedding-song.mp3`, lalu ubah `audioAvailable` menjadi `true` di `src/content/invitation.js`.
