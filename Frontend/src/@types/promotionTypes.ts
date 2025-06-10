

export type TPromotion = {
    id: number;
    title: string;
    description: string;
    type: "percentage" | "fixed";
    value: number;
    start_date: string;
    end_date: string;
    products?: TProductPromo[]; 
  };

  export type TProductPromo = {
    id: number;
    title: string;
  };