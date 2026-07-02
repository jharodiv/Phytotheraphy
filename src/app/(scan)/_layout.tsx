import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="camera"
                options={{
                    animation: "default",
                }}
            />

            <Stack.Screen
                name="result"
                options={{
                    presentation: "modal",
                    animation: "slide_from_bottom",
                }}
            />
        </Stack>
    );
}