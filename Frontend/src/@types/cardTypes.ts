import { Tcategory } from "./catTypes";
import { TPromotion } from "./promotionTypes";
import { TSupplier } from "./supplierTypes";

export type TProduct = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    category_id: number;
    supplier_id: number;
    is_featured: boolean;

    category?: Tcategory;

    supplier?: TSupplier;

    promotions?: TPromotion[];
};

export type TProductPromo = {
    id: number;
    title: string;
};
