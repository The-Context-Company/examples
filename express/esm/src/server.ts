import type { Request, Response } from "express";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { tcc } from "./tcc";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// start collecting AI SDK related telemetry
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

process.on("SIGINT", async () => {
  await tcc.shutdown(); // this will immediately export any unexported spans
  process.exit(0);
});
