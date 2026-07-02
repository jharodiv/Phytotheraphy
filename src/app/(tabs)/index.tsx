import {
    SafeAreaView,
    ScrollView,
    View
} from "react-native";

import Categories from "@components/home/categories/categories";
import Footer from "@components/home/footer/footer";
import Header from "@components/home/header/header";
import PlantCardsSection from "@components/home/plantCards/plantCards";
import ScanCard from "@components/home/scanCard/scanCard";
import SearchBar from "@components/home/searchBar/searchBar";

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Header />
                    <SearchBar />
                    <ScanCard />
                    <Categories />
                    <PlantCardsSection />
                </ScrollView>

                <Footer />
            </View>
        </SafeAreaView>
    );
}