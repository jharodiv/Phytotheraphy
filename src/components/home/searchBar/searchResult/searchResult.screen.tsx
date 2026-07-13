import {
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import styles from "@components/home/searchBar/searchResult/searchResult.style";

import { useSearchResult } from "@components/home/searchBar/searchResult/searchResult.logic";
import { Plant } from "@services/plants/plants.service";


type Props = {
    plants: Plant[];
    search: string;
};

const SearchResults = ({
    plants,
    search,
}: Props) => {
    const { filteredPlants } =
        useSearchResult(plants, search);

    if (!search.trim()) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Search Results
            </Text>

            <FlatList
                scrollEnabled={false}
                data={filteredPlants}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No medicinal plants found.
                    </Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.resultItem}
                        onPress={() => {
                            // Navigate to details page later
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🌿</Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.commonName}>
                                {item.commonName}
                            </Text>

                            <Text style={styles.scientificName}>
                                {item.scientificName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SearchResults;