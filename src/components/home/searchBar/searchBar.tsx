import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import styles from "@components/home/searchBar/searchBar.style";

const SearchBar = () => {
    return (
        <View style={styles.container}>
        <Ionicons
            name="search-outline"
            size={22}
            color="COLOR.black"
            style={styles.icon}
        />

        <TextInput
            style={styles.input}
            placeholder="Search for medicinal plants..."
            placeholderTextColor="#8E8E93"
        />
        </View>
    );
};

export default SearchBar;