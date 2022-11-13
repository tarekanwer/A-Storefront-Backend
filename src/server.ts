import  express , { Request, Response } from "express";
import bodyParser from "body-parser";
import OrderRoutes from "./handlers/orders";
import ProductRoutes from "./handlers/products";
import UserRoutes from "./handlers/users";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

OrderRoutes(app);
ProductRoutes(app);
UserRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
