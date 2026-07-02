import { useLocalSearchParams } from "expo-router";

import ResultView from "@components/scan/result/resultView";

export default function ResultScreen() {

    const {
        imageUri,
        commonName,
        scientificName,
    } = useLocalSearchParams();

    return (
        <ResultView
            imageUri={imageUri as string}
            commonName={commonName as string}
            scientificName={scientificName as string}
        />
    );
}