import styles from "@components/home/categories/categories.style";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
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
        icon: require("@images/home/categoriesAll.png"),
    },
    {
        id: 3,
        label: "Digestive",
        icon: require("@images/home/categoriesAll.png"),
    },
    {
        id: 4,
        label: "Diabetes",
        icon: require("@images/home/categoriesAll.png"),
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
            </ScrollView>
            </View>
    );
};

export default CategorySection;