import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

import styles from "@components/home/footer/footer.style";

const Footer = () => {
    const pathname = usePathname();

    const tabs = [
        {
            icon: "home",
            route: "/(tabs)",
        },
        {
            icon: "camera", 
            route: "/(scan)/camera" // Nek pa change nalang  into camera (not sure kasi how ko ma-open yung cam kasi nasa browser ako)
        },
        {
            icon: "bookmark-outline",
            route: "/(tabs)"
        }
    ] as const;


        return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const active = pathname === tab.route;

                return (
                    <Pressable
                        key={tab.route}
                        style={styles.tab}
                        onPress={() => router.push(tab.route)}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon as any}
                            size={26}
                            color={active ? "#2E7D32" : "#777"}
                        />

                        <Text
                            style={[
                                styles.label,
                                active && styles.activeLabel,
                            ]}
                        >
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default Footer;