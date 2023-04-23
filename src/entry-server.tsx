import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";

import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://your-ingestion-url.sentry.io",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

export default createHandler(
  renderAsync((event) => <StartServer event={event} />)
);
