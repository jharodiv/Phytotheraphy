import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { useState } from "react";

import LoadingOverlay from "@components/common/loadingOverlay";
import Categories from "@components/home/categories/categories";
import Footer from "@components/home/footer/footer";
import Header from "@components/home/header/header";
import PlantCardsSection from "@components/home/plantCards/plantCards";
import ScanCard from "@components/home/scanCard/scanCard";
import SearchBar from "@components/home/searchBar/searchBar";
import SearchResults from "@components/home/searchBar/searchResult/searchResult.screen";

import { usePlantSearch } from "@services/plants/plants.filter";
import { usePlants } from "@hooks/plants/usePlants";
import { searchHerbImage } from "@services/unsplash.service";

export default function TabLayout() {
    const {
        plants,
        search,
        setSearch,
    } = usePlantSearch();

    const {
        handlePlantPress,
        loading,
        error
    } = usePlants();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Header />

                    <View
                        style={{
                            position: "relative",
                            zIndex: 100,
                        }}
                    >
                        <SearchBar
                            value={search}
                            onChangeText={setSearch}
                        />

                        <SearchResults
                            plants={plants}
                            search={search}
                        />
                    </View>

                    <ScanCard />

                    <Categories />

                    <PlantCardsSection
                        onPlantPress={
                            handlePlantPress
                        }
                    />
                </ScrollView>

                <Footer />

                <LoadingOverlay
                    visible={loading}
                    message="Analyzing plant..."
                />
            </View>
        </SafeAreaView>
    );
}