import { useEffect, useMemo, useState } from "react";

import {
    getAllPlants,
    Plant,
} from "@services/plants/plants.service";

export const usePlantSearch = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlants = async () => {
            try{
                setLoading(true);

                const data = await getAllPlants();

                setPlants(data);
            } catch (error)
            {
                console.log("Failed to log plants", error);
            } finally 
            {
                setLoading(false);
            }
        };

        loadPlants();
    }, []);


    const filteredPlants = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if(!keyword){
            return plants;
        }

        return plants.filter((plant) => {
            const commonName = plant.commonName.toLowerCase();
            const scientificName = plant.scientificName.toLowerCase();

            const aliases = 
                plant.aliases?.some((alias) =>
                    alias.toLocaleLowerCase().includes(keyword))
                    ?? false ;

            return (
                commonName.includes(keyword) ||
                scientificName.includes(keyword) ||
                aliases
            );
        });
    }, [plants, search]);

    return{
        plants,
        filteredPlants,
        search,
        setSearch,
        loading,
    }
}