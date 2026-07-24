import styles from "@components/home/footer/footer.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Footer = () => {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const tabs = [
        {
            icon: "home",
            route: "/(tabs)",
        },
        {
            icon: "camera",
            route: "/camera",
        },
        {
            icon: "account",
            route: "/(profile)",
        },
    ] as const;

    return (
        <View
            style={[
                styles.container,
                {
                    bottom: Math.max(insets.bottom, 16),
                },
            ]}
        >
            {tabs.map((tab) => {
                const active = pathname === tab.route;

                return (
                    <Pressable
                        key={tab.icon}
                        style={[
                            styles.tab,
                            active && styles.activeTab,
                        ]}
                        onPress={() => router.push(tab.route)}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon}
                            size={28}
                            color={active ? "#FFFFFF" : "#6B7280"}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};

export default Footer;