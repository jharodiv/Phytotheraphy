import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    UserProfile,
    getUserProfile,
    updateFullName,
    updateProfilePhoto,
    updateUsername,
} from "@services/profile/profile.service";

export const useProfileLogic = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState (true);
    const [saving, setSaving] = useState(false);

    // Fetching the User Profile
    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getUserProfile();

            setProfile(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveUsername = useCallback(
        async (username: string) => {
            try {
                setSaving(true);

                await updateUsername(username);

                setProfile((previous) =>
                    previous
                        ? {
                            ...previous,
                            username,
                        }
                        : previous
                );
            } finally {
                setSaving(false);
            }
        },
        []
    );

    const saveFullName = useCallback(
        async (fullName: string) => {
            try {
                setSaving(true);

                await updateFullName(fullName);

                setProfile((previous) => 
                    previous
                        ? {
                            ...previous,
                            fullName,
                        }
                    : previous
                );
            }

            finally {
                setSaving(false);
            }
        },
        []
    );


    const savePhoto = useCallback(
        async (photoURL: string) => {
            try {
                setSaving(true);

                await updateProfilePhoto(photoURL);

                setProfile((previous) =>
                    previous
                        ? {
                            ...previous,
                            photoURL,
                        }
                        : previous
                );
            } finally {
                setSaving(false);
            }
        },
        []
    );

    useEffect(() => {
        loadProfile();   
    }, [loadProfile]);


    return {
        profile,
        loading,
        saving,
        reload: loadProfile,
        saveUsername,
        saveFullName,
        savePhoto
    }
}
