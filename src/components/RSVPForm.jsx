import { useState } from "react";
import { submitRSVP } from "../lib/api.js";

export default function RSVPForm() {
  const [attendance, setAttendance] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus({ type: "loading", message: "Mengirim konfirmasi..." });

    try {
      await submitRSVP({
        name: values.get("name"),
        whatsapp: values.get("whatsapp"),
        attendance,
        guestCount: attendance === "yes" ? Number(values.get("guestCount")) : null,
      });
      form.reset();
      setAttendance("");
      setStatus({ type: "success", message: "Terima kasih. Konfirmasi kehadiran Anda sudah tersimpan." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  return (
    <section className="form-section section" id="rsvp" aria-labelledby="rsvp-title">
      <div className="form-section__intro">
        <p className="eyebrow">Kehadiran Anda berarti bagi kami</p>
        <h2 id="rsvp-title">Konfirmasi kehadiran</h2>
        <p>Mohon isi formulir berikut agar kami dapat menyambut Anda dengan baik.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Nama</span>
          <input name="name" type="text" autoComplete="name" maxLength="100" required />
        </label>
        <label className="field">
          <span>Nomor WhatsApp</span>
          <input name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" maxLength="24" placeholder="Contoh: 0812 3456 7890" required />
        </label>
        <fieldset className="field-choice">
          <legend>Kehadiran</legend>
          <label className="choice">
            <input type="radio" name="attendance" value="yes" required checked={attendance === "yes"} onChange={() => setAttendance("yes")} />
            <span>Hadir</span>
          </label>
          <label className="choice">
            <input type="radio" name="attendance" value="no" required checked={attendance === "no"} onChange={() => setAttendance("no")} />
            <span>Tidak Hadir</span>
          </label>
        </fieldset>
        {attendance === "yes" && (
          <label className="field field--compact">
            <span>Berapa orang yang hadir?</span>
            <input name="guestCount" type="number" min="1" max="50" step="1" inputMode="numeric" required />
          </label>
        )}
        <button className="button" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Mengirim..." : "Kirim konfirmasi"}
        </button>
        <p className="form-privacy">Informasi Anda disimpan di file acara dan tidak ditampilkan kepada tamu lain.</p>
        <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">{status.message}</p>
      </form>
    </section>
  );
}
