import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Product } from "./product";

export class ProductData implements InMemoryWebApiModule {

    createDb() {
        const products: Product[] = [
            { id: 1, productName: "iPhone", description: "iPhone is iPhone" },
            { id: 2, productName: "OLED TV", description: "The best of Samsung" },
            { id: 3, productName: "PlayStation 5", description: "Play has no limits" },
        ]

        return { products };
    }
}