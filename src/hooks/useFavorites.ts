import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";

import {
    FavoritePlant,
    getFavoritePlants,
    toggleFavorite,
} from "@services/favorites/favorites.service";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<FavoritePlant[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = useCallback(async () => {
        try {
        setLoading(true);

        const plants = await getFavoritePlants();

        setFavorites(plants);
        } catch (error) {
        console.log("Failed to load favorites:", error);
        } finally {
        setLoading(false);
        }
    }, []);

    const toggle = async (plantId: string) => {
        try {
        await Haptics.selectionAsync();

        await toggleFavorite(plantId);

        // Reload favorites after toggling
        await loadFavorites();
        } catch (error) {
        console.log("Failed to toggle favorite:", error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    return {
        favorites,
        loading,
        refresh: loadFavorites,
        toggle,
    };
};