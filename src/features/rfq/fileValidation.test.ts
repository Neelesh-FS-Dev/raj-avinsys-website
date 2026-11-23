import { describe, expect, it } from 'vitest';
import { RFQ_MAX_FILES, validateAttachments, validateFileType, type FileLike } from './fileValidation';

const file = (name: string, size = 1024, type = ''): FileLike => ({ name, size, type });

describe('validateFileType', () => {
  it('accepts PDF, XLS and XLSX with matching MIME types', () => {
    expect(validateFileType(file('sld.pdf', 10, 'application/pdf'))).toEqual([]);
    expect(validateFileType(file('boq.xlsx', 10, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'))).toEqual([]);
    expect(validateFileType(file('boq.xls', 10, 'application/vnd.ms-excel'))).toEqual([]);
  });

  it('accepts an empty MIME type when the extension is allowed', () => {
    expect(validateFileType(file('boq.xlsx', 10, ''))).toEqual([]);
  });

  it('rejects disallowed extensions, even when the MIME type looks harmless', () => {
    expect(validateFileType(file('setup.exe', 10, 'application/pdf'))[0]).toMatch(/only PDF, XLS and XLSX/);
    expect(validateFileType(file('drawing.dwg', 10))[0]).toMatch(/only PDF, XLS and XLSX/);
  });

  it('rejects a file whose MIME type contradicts its extension', () => {
    expect(validateFileType(file('report.pdf', 10, 'text/html'))[0]).toMatch(/does not match/);
  });

  it('treats a double extension by its final suffix only', () => {
    expect(validateFileType(file('notes.pdf.exe', 10))[0]).toMatch(/only PDF/);
  });
});

describe('validateAttachments', () => {
  it('passes a small set of valid files', () => {
    expect(validateAttachments([file('a.pdf', 1000, 'application/pdf'), file('b.xlsx', 2000)])).toEqual([]);
  });

  it('rejects more than the maximum file count', () => {
    const many = Array.from({ length: RFQ_MAX_FILES + 1 }, (_, i) => file(`f${i}.pdf`));
    expect(validateAttachments(many)).toContain(`Attach no more than ${RFQ_MAX_FILES} files.`);
  });

  it('rejects a file larger than 10 MB', () => {
    const errors = validateAttachments([file('big.pdf', 11 * 1024 * 1024)]);
    expect(errors.join(' ')).toMatch(/larger than 10\.0 MB|larger than 10 MB/);
  });

  it('rejects empty files', () => {
    expect(validateAttachments([file('empty.pdf', 0)])[0]).toMatch(/empty/);
  });

  it('rejects a total above 25 MB even when each file is within the per-file limit', () => {
    const files = Array.from({ length: 3 }, (_, i) => file(`p${i}.pdf`, 9 * 1024 * 1024));
    expect(validateAttachments(files)).toContain('Attachments together exceed 25.0 MB.');
  });
});
