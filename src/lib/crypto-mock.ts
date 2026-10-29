export interface MemoryBlock {
  id: string;
  address: string;
  label: string;
  size: string;
  encryptedData: string;
  status: "allocated" | "zeroized" | "encrypted";
}

export async function simulateEncryption(
  plaintext: string,
  secretKey: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const keyData = encoder.encode(secretKey.padEnd(32, "0").slice(0, 32));

  try {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return Array.from(combined)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (err) {
    console.error("Crypto simulation error:", err);
    return "e9a1b2c3d4e5f60718293a4b5c6d7e8f";
  }
}

export function generateZeroizedBuffer(sizeInBytes: number = 16): string {
  return "0x" + "00".repeat(sizeInBytes);
}