import { useRef, useEffect } from "react";
import { Animated, View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import Reveal from "../components/Reveal";
import Demo from "../components/Demo";
import { COUNTRIES } from "../routes";
import { C } from "../theme";

type OrbProps = { size: number; color: string; top: number; left: string; dur: number; speed: number; scrollY: Animated.Value };

// A slowly floating glow that also drifts at a different speed than the page (parallax).
function Orb({ size, color, top, left, dur, speed, scrollY }: OrbProps) {
  const f = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(f, { toValue: 1, duration: dur, useNativeDriver: false }),
        Animated.timing(f, { toValue: 0, duration: dur, useNativeDriver: false }),
      ])
    ).start();
  }, [f, dur]);
  const floatY = f.interpolate({ inputRange: [0, 1], outputRange: [-18, 18] });
  const par = Animated.multiply(scrollY, -speed);
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute", top, left: left as any, width: size, height: size,
        borderRadius: size / 2, backgroundColor: color, opacity: 0.2,
        transform: [{ translateY: Animated.add(floatY, par) }],
      }}
    />
  );
}

// Auto-scrolling strip of every country in the prototype.
function Marquee() {
  const itemW = 136;
  const keys = Object.keys(COUNTRIES);
  const total = keys.length * itemW;
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(x, { toValue: -total, duration: keys.length * 2200, easing: (t) => t, useNativeDriver: false })
    ).start();
  }, [x, total, keys.length]);
  const list = keys.concat(keys);
  return (
    <View style={{ overflow: "hidden", height: 64 }}>
      <Animated.View style={{ flexDirection: "row", transform: [{ translateX: x }] }}>
        {list.map((k, i) => (
          <View key={k + i} style={s.mq}>
            <Text style={s.mqName}>{COUNTRIES[k].name}</Text>
            <Text style={s.mqRail}>{COUNTRIES[k].rail}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

function Card(props: { title: string; body: string }) {
  return (
    <View style={s.card}>
      <Text style={s.cardT}>{props.title}</Text>
      <Text style={s.cardB}>{props.body}</Text>
    </View>
  );
}

export default function Home() {
  const { width, height } = useWindowDimensions();
  const wide = width >= 900;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scroller = useRef<any>(null);
  const demoY = useRef(0);
  const heroFade = scrollY.interpolate({ inputRange: [0, height * 0.6], outputRange: [1, 0], extrapolate: "clamp" });
  const heroShrink = scrollY.interpolate({ inputRange: [0, height], outputRange: [1, 0.85], extrapolate: "clamp" });
  const grid = { flexDirection: wide ? "row" : "column", gap: 16 } as const;

  return (
    <Animated.ScrollView
      ref={scroller}
      style={{ flex: 1, backgroundColor: C.bg }}
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
    >
      {/* HERO */}
      <View style={{ minHeight: Math.max(height * 0.92, 560), justifyContent: "center", overflow: "hidden" }}>
        <Orb size={380} color={C.teal} top={40} left="-10%" dur={5000} speed={0.25} scrollY={scrollY} />
        <Orb size={300} color={C.amber} top={220} left="65%" dur={6500} speed={0.45} scrollY={scrollY} />
        <Orb size={220} color="#4b6cff" top={420} left="30%" dur={7500} speed={0.15} scrollY={scrollY} />
        <Animated.View style={{ opacity: heroFade, transform: [{ scale: heroShrink }], padding: 24, maxWidth: 1100, width: "100%", alignSelf: "center" }}>
          <Text style={[s.brand, { fontSize: width < 600 ? 54 : 96 }]}>SunilPay</Text>
          <Text style={[s.tag, { fontSize: width < 600 ? 22 : 34 }]}>Anywhere. Anytime. Without restrictions.</Text>
          <Text style={s.lead}>
            One app that would connect the world's payment systems, so a traveller can pay
            like a local without a card. That is the vision. Today this is an honest,
            simulated prototype.
          </Text>
          <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Pressable style={s.cta} onPress={() => scroller.current && scroller.current.scrollTo({ y: demoY.current - 20, animated: true })}>
              <Text style={s.ctaT}>Try the demo</Text>
            </Pressable>
            <Link href="/privacy" style={s.ghost}>Disclaimer and privacy</Link>
          </View>
        </Animated.View>
      </View>

      {/* THE GAP */}
      <Reveal scrollY={scrollY}>
        <Text style={s.h2}>The gap travellers fall into</Text>
        <View style={grid}>
          <Card title="Cards work everywhere" body="But they cost the most, and not everyone has the right card for the country they visit." />
          <Card title="Local rails are fast and cheap" body="UPI, Swish, Pix and others are built for locals, and linking them across borders needs agreements." />
          <Card title="SunilPay picks the route" body="Your home account, the local rail, the fee and the speed, compared in one place before you pay." />
        </View>
      </Reveal>

      {/* HOW */}
      <Reveal scrollY={scrollY}>
        <Text style={s.h2}>How it would work</Text>
        <View style={grid}>
          <Card title="1. Link home" body="Connect an account from your own country's payment system." />
          <Card title="2. Choose where" body="Pick the country and the type: P2P, P2M, B2B, B2P or P2B." />
          <Card title="3. Connector decides" body="Direct rail link if one is live, a licensed local partner if not, a card as last resort." />
          <Card title="4. Settle locally" body="The receiver gets paid on their own country's rail in their currency." />
        </View>
      </Reveal>

      {/* COUNTRIES */}
      <Reveal scrollY={scrollY}>
        <Text style={s.h2}>{Object.keys(COUNTRIES).length} countries in the prototype</Text>
        <Marquee />
      </Reveal>

      {/* DEMO */}
      <Reveal scrollY={scrollY} onY={(y) => { demoY.current = y; }}>
        <Text style={s.h2}>Try it</Text>
        <Demo />
      </Reveal>

      {/* NOVELTY */}
      <Reveal scrollY={scrollY}>
        <Text style={s.h2}>What is new here</Text>
        <View style={grid}>
          <Card title="Honest link map" body="Every country pair is marked live or needs-partner. Only links confirmed in public sources are shown as live." />
          <Card title="Route comparison" body="Direct link, local partner and card are shown side by side with the fee, so the cheapest route is visible." />
          <Card title="All five payment types" body="P2P, P2M, B2B, B2P and P2B share one flow instead of five separate apps." />
        </View>
      </Reveal>

      {/* FOOTER */}
      <Reveal scrollY={scrollY}>
        <Text style={s.foot}>
          SunilPay is a prototype for learning and demonstration. It is not a bank or payment
          service, no real money moves, and it is not affiliated with any payment system named.
        </Text>
        <Link href="/privacy" style={s.link}>Privacy and disclaimer</Link>
      </Reveal>
    </Animated.ScrollView>
  );
}

const s = StyleSheet.create({
  brand: { color: C.text, fontWeight: "800", letterSpacing: 2 },
  tag: { color: C.teal, fontWeight: "700", marginTop: 8 },
  lead: { color: C.mute, fontSize: 18, lineHeight: 28, marginTop: 20, maxWidth: 640 },
  cta: { backgroundColor: C.teal, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30 },
  ctaT: { color: C.bg, fontWeight: "800", fontSize: 16 },
  ghost: { color: C.text, borderWidth: 1, borderColor: C.line, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30, overflow: "hidden" },
  h2: { color: C.text, fontSize: 30, fontWeight: "800", marginBottom: 20 },
  card: { flex: 1, backgroundColor: C.panel, borderWidth: 1, borderColor: C.line, borderRadius: 16, padding: 20 },
  cardT: { color: C.text, fontSize: 18, fontWeight: "700", marginBottom: 8 },
  cardB: { color: C.mute, fontSize: 15, lineHeight: 23 },
  mq: { width: 136, paddingRight: 8, justifyContent: "center" },
  mqName: { color: C.text, fontWeight: "700" },
  mqRail: { color: C.mute, fontSize: 12 },
  foot: { color: C.mute, fontSize: 14, lineHeight: 22 },
  link: { color: C.teal, fontWeight: "600", marginTop: 12 },
});
