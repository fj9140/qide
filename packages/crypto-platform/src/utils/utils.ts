export function calcAnnualizedFee(rate: number, intervalHours: number) {
  return ((365 * 24) / intervalHours) * rate;
}
