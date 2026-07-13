import { ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "@components/home/categories/categories";
import Footer from "@components/home/footer/footer";
import Header from "@components/home/header/header";
import PlantCardsSection from "@components/home/plantCards/plantCards";
import ScanCard from "@components/home/scanCard/scanCard";
import SearchBar from "@components/home/searchBar/searchBar";
import SearchResults from "@components/home/searchBar/searchResult/searchResult.screen";
import { usePlantSearch } from "@services/plants/plants.filter";

export default function TabLayout() {

  const {
    plants,
    search,
    setSearch,
  } = usePlantSearch ();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Header />
        <View style={{ position: "relative", zIndex: 100 }}>
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
          <PlantCardsSection          />
        </ScrollView>

        <Footer />
      </View>
    </SafeAreaView>
  );
}
