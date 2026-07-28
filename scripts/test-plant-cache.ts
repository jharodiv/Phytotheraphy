import { getPlant } from "@services/plants/plant-cache/plant-cache.service";

async function testPlantCache() {
    try {
        console.log("===== TEST 1 =====");
        console.log("Requesting plant...");

        const plant = await getPlant("Vitex negundo");

        console.log("Plant received:");
        console.log(JSON.stringify(plant, null, 2));

        console.log("===== TEST COMPLETE =====");
    } catch (error) {
        console.error("Test failed:");
        console.error(error);
    }
}

testPlantCache();