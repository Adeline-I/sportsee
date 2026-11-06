// Mise en forme des valeurs pour l'affichage, en français

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const numberFormat = new Intl.NumberFormat("fr-FR");

// Date → "14 juin 2023" (Intl écrit "1 janvier" : on corrige en "1er janvier")
export const formatDate = (date: Date) =>
  dateFormat.format(date).replace(/^1 /, "1er ");

// 2250.2 → "2 250,2" (espace entre les milliers, virgule décimale)
export const formatNumber = (value: number) => numberFormat.format(value);

// 165 (cm) → "1m65"
export const formatHeight = (centimeters: number) => {
  const meters = Math.floor(centimeters / 100);
  const rest = String(centimeters % 100).padStart(2, "0"); // 5 → "05"
  return `${meters}m${rest}`;
};

// 1635 (minutes) → { hours: 27, minutes: 15 }
export const splitDuration = (totalMinutes: number) => ({
  hours: Math.floor(totalMinutes / 60),
  minutes: totalMinutes % 60,
});
