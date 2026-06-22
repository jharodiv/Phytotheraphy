import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";

export default function SplashScreen(){
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            router.replace("/(auth)")
        }, 2500);

        return() => clearTimeout(timer);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
            >
                <Image
                    source={require("@images/LOGO.png")}
                    style={{
                        width: 120,
                        height: 120,
                    }}
                />
            </Animated.View>
        </View>
    );
}