/**
 * Mengubah nilai panjang CSS: angka → px, string tetap.
 * Contoh: 16 -> "16px", "2rem" -> "2rem", undefined -> undefined
 */
export const normalizeUnit = (value?: number | string) => {
  if (typeof value === "number") {
    return `${value}px`
  }
  return value
}
