import styles from '@components/home/plantCards/plantCards.style';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { plantImages } from "@images/plants/plantImages";
import { db } from "../../../../firebaseConfig";

const PlantCardsSection = () => {

    const [plants, setPlants] = useState<any[]>([]);

    useEffect(() => {
        const fetchFeaturedPlants = async () => {
            try {
                const q = query(
                    collection(db, "plants"),
                    where("featured", "==", true)
                );

                const snapshot = await getDocs(q);

                const featuredPlants = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPlants(featuredPlants);
            } catch (error) {
                console.error("Error fetching featured plants:", error);
            }
        };

        fetchFeaturedPlants();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Popular Medicinal Plants
                </Text>

                {/* Future implementation */}
                {/* 
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
                */}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.plantList}
            >
                {plants.map((plant) => (
                    <TouchableOpacity
                        key={plant.id}
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => {
                            console.log(plant);
                            // router.push(`/plant/${plant.id}`);
                        }}
                    >
                        <Image
                            source={plantImages[plant.id]}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View style={styles.info}>
                            <Text style={styles.plantName}>
                                {plant.commonName}
                            </Text>

                            <Text style={styles.plantCategory}>
                                {plant.scientificName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default PlantCardsSection;