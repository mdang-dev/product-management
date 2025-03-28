import { Category } from "./category.model";

export type Product =  {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    imageFile?: FileList;
    category?: Category;
    quantity?: number;
    price?: number;
    createAt?: Date;
    updateAt?: Date;
}