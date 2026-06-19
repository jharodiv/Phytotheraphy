import { AuthStackParamList } from '@app-types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '@components/auth/welcomeScreen/welcomeScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
        />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
