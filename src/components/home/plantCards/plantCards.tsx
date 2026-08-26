import styles from "@components/home/plantCards/plantCards.style";

import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useEffect, useState } from "react";

import { plantImages } from "@images/plants/plantImages";

import { usePlants } from "@hooks/plants/usePlants";

import {
    PlantCardsProps,
    PlantFeatured,
} from "@type/plants.type";

export default function PlantCardsSection({
    onPlantPress,
}: PlantCardsProps) {
    const [plants, setPlants] =
        useState<PlantFeatured[]>([]);

    const {
        handleFetchFeaturedPlant,
    } = usePlants();

    useEffect(() => {
        const loadPlants = async () => {
            const featuredPlants =
                await handleFetchFeaturedPlant();

            setPlants(featuredPlants);
        };

        loadPlants();
    }, [handleFetchFeaturedPlant]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Popular Medicinal Plants
                </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.plantList
                }
            >
                {plants.map((plant) => (
                    <TouchableOpacity
                        key={plant.id}
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() =>
                            onPlantPress(plant)
                        }
                    >
                        <Image
                            source={
                                plantImages[plant.id]
                            }
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View style={styles.info}>
                            <Text
                                style={
                                    styles.plantName
                                }
                            >
                                {plant.commonName}
                            </Text>

                            <Text
                                style={
                                    styles.plantCategory
                                }
                            >
                                {plant.scientificName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}