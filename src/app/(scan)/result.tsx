import ResultView from "@components/scan/result/resultView";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const {
    imageUrl,
    photographerName,
    photographerUrl,
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
      imageUrl={imageUrl as string}
      photographerName={photographerName as string}
      photographerUrl={photographerUrl as string}
      commonName={commonName as string}
      scientificName={scientificName as string}
      medicinalProperties={properties}
      origin={origin as string}
      usage={usage as string}
    />
  );
}
