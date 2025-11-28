<script lang="ts">
  import { initSession, SESSION_STORAGE_KEY } from "$lib/auth/session.svelte.js";
  import { retry } from "$lib/utils/index.js";

  import type { Snippet } from "svelte";

  import { isHttpStatusError } from "@a-novel/nodelib-browser/http";
  import type { AuthenticationApi } from "@a-novel/service-authentication-rest";

  interface Props {
    api: AuthenticationApi;
    children: Snippet;
    sessionStorageKey?: string;
    sessionContextKey?: string;
  }
  let {
    children,
    api,
    sessionStorageKey = SESSION_STORAGE_KEY,
    sessionContextKey = SESSION_STORAGE_KEY
  }: Props = $props();

  const session = initSession(api, sessionContextKey, sessionStorageKey);

  // If there is no access token available, retrieve one.
  $effect(() => {
    if (!session.accessToken) {
      retry(session.newAnonymous)();
    }
  });

  // If claims are missing, retrieve them. Not anonymous getSession do have claims.
  $effect(() => {
    if (session.accessToken && !session.claims) {
      const refresher = retry(session.syncClaims, { condition: (err) => !isHttpStatusError(err, 401) });
      refresher().catch(session.catchRefreshSessionOnSessionError);
    }
  });
</script>

<!-- Only render children if an access token is available. -->
{@render children()}
