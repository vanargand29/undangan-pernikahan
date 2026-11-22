import { useState } from "react";

export default function GiftSection({ gift }) {
  const [message, setMessage] = useState("");
  const hasAccount = Boolean(gift.bankName && gift.accountNumber && gift.accountHolder);

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(gift.accountNumber);
      setMessage("Nomor rekening berhasil disalin.");
    } catch {
      setMessage("Nomor rekening tidak dapat disalin di perangkat ini.");
    }
  }

  return (
    <section className="gift-section section" id="hadiah" aria-labelledby="gift-title">
      <p className="eyebrow">Tanda kasih</p>
      <h2 id="gift-title">Kirim hadiah</h2>
      <p className="gift-section__copy">
        Doa dan kehadiran Anda adalah hadiah terindah bagi kami. Jika ingin berbagi tanda kasih,
        rincian rekening akan tersedia di bagian ini.
      </p>
      {hasAccount ? (
        <div className="gift-card">
          <p>{gift.bankName}</p>
          <strong>{gift.accountNumber}</strong>
          <span>a.n. {gift.accountHolder}</span>
          <button className="text-button" type="button" onClick={copyAccount}>Salin nomor rekening</button>
        </div>
      ) : !gift.qrImage ? (
        <div className="gift-placeholder">
          <span className="gift-placeholder__mark" aria-hidden="true">✳</span>
          <p>Informasi rekening atau QR akan ditambahkan.</p>
          <small>Bagian ini belum berisi detail pembayaran.</small>
        </div>
      ) : null}
      {gift.qrImage && <img className="gift-qr" src={gift.qrImage} alt="QR hadiah" width="220" height="220" />}
      <p className="form-status" role="status" aria-live="polite">{message}</p>
    </section>
  );
}
