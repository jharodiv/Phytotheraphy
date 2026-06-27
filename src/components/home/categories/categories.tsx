import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import styles from "@components/home/categories/categories.style";

const categories = [
    {
        id: 1,
        label: "All",
        icon: "apps-outline",
    },
    {
        id: 2,
        label: "Cold & Cough",
        icon: "medkit-outline",
    },
    {
        id: 3,
        label: "Digestive",
        icon: "restaurant-outline",
    },
    {
        id: 4,
        label: "Skin Care",
        icon: "flower-outline",
    },
    {
        id: 5,
        label: "Diabetes",
        icon: "water-outline",
    },
];

const CategorySection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Category</Text>

                <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
            >
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={styles.categoryButton}
                    activeOpacity={0.8}
                >
                <Ionicons
                    name={category.icon as any}
                    size={18}
                    color="#2E7D32"
                />

                <Text style={styles.categoryText}>
                    {category.label}
                    </Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            </View>
    );
};

export default CategorySection;