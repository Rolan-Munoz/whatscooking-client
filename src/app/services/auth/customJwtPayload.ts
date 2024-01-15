import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    id: number;
    role:string[];
}