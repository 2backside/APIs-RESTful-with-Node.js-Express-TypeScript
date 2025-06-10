import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";
import { NotFound } from "../errors/not-found.error";

export class UserService {
    async GetAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[];
    }

    async PutUser(id: string, name: string, email: string): Promise<{ message: string }> {
        const DocRef = getFirestore().collection("users").doc(id);

        if ((await (DocRef.get())).exists) {
            await DocRef.set({
                name: name,
                email: email
            })
            return ({ message: "Usuário atualizado com sucesso!" })
        } else {
            throw new NotFound("ID do usuário não encontrado.")
        };
    }

    async DeleteUser(id: string): Promise<void> {
        await getFirestore().collection("users").doc(id).delete();
    }

    async PostUser(name: string, email: string): Promise<{ message: string }> {
        await getFirestore().collection("users").add({
            name: name,
            email: email
        }); return ({ message: "Usuário adicionado com sucesso!" });

    }

    async GetById(id: string): Promise<{id: string}> {
        const snapshot = await getFirestore().collection("users").doc(id).get();
        if (snapshot.exists) {
            return ({
                id: snapshot.id,
                ...snapshot.data()
            });
        }
        else {
            throw new NotFound("ID do usuário não encontrado.")
        }
    }
}
