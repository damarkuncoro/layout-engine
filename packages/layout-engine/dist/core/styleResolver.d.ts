/**
 * Mengubah nilai panjang CSS: angka → px, string tetap.
 * Contoh: 16 -> "16px", "2rem" -> "2rem", undefined -> undefined
 */
export declare const normalizeUnit: (value?: number | string) => string | undefined;
