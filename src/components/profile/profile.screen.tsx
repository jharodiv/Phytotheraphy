import { useEffect, useState } from "react";

import Footer from "@components/home/footer/footer";
import styles from "@components/profile/profile.style";

import { useProfileLogic } from "@logic/profile/profile.logic";

import COLORS from "@constants/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
    const {
        profile,
        loading,
        saving,
        saveUsername,
        saveFullName,
        savePhoto,
    } = useProfileLogic();

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedTab, setSelectedTab] = useState<
        "favorite" | "history"
    >("favorite");

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        if (!profile) return;

        setUsername(profile.username);
        setFullName(profile.fullName);
        setPhotoURL(profile.photoURL);
    }, [profile]);

    const handleSave = async () => {
        await savePhoto(photoURL);
        await saveUsername(username);
        await saveFullName(fullName);

        Alert.alert(
            "Success",
            "Your profile has been updated."
        );

        setModalVisible(false);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size="large"
                        color={COLORS.primary}
                    />
                </View>

                <Footer />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* ================= HEADER ================= */}

                <LinearGradient
                    colors={[
                        COLORS.primary,
                        COLORS.secondary,
                    ]}
                    start={{
                        x: 0,
                        y: 0,
                    }}
                    end={{
                        x: 1,
                        y: 1,
                    }}
                    style={styles.header}
                >
                    <View
                        style={
                            styles.greetingContainer
                        }
                    >
                        <Text
                            style={
                                styles.greeting
                            }
                        >
                            Welcome Back 👋
                        </Text>

                        <Text
                            style={
                                styles.greetingSubtext
                            }
                        >
                            Manage your account
                        </Text>
                    </View>
                </LinearGradient>

                {/* ================= PROFILE CARD ================= */}

                <View style={styles.profileCard}>
                    {photoURL ? (
                        <Image
                            source={{
                                uri: photoURL,
                            }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View
                            style={
                                styles.avatarPlaceholder
                            }
                        >
                            <MaterialCommunityIcons
                                name="account"
                                size={80}
                                color={
                                    COLORS.primary
                                }
                            />
                        </View>
                    )}

                    <Text style={styles.fullName}>
                        {profile?.fullName}
                    </Text>

                    <Text style={styles.username}>
                        @{profile?.username}
                    </Text>

                    <Text style={styles.subtitle}>
                        🌿 Plant Explorer
                    </Text>

                    {/* STATS */}

                    <View
                        style={styles.statsContainer}
                    >
                        <View
                            style={styles.stat}
                        >
                            <Text
                                style={
                                    styles.statNumber
                                }
                            >
                                0
                            </Text>

                            <Text
                                style={
                                    styles.statLabel
                                }
                            >
                                Favorites
                            </Text>
                        </View>

                        <View
                            style={
                                styles.statDivider
                            }
                        />

                        <View
                            style={styles.stat}
                        >
                            <Text
                                style={
                                    styles.statNumber
                                }
                            >
                                0
                            </Text>

                            <Text
                                style={
                                    styles.statLabel
                                }
                            >
                                History
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={
                            styles.editButton
                        }
                        onPress={() =>
                            setModalVisible(
                                true
                            )
                        }
                    >
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            size={18}
                            color={
                                COLORS.white
                            }
                        />

                        <Text
                            style={
                                styles.editButtonText
                            }
                        >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ================= TAB ================= */}

                <View
                    style={
                        styles.tabContainer
                    }
                >
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedTab ===
                                "favorite" &&
                                styles.activeTab,
                        ]}
                        onPress={() =>
                            setSelectedTab(
                                "favorite"
                            )
                        }
                    >
                        <MaterialCommunityIcons
                            name="heart-outline"
                            size={22}
                            color={
                                selectedTab ===
                                "favorite"
                                    ? COLORS.white
                                    : COLORS.primary
                            }
                        />

                        <Text
                            style={[
                                styles.tabText,
                                selectedTab ===
                                    "favorite" &&
                                    styles.activeTabText,
                            ]}
                        >
                            Favorite
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tab,
                            selectedTab ===
                                "history" &&
                                styles.activeTab,
                        ]}
                        onPress={() =>
                            setSelectedTab(
                                "history"
                            )
                        }
                    >
                        <MaterialCommunityIcons
                            name="history"
                            size={22}
                            color={
                                selectedTab ===
                                "history"
                                    ? COLORS.white
                                    : COLORS.primary
                            }
                        />

                        <Text
                            style={[
                                styles.tabText,
                                selectedTab ===
                                    "history" &&
                                    styles.activeTabText,
                            ]}
                        >
                            History
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ================= CONTENT ================= */}

                <View
                    style={
                        styles.contentContainer
                    }
                >
                    {selectedTab ===
                    "favorite" ? (
                        <Text
                            style={
                                styles.placeholder
                            }
                        >
                            Favorite UI goes here.
                        </Text>
                    ) : (
                        <Text
                            style={
                                styles.placeholder
                            }
                        >
                            History UI goes here.
                        </Text>
                    )}
                </View>
            </ScrollView>

            {/* ================= EDIT MODAL ================= */}

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() =>
                    setModalVisible(false)
                }
            >
                <View
                    style={
                        styles.modalOverlay
                    }
                >
                    <View
                        style={styles.modal}
                    >
                        <Text
                            style={
                                styles.modalTitle
                            }
                        >
                            Edit Profile
                        </Text>

                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Profile Photo URL"
                            value={photoURL}
                            onChangeText={
                                setPhotoURL
                            }
                        />

                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Username"
                            value={username}
                            onChangeText={
                                setUsername
                            }
                        />

                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={
                                setFullName
                            }
                        />

                        <TouchableOpacity
                            style={
                                styles.saveButton
                            }
                            onPress={
                                handleSave
                            }
                            disabled={
                                saving
                            }
                        >
                            <Text
                                style={
                                    styles.saveButtonText
                                }
                            >
                                Save Changes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                styles.cancelButton
                            }
                            onPress={() =>
                                setModalVisible(
                                    false
                                )
                            }
                        >
                            <Text
                                style={
                                    styles.cancelButtonText
                                }
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Footer />
        </SafeAreaView>
    );
}