    import styles from "@components/home/categories/categories.style";
import { useCallback, useMemo, useRef, useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

    import BottomSheet from "@gorhom/bottom-sheet";

    const categories = [
    {
        id: 1,
        label: "All",
        icon: require("@images/home/categoriesAll.png"),
    },
    {
        id: 2,
        label: "Cold",
        icon: require("@images/home/lung.png"),
    },
    {
        id: 3,
        label: "Digestive",
        icon: require("@images/home/stomach.png"),
    },
    {
        id: 4,
        label: "Skin Care",
        icon: require("@images/home/face.png"),
    },
    {
        id: 5,
        label: "Diabetes",
        icon: require("@images/home/diabetis.png"),
    },
    ];

    const CategorySection = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["50%"], []);

    const [selectedCategory, setSelectedCategory] = useState<
        (typeof categories)[0] | null
    >(null);

    const handleCategoryPress = useCallback((category: (typeof categories)[0]) => {
        setSelectedCategory(category);
        bottomSheetRef.current?.expand();
    }, []);

    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>Category</Text>

            <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
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

                <Text style={styles.categoryText}>
                    {category.label}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>

        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
        >
            <View
            style={{
                flex: 1,
                padding: 20,
            }}
            >
            <Text
                style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 20,
                }}
            >
                {selectedCategory?.label}
            </Text>

            <Text>
                Information about {selectedCategory?.label} will appear here.
            </Text>
            </View>
        </BottomSheet>
        </>
    );
    };

    export default CategorySection;