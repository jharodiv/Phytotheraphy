import React from "react";
import {
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { styles } from "./authInput.styles";

interface AuthInputProps extends TextInputProps {
    icon?: React.ReactNode;
}

const AuthInput = ({ icon, ...props }: AuthInputProps) => {    
    return (
        <View
            style={[
                styles.container,
            ]}
        >
            {icon}
            <TextInput
                style={styles.input}
                {...props}
            />
        </View>
    );
};

export default AuthInput;