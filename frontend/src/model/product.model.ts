export type Product = {
    id?: string;
    name?: string;
    description?: string;
    category?: string;
    imageUrl?:string;
    quantity: number;
    price?: number;
    createAt?: Date;
    updateAt?: Date;
}
