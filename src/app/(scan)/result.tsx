import ResultView from "@components/scan/result/resultView";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const {
    imageUrl,
    photographerName,
    photographerUrl,

    commonName,
    scientificName,

    family,
    description,

    medicinalProperties,

    uses,
    preparation,
    origin,

    confidence,
  } = useLocalSearchParams();

  return (
    <ResultView
      imageUrl={imageUrl as string}
      photographerName={photographerName as string}
      photographerUrl={photographerUrl as string}
      commonName={commonName as string}
      scientificName={scientificName as string}
      family={family as string}
      description={description as string}
      medicinalProperties={
        medicinalProperties
          ? JSON.parse(medicinalProperties as string)
          : []
      }
      uses={uses as string}
      preparation={preparation as string}
      origin={origin as string}
      confidence={Number(confidence)}
    />
  );
}