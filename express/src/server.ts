import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import express, { Request, Response } from "express";
import cors from "cors";
import { tcc } from "./tcc.js";

import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

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
