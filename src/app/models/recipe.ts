export interface Recipe {
    id: number;
    tittle: string;
    ingredients: string[];
    description: string;
    instructions: string;
    userId: number;
    image?: any; // Este campo es opcional
    video?: any; // Este campo es opcional
}
