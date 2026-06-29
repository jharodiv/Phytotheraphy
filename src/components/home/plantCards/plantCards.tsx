import styles from '@components/home/plantCards/plantCards.style';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const categories = [
    {
        id: 1,
        label: "All",
        icon: require("@images/home/categoriesAll.png"),
    },
    {
        id: 2,
        label: "Cold & Cough",
        icon: require("@images/home/lung.png"),
    },
    {
        id: 3,
        label: "Digestive",
        icon: require("@images/home/stomach.png"),
    },
    {
        id: 4,
        label: "Skin Care",
        icon: require("@images/home/face.png"),
    },
        {
        id: 5,
        label: "Diabetes",
        icon: require("@images/home/diabetis.png"),
    },
];

const PlantCardsSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Category</Text>

                <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

                <View style={styles.categoryList}>
                {categories.map((category) => (
                    <TouchableOpacity
                    key={category.id}
                    style={styles.categoryButton}
                    >
                <Image
                    source={category.icon}
                    style={styles.icon}
                    resizeMode="contain"
                />

                <Text style={styles.categoryText}>
                    {category.label}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default PlantCardsSection;