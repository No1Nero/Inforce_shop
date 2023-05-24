export interface IProduct {
    id: number,
    imageUrl: string,
    name: string,
    count: number,
    size: [
        width: number,
        height: number
    ],
    weight: number,
    comments: IComment[]
};

export interface IComment {
    id: number,
    productId: number,
    description: string,
    date: string
};