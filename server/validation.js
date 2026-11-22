export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

function textField(value, label, maxLength) {
  if (typeof value !== "string") throw new ValidationError(`${label} wajib diisi.`);
  const text = value.trim();
  if (!text) throw new ValidationError(`${label} wajib diisi.`);
  if (text.length > maxLength) throw new ValidationError(`${label} maksimal ${maxLength} karakter.`);
  return text;
}

function whatsappField(value) {
  if (typeof value !== "string") throw new ValidationError("Nomor WhatsApp wajib diisi.");
  const cleaned = value.trim().replace(/[\s()-]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) {
    throw new ValidationError("Masukkan nomor WhatsApp dengan 7 sampai 15 digit.");
  }
  return cleaned;
}

export function validateRSVP(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Data konfirmasi tidak valid.");
  }

  const name = textField(body.name, "Nama", 100);
  const whatsapp = whatsappField(body.whatsapp);
  if (body.attendance !== "yes" && body.attendance !== "no") {
    throw new ValidationError("Pilih hadir atau tidak hadir.");
  }

  let guestCount = null;
  if (body.attendance === "yes") {
    if (!Number.isInteger(body.guestCount) || body.guestCount < 1 || body.guestCount > 50) {
      throw new ValidationError("Jumlah tamu harus antara 1 dan 50 orang.");
    }
    guestCount = body.guestCount;
  }

  return { name, whatsapp, attendance: body.attendance, guestCount };
}

export function validateWish(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Data ucapan tidak valid.");
  }

  return {
    name: textField(body.name, "Nama", 100),
    address: textField(body.address, "Alamat", 200),
    message: textField(body.message, "Ucapan", 1000),
  };
}
