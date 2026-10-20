/**
 * Beehiiv subscription helpers for Bot Bay signups.
 * Pure module: no Next.js or package imports. Safe under
 * node --experimental-strip-types.
 */

export type SignupList = "launch-log" | "setup-waitlist";

export type BeehiivConfig = {
  apiKey: string;
  publicationId: string;
};

export function getBeehiivConfig(
  env: Record<string, string | undefined>
): BeehiivConfig | null {
  const apiKey = (env.BEEHIIV_API_KEY ?? "").trim();
  const publicationId = (env.BEEHIIV_PUBLICATION_ID ?? "").trim();
  if (!apiKey || !publicationId) {
    return null;
  }
  return { apiKey, publicationId };
}

export function buildSubscriptionRequest(
  email: string,
  list: SignupList,
  config: BeehiivConfig
): { url: string; init: RequestInit } {
  const url =
    "https://api.beehiiv.com/v2/publications/" +
    encodeURIComponent(config.publicationId) +
    "/subscriptions";

  // utm_campaign distinguishes the two lists for now; a Beehiiv custom field or tag could replace it later.
  const body = JSON.stringify({
    email,
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: "mdjstudios-bots",
    utm_medium: "website",
    utm_campaign: list,
  });

  return {
    url,
    init: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + config.apiKey,
        "Content-Type": "application/json",
      },
      body,
    },
  };
}

export async function createBeehiivSubscription(
  email: string,
  list: SignupList,
  config: BeehiivConfig,
  fetchImpl: typeof fetch = fetch
): Promise<{ ok: true } | { ok: false; status: number }> {
  const { url, init } = buildSubscriptionRequest(email, list, config);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetchImpl(url, {
      ...init,
      signal: controller.signal,
    });

    if (response.status >= 200 && response.status < 300) {
      return { ok: true };
    }

    console.error("[bots-signup] Beehiiv request failed", response.status);
    return { ok: false, status: response.status };
  } catch {
    console.error("[bots-signup] Beehiiv request failed", 0);
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(timeoutId);
  }
}
