export type Country = { name: string; cur: string; perUsd: number; rail: string };

// perUsd values are rough and simulated, not live rates.
export const COUNTRIES: Record<string, Country> = {
  US: { name: "United States", cur: "USD", perUsd: 1, rail: "FedNow / ACH" },
  AU: { name: "Australia", cur: "AUD", perUsd: 1.52, rail: "PayID / NPP" },
  JP: { name: "Japan", cur: "JPY", perUsd: 150, rail: "Zengin / PayPay" },
  CN: { name: "China", cur: "CNY", perUsd: 7.2, rail: "Alipay / WeChat Pay" },
  NP: { name: "Nepal", cur: "NPR", perUsd: 135, rail: "Fonepay" },
  IN: { name: "India", cur: "INR", perUsd: 84, rail: "UPI" },
  ZA: { name: "South Africa", cur: "ZAR", perUsd: 18, rail: "PayShap" },
  AE: { name: "UAE (Dubai)", cur: "AED", perUsd: 3.67, rail: "Aani" },
  DE: { name: "Germany", cur: "EUR", perUsd: 0.92, rail: "Wero / SEPA Instant" },
  FR: { name: "France", cur: "EUR", perUsd: 0.92, rail: "Wero / SEPA Instant" },
  SE: { name: "Sweden", cur: "SEK", perUsd: 10.5, rail: "Swish" },
  NO: { name: "Norway", cur: "NOK", perUsd: 10.8, rail: "Vipps" },
  DK: { name: "Denmark", cur: "DKK", perUsd: 6.9, rail: "MobilePay" },
  GB: { name: "United Kingdom", cur: "GBP", perUsd: 0.79, rail: "Faster Payments" },
  ES: { name: "Spain", cur: "EUR", perUsd: 0.92, rail: "Bizum" },
  IT: { name: "Italy", cur: "EUR", perUsd: 0.92, rail: "Bancomat Pay" },
  PT: { name: "Portugal", cur: "EUR", perUsd: 0.92, rail: "MB WAY" },
  NL: { name: "Netherlands", cur: "EUR", perUsd: 0.92, rail: "iDEAL" },
  PL: { name: "Poland", cur: "PLN", perUsd: 4, rail: "BLIK" },
  CH: { name: "Switzerland", cur: "CHF", perUsd: 0.88, rail: "TWINT" },
  BR: { name: "Brazil", cur: "BRL", perUsd: 5.4, rail: "Pix" },
  MX: { name: "Mexico", cur: "MXN", perUsd: 18, rail: "SPEI" },
  TH: { name: "Thailand", cur: "THB", perUsd: 35, rail: "PromptPay" },
  SG: { name: "Singapore", cur: "SGD", perUsd: 1.34, rail: "PayNow" },
  MY: { name: "Malaysia", cur: "MYR", perUsd: 4.5, rail: "DuitNow" },
  ID: { name: "Indonesia", cur: "IDR", perUsd: 15800, rail: "QRIS" },
  PH: { name: "Philippines", cur: "PHP", perUsd: 57, rail: "InstaPay" },
  BD: { name: "Bangladesh", cur: "BDT", perUsd: 120, rail: "bKash" },
  KE: { name: "Kenya", cur: "KES", perUsd: 129, rail: "M-Pesa" },
  NG: { name: "Nigeria", cur: "NGN", perUsd: 1500, rail: "NIP" },
  EG: { name: "Egypt", cur: "EGP", perUsd: 49, rail: "InstaPay Egypt" },
};

// Only links I could confirm as live in public sources.
const LIVE_LINKS = new Set(["UPI>Fonepay", "Fonepay>UPI"]);

export function plans(home: string, dest: string, amount: number, hasCard: boolean) {
  const h = COUNTRIES[home];
  const d = COUNTRIES[dest];
  const usd = amount / d.perUsd;
  const options: { name: string; fee: number }[] = [];
  if (h.rail === d.rail) options.push({ name: "Direct on " + h.rail, fee: 0.002 });
  else if (LIVE_LINKS.has(h.rail + ">" + d.rail))
    options.push({ name: "Direct rail link", fee: 0.003 });
  if (h.rail !== d.rail) options.push({ name: "Local partner payout", fee: 0.012 });
  if (hasCard) options.push({ name: "Card fallback", fee: 0.035 });
  return options
    .map((o) => ({ ...o, youPay: usd * h.perUsd * (1 + o.fee), cur: h.cur }))
    .sort((a, b) => a.fee - b.fee);
}