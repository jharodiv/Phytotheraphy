import { PlantModel } from "@models/firestore.models";
import {
    getFavoritePlants,
    toggleFavorite,
} from "@services/favorites/favorites.service";
import { useCallback, useEffect, useState } from "react";

export const useFavoritesLogic = () => {
    const [favorites, setFavorites] = useState<PlantModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    /**
     * Loads all favorite plants.
     */
    const loadFavorites = useCallback(async () => {
        try {
            setLoading(true);

            const plants = await getFavoritePlants();

            setFavorites(plants);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Pull-to-refresh.
     */
    const refresh = useCallback(async () => {
        try {
            setRefreshing(true);
            await loadFavorites();
        } finally {
            setRefreshing(false);
        }
    }, [loadFavorites]);

    /**
     * Toggles the favorite status of a plant.
     */
    const onToggleFavorite = useCallback(
        async (herbId: string) => {
            const isStillFavorite = await toggleFavorite(herbId);

            if (!isStillFavorite) {
                setFavorites((previous) =>
                    previous.filter(
                        (plant) => plant.id !== herbId
                    )
                );
            } else {
                await loadFavorites();
            }
        },
        [loadFavorites]
    );

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    return {
        favorites,

        loading,
        refreshing,

        refresh,
        reload: loadFavorites,

        onToggleFavorite,
    };
};