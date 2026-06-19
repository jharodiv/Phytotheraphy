import {
    Text,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

import { styles } from '@components/auth/AuthButton/authButton.styles';

interface AuthButtonProps{
    title: string;
    onPress: () => void;
    style?: ViewStyle;
};

const AuthButton = ({
    title,
    onPress,
    style,
}: AuthButtonProps) => {
    return (
        <TouchableOpacity
            style = {[styles.button, style]}
            onPress = {onPress}
        >
            <Text style = {styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default AuthButton;