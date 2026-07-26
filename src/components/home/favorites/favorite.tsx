import styles from "@components/home/favorites/favorites.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { plantImages } from "@images/plants/plantImages";
import { useFavoritesLogic } from "@logic/favorite/favorite.logic";
import { PlantModel } from "@models/firestore.models";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FavoritesScreen() {
    const {
        favorites,
        loading,
        onToggleFavorite,
    } = useFavoritesLogic();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <MaterialCommunityIcons
                    name="leaf-circle-outline"
                    size={42}
                    color="#2E7D32"
                />

                <Text style={styles.loadingText}>
                    Loading your favorites...
                </Text>
            </View>
        );
    }

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialCommunityIcons
                    name="bookmark-outline"
                    size={58}
                    color="#D0D5DD"
                />

                <Text style={styles.emptyTitle}>
                    No Favorite Plants
                </Text>

                <Text style={styles.emptySubtitle}>
                    Save medicinal plants to quickly access
                    them from your profile.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Section Header */}

            <View
                style={{
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        color: "#111827",
                    }}
                >
                    Favorite Plants
                </Text>

                <Text
                    style={{
                        marginTop: 4,
                        color: "#6B7280",
                        fontSize: 14,
                    }}
                >
                    {favorites.length} saved medicinal
                    {favorites.length > 1
                        ? " plants"
                        : " plant"}
                </Text>
            </View>

            {/* Cards */}

            {favorites.map((plant: PlantModel) => (
                <View
                    key={plant.id}
                    style={styles.card}
                >
                    <Image
                        source={plantImages[plant.id]}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    <View style={styles.info}>
                        {/* Header */}

                        <View style={styles.header}>
                            <View style={{ flex: 1 }}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.commonName}
                                >
                                    {plant.commonName}
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={
                                        styles.scientificName
                                    }
                                >
                                    {plant.scientificName}
                                </Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={
                                    styles.favoriteButton
                                }
                                onPress={() =>
                                    onToggleFavorite(
                                        plant.id
                                    )
                                }
                            >
                                <MaterialCommunityIcons
                                    name="bookmark"
                                    size={20}
                                    color="#F4B400"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Family */}

                        <View style={styles.familyBadge}>
                            <MaterialCommunityIcons
                                name="leaf"
                                size={14}
                                color="#2E7D32"
                            />

                            <Text
                                style={styles.family}
                            >
                                {plant.family}
                            </Text>
                        </View>

                        {/* Categories */}

                        <View
                            style={
                                styles.badgeContainer
                            }
                        >
                            {plant.categories
                                .slice(0, 2)
                                .map((category) => (
                                    <View
                                        key={category}
                                        style={
                                            styles.badge
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.badgeText
                                            }
                                        >
                                            {category}
                                        </Text>
                                    </View>
                                ))}

                            {plant.featured && (
                                <View
                                    style={
                                        styles.badge
                                    }
                                >
                                    <Text
                                        style={
                                            styles.badgeText
                                        }
                                    >
                                        ★ Featured
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}