import {
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

import { styles } from '@components/auth/AuthButton/authButton.styles';

interface AuthButtonProps{
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    loginText?: TextStyle;
    icon?: React.ReactNode;
};

const AuthButton = ({
    title,
    onPress,
    style,
    loginText,
    icon,
}: AuthButtonProps) => {
    return (
        <TouchableOpacity
            style = {[styles.button, style]}
            onPress = {onPress}
        >
            {icon && (
                <View style={styles.iconContainer}>
                    {icon}
                </View>
            )}
            <Text style = {[styles.text, loginText]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default AuthButton;