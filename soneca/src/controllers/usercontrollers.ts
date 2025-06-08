import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

type User = {
  id: number;
  name: string;
  email: string;
};

export class usercontrollers{
    
    static async GetById (req: Request, res:Response){
        const id = req.params.id
        const snapshot = await getFirestore().collection("users").doc(id).get();
        res.send({
            id: snapshot.id,
            ...snapshot.data()
        })

    }  
    
    static async GetAll (req:Request, res:Response) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.send(users)

    } 
    
    static async PutUser (req:Request, res:Response) {
        const id = req.params.id
        const body = req.body as User
        await getFirestore().collection("users").doc(id).set({
            name: body.name,
            email: body.email
        });
        res.send({message: "Usuário atualizado com sucesso!"})

    }

    static async DeleteUser (req:Request, res:Response) {
        const id = req.params.id 
        await getFirestore().collection("users").doc(id).delete();
        res.send({message: "Usuário deletado com sucesso!"})

    }

    static async PostUser (req:Request, res:Response) {
        let user = req.body as User
        await getFirestore().collection("users").add({
            name: user.name,
            email: user.email
        })
        res.status(201).send({ message: "Usuário adicionado com sucesso!"})

    }

    static Gethome (req:Request, res:Response) {
        res.send("<h3>Home</h3>")
    }
    }