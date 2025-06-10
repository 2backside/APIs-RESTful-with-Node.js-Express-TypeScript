import { Joi } from "celebrate";

export type User = {
    nome: string;
    email: string;
    password: string;
    id: string;
}

export const userSchema = Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
