export type Country = { name: string; cur: string; perUsd: number; rail: string };

// All 193 UN member states. Format: code|name|currency|simulated rate per 1 USD|main payment system.
// Rates are rough and SIMULATED. Where I am not sure of a national instant system,
// the rail is a generic label ("Bank transfer" or "Mobile money").
const DATA = `AF|Afghanistan|AFN|70|Mobile money
AL|Albania|ALL|92|Bank transfer
DZ|Algeria|DZD|135|Bank transfer
AD|Andorra|EUR|0.92|SEPA Instant
AO|Angola|AOA|900|Multicaixa Express
AG|Antigua and Barbuda|XCD|2.7|Bank transfer
AR|Argentina|ARS|1000|Transferencias 3.0
AM|Armenia|AMD|390|Bank transfer
AU|Australia|AUD|1.52|PayID / NPP
AT|Austria|EUR|0.92|SEPA Instant
AZ|Azerbaijan|AZN|1.7|Bank transfer
BS|Bahamas|BSD|1|Bank transfer
BH|Bahrain|BHD|0.376|Fawri+
BD|Bangladesh|BDT|120|bKash
BB|Barbados|BBD|2|Bank transfer
BY|Belarus|BYN|3.3|Bank transfer
BE|Belgium|EUR|0.92|Wero / SEPA Instant
BZ|Belize|BZD|2|Bank transfer
BJ|Benin|XOF|600|Mobile money
BT|Bhutan|BTN|84|Bank transfer
BO|Bolivia|BOB|6.9|QR Simple
BA|Bosnia and Herzegovina|BAM|1.8|Bank transfer
BW|Botswana|BWP|13.6|Mobile money
BR|Brazil|BRL|5.4|Pix
BN|Brunei|BND|1.34|Bank transfer
BG|Bulgaria|EUR|0.92|SEPA Instant
BF|Burkina Faso|XOF|600|Mobile money
BI|Burundi|BIF|2900|Mobile money
CV|Cabo Verde|CVE|101|Vinti4
KH|Cambodia|KHR|4100|Bakong
CM|Cameroon|XAF|600|Mobile money
CA|Canada|CAD|1.37|Interac e-Transfer
CF|Central African Republic|XAF|600|Mobile money
TD|Chad|XAF|600|Mobile money
CL|Chile|CLP|950|Bank transfer
CN|China|CNY|7.2|Alipay / WeChat Pay
CO|Colombia|COP|4100|Bre-B
KM|Comoros|KMF|450|Mobile money
CG|Congo|XAF|600|Mobile money
CR|Costa Rica|CRC|520|SINPE Movil
CI|Cote d'Ivoire|XOF|600|Mobile money
HR|Croatia|EUR|0.92|SEPA Instant
CU|Cuba|CUP|24|Bank transfer
CY|Cyprus|EUR|0.92|SEPA Instant
CZ|Czechia|CZK|23|Bank transfer
CD|DR Congo|CDF|2800|Mobile money
DK|Denmark|DKK|6.9|MobilePay
DJ|Djibouti|DJF|178|Mobile money
DM|Dominica|XCD|2.7|Bank transfer
DO|Dominican Republic|DOP|60|Bank transfer
EC|Ecuador|USD|1|Bank transfer
EG|Egypt|EGP|49|InstaPay Egypt
SV|El Salvador|USD|1|Bank transfer
GQ|Equatorial Guinea|XAF|600|Bank transfer
ER|Eritrea|ERN|15|Bank transfer
EE|Estonia|EUR|0.92|SEPA Instant
SZ|Eswatini|SZL|18|Mobile money
ET|Ethiopia|ETB|120|Telebirr
FJ|Fiji|FJD|2.25|Mobile money
FI|Finland|EUR|0.92|MobilePay
FR|France|EUR|0.92|Wero / SEPA Instant
GA|Gabon|XAF|600|Mobile money
GM|Gambia|GMD|70|Mobile money
GE|Georgia|GEL|2.7|Bank transfer
DE|Germany|EUR|0.92|Wero / SEPA Instant
GH|Ghana|GHS|15|MTN MoMo
GR|Greece|EUR|0.92|IRIS
GD|Grenada|XCD|2.7|Bank transfer
GT|Guatemala|GTQ|7.7|Bank transfer
GN|Guinea|GNF|8600|Mobile money
GW|Guinea-Bissau|XOF|600|Mobile money
GY|Guyana|GYD|209|Bank transfer
HT|Haiti|HTG|131|Mobile money
HN|Honduras|HNL|25|Bank transfer
HU|Hungary|HUF|360|Bank transfer
IS|Iceland|ISK|138|Aur / Kass
IN|India|INR|84|UPI
ID|Indonesia|IDR|15800|QRIS
IR|Iran|IRR|42000|Bank transfer
IQ|Iraq|IQD|1310|Bank transfer
IE|Ireland|EUR|0.92|SEPA Instant
IL|Israel|ILS|3.7|Bit
IT|Italy|EUR|0.92|Bancomat Pay
JM|Jamaica|JMD|157|Bank transfer
JP|Japan|JPY|150|Zengin / PayPay
JO|Jordan|JOD|0.71|CliQ
KZ|Kazakhstan|KZT|480|Kaspi
KE|Kenya|KES|129|M-Pesa
KI|Kiribati|AUD|1.52|Bank transfer
KP|North Korea|KPW|900|Bank transfer
KR|South Korea|KRW|1380|KakaoPay
KW|Kuwait|KWD|0.31|KNET
KG|Kyrgyzstan|KGS|86|Bank transfer
LA|Laos|LAK|21500|LAPNet
LV|Latvia|EUR|0.92|SEPA Instant
LB|Lebanon|LBP|89500|Bank transfer
LS|Lesotho|LSL|18|Mobile money
LR|Liberia|LRD|190|Mobile money
LY|Libya|LYD|4.8|Bank transfer
LI|Liechtenstein|CHF|0.88|Bank transfer
LT|Lithuania|EUR|0.92|SEPA Instant
LU|Luxembourg|EUR|0.92|Payconiq
MG|Madagascar|MGA|4500|Mobile money
MW|Malawi|MWK|1730|Mobile money
MY|Malaysia|MYR|4.5|DuitNow
MV|Maldives|MVR|15.4|Bank transfer
ML|Mali|XOF|600|Mobile money
MT|Malta|EUR|0.92|SEPA Instant
MH|Marshall Islands|USD|1|Bank transfer
MR|Mauritania|MRU|40|Mobile money
MU|Mauritius|MUR|46|MauCAS
MX|Mexico|MXN|18|SPEI
FM|Micronesia|USD|1|Bank transfer
MD|Moldova|MDL|17.8|Bank transfer
MC|Monaco|EUR|0.92|SEPA Instant
MN|Mongolia|MNT|3400|Bank transfer
ME|Montenegro|EUR|0.92|Bank transfer
MA|Morocco|MAD|10|Bank transfer
MZ|Mozambique|MZN|64|M-Pesa
MM|Myanmar|MMK|2100|Mobile money
NA|Namibia|NAD|18|Bank transfer
NR|Nauru|AUD|1.52|Bank transfer
NP|Nepal|NPR|135|Fonepay
NL|Netherlands|EUR|0.92|iDEAL
NZ|New Zealand|NZD|1.65|Bank transfer
NI|Nicaragua|NIO|36.6|Bank transfer
NE|Niger|XOF|600|Mobile money
NG|Nigeria|NGN|1500|NIP
MK|North Macedonia|MKD|57|Bank transfer
NO|Norway|NOK|10.8|Vipps
OM|Oman|OMR|0.385|Bank transfer
PK|Pakistan|PKR|280|Raast
PW|Palau|USD|1|Bank transfer
PA|Panama|PAB|1|Yappy
PG|Papua New Guinea|PGK|3.9|Bank transfer
PY|Paraguay|PYG|7500|SIPAP
PE|Peru|PEN|3.75|Yape / Plin
PH|Philippines|PHP|57|InstaPay
PL|Poland|PLN|4|BLIK
PT|Portugal|EUR|0.92|MB WAY
QA|Qatar|QAR|3.64|Fawran
RO|Romania|RON|4.6|Bank transfer
RU|Russia|RUB|92|Bank transfer
RW|Rwanda|RWF|1370|Mobile money
KN|Saint Kitts and Nevis|XCD|2.7|Bank transfer
LC|Saint Lucia|XCD|2.7|Bank transfer
VC|Saint Vincent and the Grenadines|XCD|2.7|Bank transfer
WS|Samoa|WST|2.8|Bank transfer
SM|San Marino|EUR|0.92|SEPA Instant
ST|Sao Tome and Principe|STN|22.5|Bank transfer
SA|Saudi Arabia|SAR|3.75|sarie
SN|Senegal|XOF|600|Wave
RS|Serbia|RSD|100|IPS NBS
SC|Seychelles|SCR|14|Bank transfer
SL|Sierra Leone|SLE|22.7|Mobile money
SG|Singapore|SGD|1.34|PayNow
SK|Slovakia|EUR|0.92|SEPA Instant
SI|Slovenia|EUR|0.92|SEPA Instant
SB|Solomon Islands|SBD|8.4|Bank transfer
SO|Somalia|SOS|571|EVC Plus
ZA|South Africa|ZAR|18|PayShap
SS|South Sudan|SSP|4500|Mobile money
ES|Spain|EUR|0.92|Bizum
LK|Sri Lanka|LKR|300|LankaPay
SD|Sudan|SDG|600|Bank transfer
SR|Suriname|SRD|36|Bank transfer
SE|Sweden|SEK|10.5|Swish
CH|Switzerland|CHF|0.88|TWINT
SY|Syria|SYP|13000|Bank transfer
TJ|Tajikistan|TJS|10.7|Bank transfer
TZ|Tanzania|TZS|2600|Mobile money
TH|Thailand|THB|35|PromptPay
TL|Timor-Leste|USD|1|Bank transfer
TG|Togo|XOF|600|Mobile money
TO|Tonga|TOP|2.4|Bank transfer
TT|Trinidad and Tobago|TTD|6.8|Bank transfer
TN|Tunisia|TND|3.1|Bank transfer
TR|Turkiye|TRY|34|FAST
TM|Turkmenistan|TMT|3.5|Bank transfer
TV|Tuvalu|AUD|1.52|Bank transfer
UG|Uganda|UGX|3700|Mobile money
UA|Ukraine|UAH|41|Bank transfer
AE|United Arab Emirates|AED|3.67|Aani
GB|United Kingdom|GBP|0.79|Faster Payments
US|United States|USD|1|FedNow / ACH
UY|Uruguay|UYU|40|Bank transfer
UZ|Uzbekistan|UZS|12700|Payme / Click
VU|Vanuatu|VUV|119|Bank transfer
VE|Venezuela|VES|40|Pago Movil
VN|Vietnam|VND|25000|VietQR / NAPAS
YE|Yemen|YER|250|Bank transfer
ZM|Zambia|ZMW|27|Mobile money
ZW|Zimbabwe|ZWG|26|EcoCash`;

