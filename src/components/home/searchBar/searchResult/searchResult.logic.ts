import { useMemo } from "react";

import { Plant } from "@services/plants/plants.service";

export const useSearchResult = (
    plants: Plant[],
    search: string
) => {
    const filteredPlants = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if(!keyword){
            return [];
        }

        return plants.filter((plant) => {
            return(
                plant.commonName
                    .toLowerCase()
                    .includes(keyword) ||
                plant.scientificName
                    .toLowerCase()
                    .includes(keyword)||
                plant.aliases.some(alias => 
                    alias
                        .toLowerCase()
                        .includes(keyword)
                )
            );
        });
    }, [plants, search]);

    return {
        filteredPlants,
    }
}