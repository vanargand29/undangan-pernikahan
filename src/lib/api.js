async function postRecord(path, payload) {
  let response;
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Tidak dapat tersambung. Periksa koneksi lalu coba lagi.");
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Data belum tersimpan. Silakan coba lagi.");
  return result;
}

export const submitRSVP = (payload) => postRecord("/api/rsvps", payload);
export const submitWish = (payload) => postRecord("/api/wishes", payload);
