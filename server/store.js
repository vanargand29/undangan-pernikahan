import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = fileURLToPath(new URL("../data/", import.meta.url));
const dataFiles = {
  rsvps: path.join(dataDir, "rsvps.json"),
  wishes: path.join(dataDir, "wishes.json"),
};
const writeQueues = new Map(Object.keys(dataFiles).map((kind) => [kind, Promise.resolve()]));

async function readRecords(filePath) {
  try {
    const records = JSON.parse(await readFile(filePath, "utf8"));
    if (!Array.isArray(records)) throw new Error("Saved data is not an array.");
    return records;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw new Error("Saved data could not be read safely.", { cause: error });
  }
}

export function appendRecord(kind, record) {
  const filePath = dataFiles[kind];
  const previous = writeQueues.get(kind);
  if (!filePath || !previous) throw new TypeError("Unknown data file.");

  const write = previous.then(async () => {
    await mkdir(dataDir, { recursive: true });
    const records = await readRecords(filePath);
    records.push({ id: randomUUID(), createdAt: new Date().toISOString(), ...record });
    const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, { flag: "wx" });
      await rename(temporaryPath, filePath);
    } catch (error) {
      await rm(temporaryPath, { force: true }).catch(() => {});
      throw error;
    }
  });

  writeQueues.set(kind, write.catch(() => {}));
  return write;
}
