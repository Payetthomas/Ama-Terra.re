import { TProduct } from "./cardTypes"

export type TPromotion = {
    id: number,
    title: string,
    description: string,
    type: "percentage" | "fixed";
    value?: number,
    start_date: string,
    end_date: string,
    product_id: number,
    product: TProduct,
}; 