/**
 * Content-signature checks for RFQ attachments. Extensions and MIME types can be
 * faked, so the first bytes of each file must match the claimed format.
 */
const SIGNATURES: Record<string, number[][]> = {
  // %PDF-
  pdf: [[0x25, 0x50, 0x44, 0x46, 0x2d]],
  // ZIP container (OOXML)
  xlsx: [[0x50, 0x4b, 0x03, 0x04]],
  // OLE2 compound document (legacy XLS)
  xls: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
};

export function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

export function signatureMatches(name: string, head: Uint8Array): boolean {
  const options = SIGNATURES[extensionOf(name)];
  if (!options) return false;
  return options.some((sig) => sig.every((byte, index) => head[index] === byte));
}

/** Keeps only the extension, so stored file names cannot inject paths. */
export function storedExtension(name: string): string {
  const ext = extensionOf(name);
  return ext in SIGNATURES ? `.${ext}` : '.bin';
}
