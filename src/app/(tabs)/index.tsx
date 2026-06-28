import {
    SafeAreaView,
    ScrollView,
} from "react-native";

import Categories from "@components/home/categories/categories";
import Header from "@components/home/header/header";
import ScanCard from "@components/home/scanCard/scanCard";
import SearchBar from "@components/home/searchBar/searchBar";

export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Header />
            <SearchBar />
            <ScanCard />
            <Categories />
            
        </ScrollView>
        </SafeAreaView>
    );
}