export const COUNTRIES: Record<string, Country> = {};
DATA.split("\n").forEach((line) => {
  const [code, name, cur, rate, rail] = line.split("|");
  COUNTRIES[code] = { name, cur, perUsd: parseFloat(rate), rail };
});

// Blocked or heavily restricted for card networks and payments because of sanctions
// (my understanding at time of writing; rules change, so check current law).
export const RESTRICTED = new Set(["KP", "IR", "SY", "CU", "RU", "BY"]);

// Only links I could confirm as live in public sources.
const LIVE_LINKS = new Set(["UPI>Fonepay", "Fonepay>UPI"]);

export function plans(home: string, dest: string, amount: number, hasCard: boolean) {
  if (RESTRICTED.has(home) || RESTRICTED.has(dest)) return [];
  const h = COUNTRIES[home];
  const d = COUNTRIES[dest];
  const usd = amount / d.perUsd;
  const options: { name: string; fee: number }[] = [];
  const sameSepa = h.rail.includes("SEPA") && d.rail.includes("SEPA");
  if (home === dest) options.push({ name: "Direct on " + h.rail, fee: 0.002 });
  else if (sameSepa) options.push({ name: "Direct on SEPA Instant (euro area)", fee: 0.002 });
  else if (LIVE_LINKS.has(h.rail + ">" + d.rail))
    options.push({ name: "Direct rail link", fee: 0.003 });
  if (home !== dest) options.push({ name: "Local partner payout", fee: 0.012 });
  if (hasCard) options.push({ name: "Card fallback (Mastercard or similar)", fee: 0.035 });
  return options
    .map((o) => ({ ...o, youPay: usd * h.perUsd * (1 + o.fee), cur: h.cur }))
    .sort((a, b) => a.fee - b.fee);
}