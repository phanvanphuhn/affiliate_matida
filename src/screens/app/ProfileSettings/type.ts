import { TypeOfPregnancy } from "./enum";

export interface IFormik {
    avatar: string;
    name: string;
    email: string;
    phoneNumber: string;
    dueDate: Date;
    babyName: string;
    typeOfPregnancy: TypeOfPregnancy | string; 
}