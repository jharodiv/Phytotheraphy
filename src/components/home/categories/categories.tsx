import styles from "@components/home/categories/categories.style";
import { plantImages } from "@images/plants/plantImages";
import { LinearGradient } from "expo-linear-gradient";
import {
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../../../firebaseConfig";

type UICategory = (typeof categories)[number];

    const categories = [
    {
        id: "all",
        label: "All",
        icon: require("@images/home/categoriesAll.png"),
    },
    {
        id: "cold",
        label: "Cold",
        icon: require("@images/home/lung.png"),
    },
    {
        id: "digestive",
        label: "Digestive",
        icon: require("@images/home/stomach.png"),
    },
    {
        id: "skincare",
        label: "Skin Care",
        icon: require("@images/home/face.png"),
    },
    {
        id: "diabetes",
        label: "Diabetes",
        icon: require("@images/home/diabetis.png"),
    },
    ];

    const fetchPlants = async (categoryId : string) => {
        const plantsRef = collection(db, "plants");

        const q =
            categoryId === "all"
            ? plantsRef
            : query(
                plantsRef,
                where("categories", "array-contains", categoryId)
            );

        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    const CategorySection = () => {
    const [selectedCategory, setSelectedCategory] =
        useState<UICategory | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [filteredPlants, setFilteredPlants] = useState<any[]>([]);

    const handleCategoryPress = async (category: UICategory) => {
        setSelectedCategory(category);

        const plants = await fetchPlants(category.id);

        setFilteredPlants(plants);

        setModalVisible(true);
    }

    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Category</Text>

            {/* <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity> */}

            </View>

            <View style={styles.categoryList}>
            {categories.map((category) => (
                <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(category)}
                >
                <Image
                    source={category.icon}
                    style={styles.icon}
                    resizeMode="contain"
                />

                <Text style={styles.categoryText}>{category.label}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>

        <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        >
        <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
        >
            <Pressable
            style={styles.modalContainer}
            onPress={() => {}}
            >
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>
                {selectedCategory?.label}
            </Text>

            <View style={{ marginTop: 16, maxHeight: 400 }}>
            {filteredPlants.length > 0 ? (
                <FlatList
                data={filteredPlants}
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.plantItem}
                    activeOpacity={0.8}
                >
                    <Image
                    source={plantImages[item.id]}
                    style={styles.plantImage}
                    resizeMode="cover"
                    />

                    <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.75)"]}
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
            ) : (
                <Text style={styles.modalDescription}>
                No medicinal plants found.
                </Text>
            )}
            </View> // MODAL BODY

            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.closeButtonText}>
                Close
                </Text>
            </TouchableOpacity>
            </Pressable>
        </Pressable>
        </Modal>
        </>
    );
};

export default CategorySection;