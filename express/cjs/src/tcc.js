const { TCCSpanProcessor } = require("@contextcompany/otel");
const { NodeSDK } = require("@opentelemetry/sdk-node");

require("dotenv").config();

const tcc = new NodeSDK({
  spanProcessors: [new TCCSpanProcessor({ debug: true })],
});

module.exports = { tcc };
