import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import styles from "@components/home/searchBar/searchBar.style";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: Props) => {
    return (
        <View style={styles.container}>
            <Ionicons
                name="search-outline"
                size={22}
                color="black"
                style={styles.icon}
            />

            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search for medicinal plants..."
                placeholderTextColor="#8E8E93"
            />
        </View>
    );
};

export default SearchBar;