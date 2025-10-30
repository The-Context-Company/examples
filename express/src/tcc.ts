import { TCCSpanProcessor } from "@contextcompany/otel";
import { NodeSDK } from "@opentelemetry/sdk-node";

export const tcc = new NodeSDK({
  spanProcessors: [
    new TCCSpanProcessor({
      apiKey: process.env.TCC_API_KEY,
    }),
  ],
});

// For development mode:
// export const tcc = new NodeSDK({
//   spanProcessors: [
//     new TCCSpanProcessor({
//       apiKey: process.env.TCC_API_KEY,
//       otlpUrl: "https://dev.thecontext.company/v1/traces",
//     }),
//   ],
// });
