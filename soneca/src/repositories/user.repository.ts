import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";
import { NotFound } from "../errors/not-found.error";

export class UserRepository {

    async GetAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as User[];
    }

    async PutUser(user: User): Promise<void> {
        const DocRef = getFirestore().collection("users").doc(user.id);

        if ((await (DocRef.get())).exists) {
            await DocRef.set({
                id: user.id,
                name: user.name,
                email: user.email
            })
            throw new NotFound("Usuário não encontrado.");
        }
    }

    async DeleteUser(id: string): Promise<void> {
        await getFirestore().collection("users").doc(id).delete();

    }

    async PostUser(user: User): Promise<void> {
        await getFirestore().collection("users").add({
            name: user.name,
            email: user.email
        });
    }

    async GetById(id: string): Promise<{ id: string }> {
        const snapshot = await getFirestore().collection("users").doc(id).get();
        if (snapshot.exists) {
            return ({
                id: snapshot.id,
                ...snapshot.data()
            })
        } else { throw new NotFound("Usuário não encontrado.") }
    }
}
