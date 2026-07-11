import styles from "@components/home/categories/categories.style";
import { useCategoriesLogic } from "@components/home/categories/useCategories";
import { plantImages } from "@images/plants/plantImages";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CategorySection = () => {
    const {
        categories,
        selectedCategory,
        modalVisible,
        filteredPlants,
        favoriteIds,
        setModalVisible,
        handleCategoryPress,
        handleFavoritePress,
    } = useCategoriesLogic();

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Category</Text>
                </View>

                <View style={styles.categoryList}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryButton}
                            activeOpacity={0.7}
                            onPress={() =>
                                handleCategoryPress(category)
                            }
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

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setModalVisible(false)
                }
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() =>
                        setModalVisible(false)
                    }
                >
                    <Pressable
                        style={styles.modalContainer}
                        onPress={() => {}}
                    >
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>
                            {selectedCategory?.label}
                        </Text>

                        <View
                            style={{
                                marginTop: 16,
                                maxHeight: 400,
                            }}
                        >
                            {filteredPlants.length > 0 ? (
                                <FlatList
                                    data={filteredPlants}
                                    keyExtractor={(item: any) =>
                                        item.id
                                    }
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.plantItem}
                                            activeOpacity={0.8}
                                        >
                                            <Image
                                                source={
                                                    plantImages[item.id]
                                                }
                                                style={
                                                    styles.plantImage
                                                }
                                                resizeMode="cover"
                                            />

                                            {/* Bookmark */}
                                            <TouchableOpacity
                                                style={
                                                    styles.bookmarkButton
                                                }
                                                activeOpacity={0.8}
                                                onPress={() =>
                                                    handleFavoritePress(
                                                        item.id
                                                    )
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name={
                                                        favoriteIds.includes(
                                                            item.id
                                                        )
                                                            ? "bookmark"
                                                            : "bookmark-outline"
                                                    }
                                                    size={24}
                                                    color={
                                                        favoriteIds.includes(
                                                            item.id
                                                        )
                                                            ? "#FFD54F"
                                                            : "#FFFFFF"
                                                    }
                                                />
                                            </TouchableOpacity>

                                            <LinearGradient
                                                colors={[
                                                    "transparent",
                                                    "rgba(0,0,0,0.75)",
                                                ]}
                                                style={
                                                    styles.gradient
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.plantName
                                                    }
                                                >
                                                    {
                                                        item.commonName
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.scientificName
                                                    }
                                                >
                                                    {
                                                        item.scientificName
                                                    }
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : (
                                <Text
                                    style={
                                        styles.modalDescription
                                    }
                                >
                                    No medicinal plants found.
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() =>
                                setModalVisible(false)
                            }
                        >
                            <Text
                                style={
                                    styles.closeButtonText
                                }
                            >
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