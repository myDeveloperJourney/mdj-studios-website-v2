import "@/styles/globals.css";
import { AppProps } from "next/app";
import Script from "next/script";

type CrispCommand = [command: string, ...params: unknown[]];

declare global {
  interface Window {
    $crisp: CrispCommand[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      {/* Inline Script to Initialize Crisp Chat */}
      <Script id="crisp-chat-init" strategy="lazyOnload">
        {`
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "e22665a5-3cc5-4234-bd14-b5fea0d7b279";
        `}
      </Script>

      {/* External Crisp Chat Script */}
      <Script
        src="https://client.crisp.chat/l.js"
        strategy="lazyOnload"
      />
    </>
  );
}

