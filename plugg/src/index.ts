import express, {Request, Response} from "express";
import { routes } from "./routes/index"

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send('OIIII SAFADAO');
});

routes(app)

app.listen(3000, () => {
    console.log('servidor ativo na porta 3000');
});