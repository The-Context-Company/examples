import { TCCSpanProcessor } from "@contextcompany/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";
import dotenv from "dotenv";

dotenv.config();

export const tcc = new NodeSDK({
  spanProcessors: [new TCCSpanProcessor({ debug: true })],
});
