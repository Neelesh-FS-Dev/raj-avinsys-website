export const RFQ_MAX_FILES = 5;
export const RFQ_MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
export const RFQ_MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB across all files

/**
 * Only formats explicitly approved for RFQ attachments. Extensions and MIME types
 * are both checked on the client. The server must repeat the check, and must
 * scan and store files outside the public web root.
 */
export const RFQ_ALLOWED_TYPES = {
  pdf: ['application/pdf'],
  xls: ['application/vnd.ms-excel'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
} as const satisfies Record<string, readonly string[]>;

export const RFQ_ACCEPT_ATTRIBUTE = '.pdf,.xls,.xlsx';

export interface FileLike {
  readonly name: string;
  readonly size: number;
  readonly type: string;
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns human-readable error messages for a single file. Empty array means valid. */
export function validateFileType(file: FileLike): string[] {
  const extension = extensionOf(file.name) as keyof typeof RFQ_ALLOWED_TYPES;
  const allowed = RFQ_ALLOWED_TYPES[extension];
  if (!allowed) {
    return [`${file.name}: only PDF, XLS and XLSX files are accepted.`];
  }
  // Some browsers report an empty MIME type for .xls/.xlsx. Accept that case only
  // when the extension is valid; the server re-checks the content.
  if (file.type !== '' && !(allowed as readonly string[]).includes(file.type)) {
    return [`${file.name}: file type does not match its extension.`];
  }
  return [];
}

/** Validates a set of attachments against count, size and type limits. */
export function validateAttachments(files: readonly FileLike[]): string[] {
  const errors: string[] = [];
  if (files.length > RFQ_MAX_FILES) {
    errors.push(`Attach no more than ${RFQ_MAX_FILES} files.`);
  }
  for (const file of files) {
    if (file.size === 0) {
      errors.push(`${file.name}: the file is empty.`);
    }
    if (file.size > RFQ_MAX_FILE_BYTES) {
      errors.push(`${file.name}: larger than ${formatBytes(RFQ_MAX_FILE_BYTES)}.`);
    }
    errors.push(...validateFileType(file));
  }
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > RFQ_MAX_TOTAL_BYTES) {
    errors.push(`Attachments together exceed ${formatBytes(RFQ_MAX_TOTAL_BYTES)}.`);
  }
  return errors;
}
