export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(amount: number, currency: "INR" = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function whatsappHref(number: string, message?: string) {
  const digits = number.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
