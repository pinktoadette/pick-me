import "./globals.css";
import Script from 'next/script'

export const metadata = {
  title: "Pick Me 💌",
  description:
    "Set up a few hidden cards for someone, they tap one, and chance picks the plan.",
  keywords: ["pick a card", "chance", "game", "dating", "introverts", "shy", "social anxiety", "fun", "playful", "flirty", "romantic", "ask a girl out", "ask a guy out", "pick a plan", "pick a date", "pick a time", "pick a place"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pick Me",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='88'%3E%F0%9F%92%8C%3C/text%3E%3C/svg%3E",
      },
    ],
  },
  openGraph: {
    title: "Pick Me 💌",
    description:
      "Pick a card, any card — tap a card and let chance pick the plan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick Me 💌",
    description:
      "Pick a card, any card — tap a card and let chance pick the plan.",
  },
};

export const viewport = {
  themeColor: "#f4c2c2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-PJ0HJMV1QK"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PJ0HJMV1QK');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
