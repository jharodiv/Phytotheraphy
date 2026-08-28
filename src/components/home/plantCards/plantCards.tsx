import styles from "@components/home/plantCards/plantCards.style";

import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { plantImages } from "@images/plants/plantImages";

import {
    PlantCardsProps,
} from "@type/plants.type";

export default function PlantCardsSection({
    onPlantPress,
    onFeaturedPlants
}: PlantCardsProps) {

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
                {onFeaturedPlants.map((plant) => (
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