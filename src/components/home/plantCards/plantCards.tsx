import styles from '@components/home/plantCards/plantCards.style';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const plants = [
    {
        id: 1,
        name: "Lagundi",
        category: "Cold",
        image: require("@images/home/plants/lagundi.jpg"),
    },
    {
        id: 2,
        name: "Ampalaya",
        category: "Diabetes",
        image: require("@images/home/plants/lagundi.jpg"),
    },
    {
        id: 3,
        name: "Aloe Vera",
        category: "Skin Care",
        image: require("@images/home/plants/lagundi.jpg"),
    },
    {
        id: 4,
        name: "Ginger",
        category: "Skin Care",
        image: require("@images/home/plants/lagundi.jpg")
    }
];
const PlantCardsSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Popular Medicinal Plant</Text>

                {/* <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity> */}
                
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
                        >
                            <Image
                                source={plant.image}
                                style={styles.image}
                                resizeMode="cover"
                            />

                            <View style={styles.info}>
                                <Text style={styles.plantName}>
                                    {plant.name}
                                </Text>
                                <Text style={styles.plantCategory}>
                                    {plant.category}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
        </View>
    );
};

export default PlantCardsSection;