import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.models";

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

    async PutUser(id: string, user: User): Promise<void | boolean> {
        const DocRef = getFirestore().collection("users").doc(id);

        if ((await (DocRef.get())).exists) {
            await DocRef.set({
                name: user.name,
                email: user.email
            })
        } else { return false}
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

    async GetById(id: string): Promise<User | boolean> {
        const snapshot = await getFirestore().collection("users").doc(id).get();
        if (snapshot.exists) {
            return ({
                id: snapshot.id,
                ...snapshot.data()
            }) as User
        } else { return false }
    }
}
