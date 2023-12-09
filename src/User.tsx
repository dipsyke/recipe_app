import {Recipe} from "./Recipe.tsx";

export interface User {
    userName: string;
    password: string;
    recipes: Recipe[]
}