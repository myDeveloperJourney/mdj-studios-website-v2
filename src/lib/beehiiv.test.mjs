import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getBeehiivConfig,
  buildSubscriptionRequest,
  createBeehiivSubscription,
} from "./beehiiv.ts";

test("getBeehiivConfig returns null when either var is missing or blank", () => {
  assert.equal(getBeehiivConfig({}), null);
  assert.equal(getBeehiivConfig({ BEEHIIV_API_KEY: "key" }), null);
  assert.equal(getBeehiivConfig({ BEEHIIV_PUBLICATION_ID: "pub" }), null);
  assert.equal(
    getBeehiivConfig({ BEEHIIV_API_KEY: "", BEEHIIV_PUBLICATION_ID: "pub" }),
    null
  );
  assert.equal(
    getBeehiivConfig({ BEEHIIV_API_KEY: "key", BEEHIIV_PUBLICATION_ID: "  " }),
    null
  );
  assert.equal(
    getBeehiivConfig({ BEEHIIV_API_KEY: "  ", BEEHIIV_PUBLICATION_ID: "pub" }),
    null
  );
});

test("getBeehiivConfig returns trimmed values when both set", () => {
  assert.deepEqual(
    getBeehiivConfig({
      BEEHIIV_API_KEY: "  test-key  ",
      BEEHIIV_PUBLICATION_ID: "  pub_test  ",
    }),
    { apiKey: "test-key", publicationId: "pub_test" }
  );
});

function assertRequestForList(list) {
  const config = { apiKey: "test-key", publicationId: "pub_test" };
  const { url, init } = buildSubscriptionRequest(
    "user@example.com",
    list,
    config
  );

  assert.equal(
    url,
    "https://api.beehiiv.com/v2/publications/pub_test/subscriptions"
  );
  assert.equal(init.method, "POST");
  assert.equal(init.headers.Authorization, "Bearer test-key");
  assert.equal(init.headers["Content-Type"], "application/json");

  const body = JSON.parse(init.body);
  assert.equal(body.email, "user@example.com");
  assert.equal(body.reactivate_existing, false);
  assert.equal(body.send_welcome_email, true);
  assert.equal(body.utm_source, "mdjstudios-bots");
  assert.equal(body.utm_medium, "website");
  assert.equal(body.utm_campaign, list);
}

test("buildSubscriptionRequest fields for launch-log", () => {
  assertRequestForList("launch-log");
});

test("buildSubscriptionRequest fields for setup-waitlist", () => {
  assertRequestForList("setup-waitlist");
});

test("createBeehiivSubscription returns ok true on 201", async () => {
  const config = { apiKey: "test-key", publicationId: "pub_test" };
  const result = await createBeehiivSubscription(
    "user@example.com",
    "launch-log",
    config,
    async () => ({ status: 201 })
  );
  assert.deepEqual(result, { ok: true });
});

test("createBeehiivSubscription returns ok false with status on 400", async () => {
  const config = { apiKey: "test-key", publicationId: "pub_test" };
  const result = await createBeehiivSubscription(
    "user@example.com",
    "launch-log",
    config,
    async () => ({ status: 400 })
  );
  assert.deepEqual(result, { ok: false, status: 400 });
});

test("createBeehiivSubscription returns status 0 when fetch throws", async () => {
  const config = { apiKey: "test-key", publicationId: "pub_test" };
  const result = await createBeehiivSubscription(
    "user@example.com",
    "setup-waitlist",
    config,
    async () => {
      throw new Error("network");
    }
  );
  assert.deepEqual(result, { ok: false, status: 0 });
});
