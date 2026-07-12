import styles from "@components/home/favorites/favorites.style";
import Footer from "@components/home/footer/footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { plantImages } from "@images/plants/plantImages";

import {
    getFavoritePlants,
    removeFavorite
} from "@services/favorites/favorites.service";


type Plant = {
    id: string;
    commonName: string;
    scientificName: string;
};

const { width, height } = Dimensions.get("window");

export default function FavoritesScreen() {
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const plants = await getFavoritePlants();
            setPlants(plants as Plant[]);
        } catch (err) {
            console.log(err);
        }
    };

    const handleToggleFavorite = async (plantId: string) => {
        try {
            await Haptics.selectionAsync();

            await removeFavorite(plantId);

            setPlants((prev) =>
                prev.filter((plant) => plant.id !== plantId)
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <MaterialCommunityIcons
                name="leaf"
                size={Math.max(width, height) * 0.7}
                color="#2E7D32"
                style={styles.backgroundLeaf}
            />

            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.8}
                    onPress={() => router.replace("/(tabs)")}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="#2E7D32"
                    />
                </TouchableOpacity>

                <Text style={styles.header}>
                    Favorite Plants
                </Text>
            </View>

            <FlatList
                data={plants}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            No favorite plants yet
                        </Text>

                        <Text style={styles.emptySubtitle}>
                            Tap the bookmark icon on a plant to save it here.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.plantItem}
                        activeOpacity={0.85}
                    >
                        <Image
                            source={plantImages[item.id]}
                            style={styles.plantImage}
                            resizeMode="cover"
                        />

                        <TouchableOpacity
                            style={styles.bookmarkContainer}
                            activeOpacity={0.8}
                            onPress={() =>
                                handleToggleFavorite(item.id)
                            }
                        >
                            <MaterialCommunityIcons
                                name="bookmark"
                                size={22}
                                color="#FFD54F"
                            />
                        </TouchableOpacity>

                        <LinearGradient
                            colors={[
                                "transparent",
                                "rgba(0,0,0,0.25)",
                                "rgba(0,0,0,0.9)",
                            ]}
                            style={styles.gradient}
                        >
                            <Text style={styles.plantName}>
                                {item.commonName}
                            </Text>

                            <Text style={styles.scientificName}>
                                {item.scientificName}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />

            <Footer />
        </SafeAreaView>
    );
}