import { useState } from "react";

import {
    UserProfile,
    getUserProfile,
} from "@services/profile/profile.service";

import {
    getHistory,
} from "@services/history/history.services";

import {
    getFavorites,
} from "@services/favorites/favorites.service";

import {
    FavoriteModel,
    HistoryModel,
} from "@models/firestore.models";

export type ProfileTab =
    | "history"
    | "favorites";

export const userProfileLogic = () => {
    const [profile, setProfile] = useState<UserProfile | null> (null);
    const [history, setHistory] = useState<HistoryModel[]>([]);
    const [favorite, setFavorite] = useState<FavoriteModel[]>([]);
    const [selectedTab, setSelectedTab] = useState<ProfileTab>("history");
    const [loading,setLoading] = useState(true);
    const loadProfile = async () => {
        const user = await getUserProfile();
        setProfile(user);
    };

    const loadHistory = async () => {
        const data = await getHistory();
        setHistory(data);
    };

    const loadFavorites = async () => {
        const data = await getFavorites();
        setFavorite(data);
    };

    


}