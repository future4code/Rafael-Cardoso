import { app } from "./";
import { createLambdaHandler } from "lbn-lambda-express";

export const handler = createLambdaHandler(app);
