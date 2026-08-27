import ResultView from "@components/scan/result/resultView";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const {
    imageUrl,
    commonName,
    scientificName,

    family,
    description,
    medicinalProperties,

    uses,
    preparationMethod,
    origin,
    sideEffect,

    verified,
  } = useLocalSearchParams();

  const plantDetails = {
    family: family as string,
    description: description as string,

    medicinalProperties:
      medicinalProperties
        ? JSON.parse(
          medicinalProperties as string
        )
        : [],

    uses: uses as string,
    preparationMethod:
      preparationMethod as string,

    origin: origin as string,
    sideEffect: sideEffect as string,

    verified:
      Array.isArray(verified)
        ? verified[0] === "true"
        : verified === "true",
  };

  const plantImage = {
    imageUrl: imageUrl as string,
    commonName: commonName as string,
    scientificName: scientificName as string,
  };

  return (
    <ResultView
      plantDetails={plantDetails}
      plantImage={plantImage}
    />
  );
}