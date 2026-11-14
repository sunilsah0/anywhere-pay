import { ScrollView, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Privacy() {
  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.title}>Privacy and disclaimer</Text>
      <Text style={s.p}>
        Anywhere Pay is a prototype and demonstration. It is not a payment service, bank,
        or money transmitter. No real money moves, and no real accounts can be linked.
      </Text>
      <Text style={s.p}>
        Exchange rates and fees are simulated. Routes shown are illustrations. Only the
        UPI to Fonepay link reflects a link that is live in the real world.
      </Text>
      <Text style={s.p}>
        This app does not ask for names, bank details, card numbers or ID. WYour simulated payment history is saved only on your device. It never leaves your device, and you can erase it with the Clear history button. We do not run analytics.
        The website host may keep standard server logs (such as IP address) for security.
      </Text>
      <Text style={s.p}>
        Names of payment systems are used only to describe them. This project is not
        affiliated with or endorsed by any of them.
      </Text>
      <Text style={s.p}>Contact: YOUR-EMAIL-HERE</Text>
      <Link href="/" style={s.link}>Back to the app</Link>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 16, maxWidth: 640, width: "100%", alignSelf: "center" },
  title: { fontSize: 24, fontWeight: "700", marginVertical: 16 },
  p: { fontSize: 16, lineHeight: 24, marginBottom: 12 },
  link: { color: "#0e7c86", fontWeight: "600", marginTop: 8 },
});