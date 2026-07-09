import { db } from "./firebaseAdmin";
import { categories } from "./data/categories";
import { plants } from "./data/plant";

async function seed() {
    console.log("Seeding categories...");

    for (const category of categories) {
        await db
            .collection("categories")
            .doc(category.id)
            .set(category);
    }

    console.log("Categories seeded.");

    console.log("Seeding plants...");

    for (const plant of plants) {
        await db
            .collection("plants")
            .doc(plant.id)
            .set(plant);
    }

    console.log("Plants seeded.");
    console.log("Done!");
}

seed().catch(console.error);