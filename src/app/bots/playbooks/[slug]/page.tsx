import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import CopyButton from "@/components/bots/CopyButton";
import {
  getAllPlaybooks,
  getPlaybookBySlug,
  type PlaybookMeta,
} from "@/lib/bots";
import styles from "../../bots.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPlaybooks().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);
  if (!playbook) return {};
  return {
    title: playbook.title,
    description: playbook.excerpt,
  };
}

const TOC = [
  { href: "#pb-what", label: "What it does" },
  { href: "#pb-who", label: "Who it's for" },
  { href: "#pb-scope", label: "Scope" },
  { href: "#pb-conn", label: "Connectors" },
  { href: "#pb-routines", label: "Routines" },
  { href: "#pb-rules", label: "Approval rules" },
  { href: "#setup-prompt", label: "Setup prompt" },
  { href: "#pb-related", label: "Related" },
] as const;

function isAskApproval(value: string): boolean {
  const v = value.toLowerCase();
  return v.includes("ask") || v.includes("approv");
}

function RelatedCard({
  pb,
  index,
}: {
  pb: PlaybookMeta;
  index: number;
}) {
  return (
    <Link className={styles.card} href={`/bots/playbooks/${pb.slug}`}>
      <div
        className={`${styles.ph} ${styles.cardPh}`}
        data-label="Playbook image"
      />
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <span className={styles.tag}>{pb.category}</span>
          <span className={`${styles.mono} ${styles.muted}`}>
            #{String(index + 1).padStart(3, "0")}
          </span>
        </div>
        <h3>{pb.title}</h3>
        <p>{pb.excerpt}</p>
        <div className={styles.foot}>
          <span>{pb.connectorsSummary}</span>
          <span>{pb.routinesSummary}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = getPlaybookBySlug(slug);
  if (!playbook) notFound();

  const all = getAllPlaybooks();
  const orderIndex = all.findIndex((p) => p.slug === playbook.slug);
  const related = playbook.related
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is PlaybookMeta => Boolean(p));

  const body = playbook.content.trim();
  const promptLabel = `${playbook.slug}.prompt`;

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.pbHero}>
          <div>
            <div className={styles.crumbs}>
              <Link href="/bots">Home</Link>
              {" / "}
              <Link href="/bots/playbooks">Playbooks</Link>
              {` / ${playbook.title}`}
            </div>
            <span className={styles.eyebrow}>
              Playbook {String(orderIndex + 1).padStart(3, "0")} /{" "}
              {playbook.category}
            </span>
            <h1>{playbook.title}</h1>
            <p className={styles.pbExcerpt}>{playbook.excerpt}</p>
            <div className={styles.btnRow}>
              <a
                className={`${styles.btn} ${styles.btnSolid}`}
                href="#setup-prompt"
              >
                Get the setup prompt <span className={styles.arr}>&darr;</span>
              </a>
              <Link className={styles.btn} href="/bots/playbooks">
                Back to all playbooks
              </Link>
            </div>
          </div>
          <div
            className={styles.ph}
            data-label="Playbook illustration 4:3"
          />
        </div>

        <div className={styles.facts}>
          <div className={styles.fact}>
            <span className={styles.factK}>Difficulty</span>
            <span className={styles.factV}>{playbook.difficulty}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factK}>Setup time</span>
            <span className={styles.factV}>{playbook.setupTime}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factK}>Connectors</span>
            <span className={styles.factV}>{playbook.connectorsSummary}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factK}>Routines</span>
            <span className={styles.factV}>{playbook.routinesSummary}</span>
          </div>
        </div>

        <div className={styles.pbLayout}>
          <nav className={styles.toc} aria-label="On this page">
            {TOC.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={i === 0 ? styles.tocCur : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div>
            <section className={styles.pbSec} id="pb-what">
              <span className={styles.eyebrow}>01</span>
              <h2>What it does</h2>
              <p>{playbook.whatItDoes}</p>
            </section>

            <section className={styles.pbSec} id="pb-who">
              <span className={styles.eyebrow}>02</span>
              <h2>{"Who it's for"}</h2>
              <div className={styles.two}>
                <div className={`${styles.box} ${styles.boxYes}`}>
                  <h3>Great fit</h3>
                  <ul>
                    {playbook.greatFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.box} ${styles.boxNo}`}>
                  <h3>Not a fit</h3>
                  <ul>
                    {playbook.notAFit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.pbSec} id="pb-scope">
              <span className={styles.eyebrow}>03</span>
              <h2>Scope</h2>
              <div className={styles.scopeStatement}>
                {playbook.scopeStatement}
              </div>
              <div className={styles.two}>
                <div className={`${styles.box} ${styles.boxYes}`}>
                  <h3>In scope</h3>
                  <ul>
                    {playbook.inScope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.box} ${styles.boxNo}`}>
                  <h3>Anti-jobs (hand off or refuse)</h3>
                  <ul>
                    {playbook.antiJobs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.pbSec} id="pb-conn">
              <span className={styles.eyebrow}>04</span>
              <h2>Connectors</h2>
              <p>
                Least privilege by default. Connect only what the job needs, at
                the lowest permission that works.
              </p>
              <div className={styles.conn}>
                {playbook.connectors.map((c) => (
                  <div key={c.name} className={styles.connCard}>
                    <div className={`${styles.ph} ${styles.connIc}`} />
                    <h4>{c.name}</h4>
                    <span
                      className={`${styles.perm}${
                        /write/i.test(c.permission) ? ` ${styles.permWrite}` : ""
                      }`}
                    >
                      {c.permission}
                    </span>
                    <span className={styles.connReq}>
                      {c.required ? "Required" : "Optional"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.pbSec} id="pb-routines">
              <span className={styles.eyebrow}>05</span>
              <h2>Routines</h2>
              <div className={styles.tblWrap}>
                <table className={styles.routinesTable}>
                  <thead>
                    <tr>
                      <th>Routine</th>
                      <th>Schedule</th>
                      <th>What it does</th>
                      <th>Output</th>
                      <th>Approval</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playbook.routines.map((r) => (
                      <tr key={r.name}>
                        <td>{r.name}</td>
                        <td>
                          <span className={styles.mono}>{r.schedule}</span>
                        </td>
                        <td>{r.what}</td>
                        <td>{r.output}</td>
                        <td>
                          <span
                            className={`${styles.pill}${
                              isAskApproval(r.approval)
                                ? ` ${styles.pillAsk}`
                                : ""
                            }`}
                          >
                            {r.approval}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.pbSec} id="pb-rules">
              <span className={styles.eyebrow}>06</span>
              <h2>Approval rules</h2>
              <div className={styles.rules}>
                <div className={styles.rule}>
                  <span className={styles.ruleLvl}>Level 1 / Just do it</span>
                  <h3>Free to act</h3>
                  <ul>
                    {playbook.approval.free.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.rule}>
                  <span className={styles.ruleLvl}>Level 2 / Ask first</span>
                  <h3>Needs approval</h3>
                  <ul>
                    {playbook.approval.ask.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${styles.rule} ${styles.ruleOff}`}>
                  <span className={styles.ruleLvl}>Level 3 / Never</span>
                  <h3>Off limits</h3>
                  <ul>
                    {playbook.approval.never.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.pbSec} id="setup-prompt">
              <span className={styles.eyebrow}>07</span>
              <h2>Setup prompt</h2>
              <p>
                Paste this into a new bot, then replace the bracketed parts with
                your own details.
              </p>
              <div className={styles.prompt}>
                <div className={styles.promptBar}>
                  <span className={`${styles.mono} ${styles.muted} ${styles.promptLabel}`}>
                    {promptLabel}
                  </span>
                  <CopyButton text={playbook.setupPrompt.trim()} />
                </div>
                <pre>{playbook.setupPrompt.trim()}</pre>
              </div>
              {body ? (
                <div className={styles.pbNote}>
                  <MDXRemote
                    source={body}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeSlug],
                      },
                    }}
                  />
                </div>
              ) : null}
            </section>

            {related.length > 0 && (
              <section className={styles.pbSec} id="pb-related">
                <span className={styles.eyebrow}>08</span>
                <h2>Related playbooks</h2>
                <div className={styles.grid}>
                  {related.map((pb) => {
                    const idx = all.findIndex((p) => p.slug === pb.slug);
                    return (
                      <RelatedCard key={pb.slug} pb={pb} index={idx} />
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
