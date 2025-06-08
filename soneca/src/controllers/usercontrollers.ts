import { Request, Response } from 'express';

let id = 0;
type User = {
  id: number;
  name: string;
  email: string;
};
let users_list: User[] = [];

export class usercontrollers{
    
    static GetbyId (req:Request, res:Response) {
        res.send(users_list.find(user => user.id === Number(req.params.id)))
    }  
    
    static GetAll (req:Request, res:Response) {
        res.send(users_list)
    }  
    
    static PutUser (req:Request, res:Response) {
        let _body = req.body
        let _id = Number(req.params.id)
        let IndexOF = users_list.findIndex(user => user.id === _id)
        users_list[IndexOF].name = _body.name;
        users_list[IndexOF].email = _body.email;
        res.send({message: "Usuário atualizado com sucesso!"})
    }

    static DeleteUser (req:Request, res:Response) {
        let userIndex = users_list.findIndex(user => user.id === Number(req.params.id));
        if (userIndex !== -1) {
        users_list.splice(userIndex, 1)
        res.send({message: "Usuário apagado com sucesso!"})
        } else {
        res.send({message: "ERRO 404"})
        } 
    }

    static PostUser (req:Request, res:Response) {
        let user = req.body;
        user.id = ++id;
        users_list.push(user);
        res.send({ message: "Usuário adicionado com sucesso!"})
    }

    static Gethome (req:Request, res:Response) {
        res.send("<h3>Home</h3>")
    }
    }