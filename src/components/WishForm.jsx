import { useState } from "react";
import { submitWish } from "../lib/api.js";

export default function WishForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus({ type: "loading", message: "Mengirim ucapan..." });

    try {
      await submitWish({
        name: values.get("name"),
        address: values.get("address"),
        message: values.get("message"),
      });
      form.reset();
      setStatus({ type: "success", message: "Terima kasih. Ucapan Anda sudah tersimpan." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  return (
    <section className="form-section wishes section" id="ucapan" aria-labelledby="wishes-title">
      <div className="form-section__intro">
        <p className="eyebrow">Titip doa dan harapan</p>
        <h2 id="wishes-title">Ucapan untuk kami</h2>
        <p>Setiap doa baik dari Anda akan kami simpan dengan penuh syukur.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Nama</span>
          <input name="name" type="text" autoComplete="name" maxLength="100" required />
        </label>
        <label className="field">
          <span>Alamat</span>
          <input name="address" type="text" autoComplete="street-address" maxLength="200" required />
        </label>
        <label className="field">
          <span>Ucapan</span>
          <textarea name="message" rows="4" maxLength="1000" required />
        </label>
        <button className="button" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Mengirim..." : "Kirim ucapan"}
        </button>
        <p className="form-privacy">Ucapan Anda tersimpan untuk pasangan dan tidak ditampilkan secara publik.</p>
        <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">{status.message}</p>
      </form>
    </section>
  );
}
