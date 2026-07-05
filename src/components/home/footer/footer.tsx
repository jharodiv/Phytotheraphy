import styles from "@components/home/footer/footer.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Footer = () => {
    const pathname = usePathname();

    const tabs = [
        {
            name: "Home",
            icon: "home",
            route: "/(tabs)",
        },
        {
            name: "Camera",
            icon: "camera",
            route: "/camera",
        },
        {
            name: "Bookmarks",
            icon: "bookmark-outline", 
            route: "/(tabs)", // Placeholder route for bookmarks / favorites
        },
    ] as const;

    return (
        <View style={styles.container}>
        {tabs.map((tab) => {
            // check if the current path starts with the tab's route
            const active = pathname.startsWith(tab.route);

            return (
            <Pressable
                key={tab.icon}
                style={styles.tab}
                onPress={() => router.push(tab.route)}
            >
                <MaterialCommunityIcons
                name={tab.icon as any}
                size={26}
                color={active ? "#2E7D32" : "#777"}
                />
                <Text style={[styles.label, active && styles.activeLabel]}></Text>
            </Pressable>
            );
        })}
        </View>
    );
};

export default Footer;
