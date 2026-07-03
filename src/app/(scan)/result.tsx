import ResultView from "@components/scan/result/resultView";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const {
    imageUri,
    imageBase64,
    commonName,
    scientificName,
    medicinalProperties,
    origin,
    usage,
  } = useLocalSearchParams();

  const properties = medicinalProperties
    ? JSON.parse(medicinalProperties as string)
    : [];

  return (
    <ResultView
      imageUri={imageUri as string}
      imageBase64={imageBase64 as string} // 👈 new
      commonName={commonName as string}
      scientificName={scientificName as string}
      medicinalProperties={properties}
      origin={origin as string}
      usage={usage as string}
    />
  );
}
