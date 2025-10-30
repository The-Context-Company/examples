import { openai } from "@ai-sdk/openai";
import express, { Request, Response } from "express";
import cors from "cors";
import { tcc } from "./tcc.js";
import * as ai from "ai";

import { initLogger, wrapAISDK } from "braintrust";

const app = express();
app.use(express.json());
app.use(cors());

// TCC is completely compatible with Braintrust.
initLogger({
  projectName: "My AI Project",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

const { streamText } = wrapAISDK(ai);

tcc.start();

app.get("/", async (req: Request, res: Response) => {
  const result = streamText({
    model: openai("gpt-4o"),
    prompt: "Why did the chicken cross the road?",
    experimental_telemetry: {
      isEnabled: true,
    },
  });
  result.pipeUIMessageStreamToResponse(res);
});

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`);
});

process.on("SIGINT", () => {
  tcc.shutdown();
  process.exit(0);
});
