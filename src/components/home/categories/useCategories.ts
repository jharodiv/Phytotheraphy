import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../../../firebaseConfig";

import {
    getFavoritePlantIds,
    toggleFavorite,
} from "@services/favorites/favorites.service";

import * as Haptics from "expo-haptics";

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
] as const;

export type UICategory = (typeof categories)[number];

export const useCategoriesLogic = () => {
    const [selectedCategory, setSelectedCategory] =
        useState<UICategory | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [filteredPlants, setFilteredPlants] = useState<any[]>([]);

    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const ids = await getFavoritePlantIds();
            setFavoriteIds(ids);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchPlants = async (categoryId: string) => {
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

    const handleCategoryPress = async (
        category: UICategory
    ) => {
        setSelectedCategory(category);

        const plants = await fetchPlants(category.id);

        setFilteredPlants(plants);

        setModalVisible(true);
    };

    const handleFavoritePress = async (
        plantId: string
    ) => {
        try {
            await Haptics.selectionAsync();

            const isFavorite = await toggleFavorite(plantId);

            setFavoriteIds((prev) =>
                isFavorite
                    ? [...prev, plantId]
                    : prev.filter((id) => id !== plantId)
            );
        } catch (err) {
            console.log(err);
        }
    };

    return {
        categories,

        selectedCategory,
        modalVisible,
        filteredPlants,
        favoriteIds,

        setModalVisible,
        handleCategoryPress,
        handleFavoritePress,
    };
};