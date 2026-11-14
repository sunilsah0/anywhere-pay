import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COUNTRIES, plans } from "../routes";
import { C } from "../theme";

type Tab = "pay" | "accounts" | "history";
type Entry = { role: string; to: string; who: string; route: string; amount: string };

const ROLES: Record<string, { label: string; who: string; ref: string }> = {
  P2P: { label: "Person to person", who: "Recipient name or ID", ref: "Note" },
  P2M: { label: "Person to merchant", who: "Merchant QR code or ID", ref: "Order reference" },
  B2B: { label: "Business to business", who: "Supplier payment ID", ref: "Invoice number" },
  B2P: { label: "Business to person", who: "Employee or freelancer ID", ref: "Payroll or payout batch" },
  P2B: { label: "Person to business", who: "Business payment ID", ref: "Bill or subscription number" },
};

function Chips(props: { value: string; onPick: (k: string) => void }) {
  const [q, setQ] = useState("");
  const keys = Object.keys(COUNTRIES).filter((k) =>
    COUNTRIES[k].name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <View>
      <TextInput style={s.input} value={q} onChangeText={setQ}
        placeholder="Search country" placeholderTextColor={C.mute} />
      <View style={[s.row, { marginTop: 8 }]}>
        {keys.map((k) => (
          <Pressable key={k} onPress={() => props.onPick(k)}
            style={[s.chip, props.value === k && s.chipOn]}>
            <Text style={props.value === k ? s.chipTextOn : s.chipText}>{COUNTRIES[k].name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function Demo() {
  const [tab, setTab] = useState<Tab>("pay");
  const [home, setHome] = useState("US");
  const [hasCard, setHasCard] = useState(true);
  const [role, setRole] = useState("P2M");
  const [dest, setDest] = useState("IN");
  const [amount, setAmount] = useState("1500");
  const [who, setWho] = useState("");
  const [ref, setRef] = useState("");
  const [pick, setPick] = useState(0);
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("history")
      .then((v) => { if (v) setHistory(JSON.parse(v)); })
      .catch(() => {});
  }, []);

  function saveHistory(h: Entry[]) {
    setHistory(h);
    AsyncStorage.setItem("history", JSON.stringify(h)).catch(() => {});
  }

  const options = plans(home, dest, parseFloat(amount) || 0, hasCard);
  const chosen = options[Math.min(pick, options.length - 1)];
  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  function pay() {
    if (!chosen) return;
    saveHistory([{
      role, to: COUNTRIES[dest].name, who: who.trim(), route: chosen.name,
      amount: fmt(parseFloat(amount)) + " " + COUNTRIES[dest].cur,
    }, ...history]);
    setWho(""); setRef(""); setTab("history");
  }

  return (
    <View style={s.box}>
      <Text style={s.banner}>Prototype. No real payments. Rates and fees are simulated.</Text>
      <View style={s.row}>
        {(["pay", "accounts", "history"] as Tab[]).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[s.tab, tab === t && s.tabOn]}>
            <Text style={tab === t ? s.chipTextOn : s.chipText}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "accounts" && (
        <View>
          <Text style={s.h}>Home country</Text>
          <Chips value={home} onPick={setHome} />
          <Pressable onPress={() => setHasCard(!hasCard)}
            style={[s.chip, { marginTop: 12, alignSelf: "flex-start" }]}>
            <Text style={s.chipText}>Card fallback: {hasCard ? "on" : "off"}</Text>
          </Pressable>
        </View>
      )}

      {tab === "pay" && (
        <View>
          <Text style={s.h}>Payment type</Text>
          <View style={s.row}>
            {Object.keys(ROLES).map((k) => (
              <Pressable key={k} onPress={() => setRole(k)} style={[s.chip, role === k && s.chipOn]}>
                <Text style={role === k ? s.chipTextOn : s.chipText}>{k}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={s.mute}>{ROLES[role].label}. Paying from {COUNTRIES[home].name}.</Text>

          <Text style={s.h}>Destination</Text>
          <Chips value={dest} onPick={(k) => { setDest(k); setPick(0); }} />

          <Text style={s.h}>{ROLES[role].who} ({COUNTRIES[dest].rail})</Text>
          <TextInput style={s.input} value={who} onChangeText={setWho}
            placeholder="Type or paste" placeholderTextColor={C.mute} />

          <Text style={s.h}>Amount the receiver gets ({COUNTRIES[dest].cur})</Text>
          <TextInput style={s.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />

          <Text style={s.h}>{ROLES[role].ref}</Text>
          <TextInput style={s.input} value={ref} onChangeText={setRef} />

          <Text style={s.h}>How it will travel</Text>
          {options.map((o, i) => (
            <Pressable key={o.name} onPress={() => setPick(i)}
              style={[s.opt, chosen && chosen.name === o.name && s.optOn]}>
              <Text style={s.bold}>{o.name}{i === 0 ? " (cheapest)" : ""}</Text>
              <Text style={s.mute}>You pay about {fmt(o.youPay)} {o.cur} - fee {(o.fee * 100).toFixed(1)}%</Text>
            </Pressable>
          ))}
          <Pressable onPress={pay} style={s.go}>
            <Text style={s.goText}>Pay {fmt(parseFloat(amount) || 0)} {COUNTRIES[dest].cur}</Text>
          </Pressable>
        </View>
      )}

      {tab === "history" && (
        <View>
          {history.length === 0 && <Text style={s.mute}>No payments yet. Make one in the pay tab.</Text>}
          {history.map((h, i) => (
            <View key={i} style={s.opt}>
              <Text style={s.bold}>{h.role}: {h.amount} to {h.to}{h.who ? " (" + h.who + ")" : ""}</Text>
              <Text style={s.mute}>{h.route}</Text>
            </View>
          ))}
          {history.length > 0 && (
            <Pressable onPress={() => saveHistory([])}
              style={[s.chip, { marginTop: 12, alignSelf: "flex-start" }]}>
              <Text style={s.chipText}>Clear history</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  box: { backgroundColor: C.panel, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 16 },
  banner: { backgroundColor: "#3a2f12", color: C.amber, padding: 10, borderRadius: 8, marginBottom: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  tab: { flex: 1, padding: 10, borderWidth: 1, borderColor: C.line, borderRadius: 8, alignItems: "center" },
  tabOn: { backgroundColor: C.teal, borderColor: C.teal },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: C.line, borderRadius: 20 },
  chipOn: { backgroundColor: C.teal, borderColor: C.teal },
  chipText: { color: C.text },
  chipTextOn: { color: C.bg, fontWeight: "700" },
  h: { color: C.text, fontWeight: "600", marginTop: 14, marginBottom: 6 },
  mute: { color: C.mute },
  input: { borderWidth: 1, borderColor: C.line, borderRadius: 8, padding: 10, fontSize: 16, color: C.text, backgroundColor: C.bg },
  opt: { borderWidth: 1, borderColor: C.line, borderRadius: 8, padding: 10, marginTop: 8 },
  optOn: { borderWidth: 2, borderColor: C.teal },
  bold: { color: C.text, fontWeight: "700" },
  go: { backgroundColor: C.teal, padding: 14, borderRadius: 10, marginTop: 14, alignItems: "center" },
  goText: { color: C.bg, fontWeight: "800" },
});
