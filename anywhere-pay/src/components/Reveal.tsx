import { useState, ReactNode } from "react";
import { Animated, useWindowDimensions } from "react-native";

type Props = { scrollY: Animated.Value; children: ReactNode; onY?: (y: number) => void };

// Fades and lifts a section into view as the page scrolls.
// Must be a direct child of the page's ScrollView.
export default function Reveal({ scrollY, children, onY }: Props) {
  const { height } = useWindowDimensions();
  const [y, setY] = useState(99999); // hidden until measured
  const start = y - height * 0.95;
  const end = y - height * 0.6;
  const opacity = scrollY.interpolate({ inputRange: [start, end], outputRange: [0, 1], extrapolate: "clamp" });
  const lift = scrollY.interpolate({ inputRange: [start, end], outputRange: [60, 0], extrapolate: "clamp" });
  return (
    <Animated.View
      onLayout={(e) => {
        setY(e.nativeEvent.layout.y);
        if (onY) onY(e.nativeEvent.layout.y);
      }}
      style={{
        opacity,
        transform: [{ translateY: lift }],
        width: "100%",
        maxWidth: 1100,
        alignSelf: "center",
        paddingHorizontal: 20,
        marginBottom: 72,
      }}
    >
      {children}
    </Animated.View>
  );
}
