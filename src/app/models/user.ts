import { Recipe } from "./recipe";
import { Role } from "./role";

export interface User {
    id:number;
    name:string;
    email:string;
    password:string;
    photo:string;
    roles: Role[];
    recipes?: Recipe[];
    
}