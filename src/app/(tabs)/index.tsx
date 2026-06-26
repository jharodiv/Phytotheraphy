import {
    SafeAreaView,
    ScrollView,
} from "react-native";

import Header from "@components/home/header/header";

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Header />
        </ScrollView>
        </SafeAreaView>
    );
}