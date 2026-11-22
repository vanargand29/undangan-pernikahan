import { invitation } from "../content/invitation.js";

export default function InvitationContent() {
  return (
    <>
      <header className="invitation-header">
        <a href="#awal" className="wordmark">{invitation.bride.shortName} <span>&amp;</span> {invitation.groom.shortName}</a>
        <nav aria-label="Navigasi undangan">
          <a href="#acara">Acara</a>
          <a href="#rsvp">Kehadiran</a>
          <a href="#ucapan">Ucapan</a>
          <a href="#hadiah">Hadiah</a>
        </nav>
      </header>

      <section className="opening section" id="awal" aria-labelledby="opening-title">
        <p className="eyebrow">Dengan penuh rasa syukur</p>
        <h1 id="opening-title">Kepada keluarga<br />dan sahabat</h1>
        <div className="flourish" aria-hidden="true"><span>✳</span></div>
        <p className="opening__copy">
          Dengan memohon rahmat dan berkah Tuhan Yang Maha Esa, kami mengundang Anda
          untuk menyaksikan dan merayakan hari pernikahan kami. Kehadiran dan doa
          restu Anda akan menjadi kebahagiaan bagi kami.
        </p>
        <div className="opening__couple">
          <article>
            <h3>{invitation.bride.name}</h3>
            <p>{invitation.bride.parents}</p>
          </article>
          <span className="opening__amp" aria-hidden="true">&amp;</span>
          <article>
            <h3>{invitation.groom.name}</h3>
            <p>{invitation.groom.parents}</p>
          </article>
        </div>
        <p className="placeholder-note">Nama dan keluarga di atas masih contoh. Ganti sebelum undangan dibagikan.</p>
      </section>

      <section className="event section" id="acara" aria-labelledby="event-title">
        <div className="section-heading">
          <p className="eyebrow">Hari yang kami nantikan</p>
          <h2 id="event-title">Simpan tanggalnya</h2>
          <p>{invitation.date}</p>
        </div>
        <div className="event__grid">
          <article className="event-card">
            <span className="event-card__number">01</span>
            <p className="eyebrow">Pagi hari</p>
            <h3>Akad Nikah</h3>
            <p>09.00 WIB sampai selesai</p>
            <p>Masjid Alun-Alun Contoh<br />Bandung, Jawa Barat</p>
          </article>
          <article className="event-card event-card--accent">
            <span className="event-card__number">02</span>
            <p className="eyebrow">Siang hari</p>
            <h3>Resepsi</h3>
            <p>11.00 sampai 14.00 WIB</p>
            <p>{invitation.venue}<br />{invitation.address}</p>
          </article>
        </div>
        <p className="placeholder-note">Tanggal, waktu, dan alamat di atas masih contoh.</p>
        <a className="text-link" href={invitation.mapUrl} target="_blank" rel="noreferrer">
          Buka lokasi di peta <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
