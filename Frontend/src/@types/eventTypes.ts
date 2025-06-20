export type TEvent = {
    id?: number;
    title: string;
    description: string;
    location: string;
    event_date: string;
    duration?: number;
    price: number;
    url: string;
    seats_avaible: number;
    intervenant?: string;
    image?: string;
    image_public_id?: string;
};
