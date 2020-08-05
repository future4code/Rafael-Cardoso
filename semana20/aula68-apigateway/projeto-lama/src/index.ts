import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import cors from 'cors';
import { userRouter } from "./router/userRouter";
import { bandRouter } from "./router/bandRouter";
import { showRouter } from "./router/showRouter";

if (process.env.NODE_ENV !== 'serverless') {
  dotenv.config();
}

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.use("/user", userRouter);

app.use('/band', bandRouter);

app.use('/show', showRouter);

if (process.env.NODE_ENV !== 'serverless') {
  const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });
}