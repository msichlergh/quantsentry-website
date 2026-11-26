import type { Metadata } from "next";

import { BookDemoContactIbmc } from "@/components/BookDemoContactIbmc";
import { BookDemoBookingIbmc } from "@/components/BookDemoWizardIbmc";
import { pages } from "@/lib/pages";

import { buildMetadata } from "../_seo/metadata";

import "../demo/book-demo.css";

// IBMC integration test: a copy of /demo whose demo wizard and contact form
// post to IBMC through /api/ibmc-lead. Not in lib/pages.ts, so not in the sitemap, and
// noindex so it never competes with /demo.
export const metadata: Metadata = buildMetadata({
  title: pages.demo.title,
  description: pages.demo.description,
  path: "/demo2",
  robots: { index: false, follow: false },
});

export default function Demo2Page() {
  return (
    <main className="page-content">
      {/* Hero. */}
      <section className="hero dots bd-hero">
        <div className="wrap">
          <div className="kicker">
            <span className="dot" />
            <span>Book a Demo</span>
          </div>
          <h1>
            See QuantSentry <span className="c">on your own data.</span>
          </h1>
          <p className="lede">
            A twenty minute call. We walk you through the platform, connect read only access,
            and you get your first findings within a week.
          </p>
        </div>
      </section>

      {/* Demo wizard, posting to IBMC. Four steps: the schedule step is on
          hold until IBMC booking is settled. /demo keeps the GHL wizard. */}
      <section className="bd-focus">
        <BookDemoBookingIbmc />
      </section>

      {/* How you turn it on — carried over from the previous demo page. */}
      <section className="theme-light">
        <div className="wrap">
          <div className="kicker">
            <span className="dot" />
            <span>How You Turn It On</span>
          </div>
          <h2>
            Three steps,
            <br />
            <span className="c">and nothing built on your side.</span>
          </h2>
          <div className="grid g3" style={{ marginTop: 30 }}>
            <div className="panel">
              <div style={{ padding: "22px 24px" }}>
                <div className="eyebrow" style={{ color: "var(--cy)" }}>01</div>
                <h3 style={{ marginTop: 12 }}>Send a read only key</h3>
                <p style={{ marginTop: 9, fontSize: 14 }}>Takes minutes. Nothing installed, nothing built.</p>
              </div>
            </div>
            <div className="panel">
              <div style={{ padding: "22px 24px" }}>
                <div className="eyebrow" style={{ color: "var(--cy)" }}>02</div>
                <h3 style={{ marginTop: 12 }}>We connect your platforms</h3>
                <p style={{ marginTop: 9, fontSize: 14 }}>
                  MetaTrader 5 and 4, cTrader, DXtrade, TradeLocker, Match-Trader, ThinkTrader
                  and Sirix.
                </p>
              </div>
            </div>
            <div className="panel">
              <div style={{ padding: "22px 24px" }}>
                <div className="eyebrow" style={{ color: "var(--cy)" }}>03</div>
                <h3 style={{ marginTop: 12 }}>Your first findings arrive</h3>
                <p style={{ marginTop: 9, fontSize: 14 }}>
                  Inside a week, with the evidence already written.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to us: this copy posts to IBMC, not to the wizard's pipeline. When
          IBMC returns a booking link, the form offers "Choose a time". */}
      <section>
        <div className="wrap">
          <div className="grid g2" style={{ gap: 44, alignItems: "start" }}>
            <div>
              <div className="kicker">
                <span className="dot" />
                <span>Talk to Us</span>
              </div>
              <h2>
                Send a message.
                <br />
                <span className="c">Then pick a time to talk.</span>
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Sales, product and partnership questions all land with the team directly. Once
                your message is in, you can choose a time for a call, or wait for our reply
                within 24 hours.
              </p>
            </div>
            <div className="panel bd-panel">
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Send us a message</h3>
                <BookDemoContactIbmc />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
