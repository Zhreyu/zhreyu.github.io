#!/usr/bin/env python3
"""Build the QUID microsite under zhreyu.github.io/quid/ from D-Search reports."""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # .../quid
PORTFOLIO = ROOT.parent
REPORTS = Path("/Users/shreyas/Github/D-Search/reports")
OUT = ROOT

TEAM = [
    ("22MIC7013", "Yuvraj Jha"),
    ("22MIC7014", "Lavanya Gupta"),
    ("22MIC7168", "Amardiya S. Mujeeb"),
    ("22MIC7084", "Shreyas S"),
]

ADVISOR = (
    "Dr. G. Muneeswari — Professor (Grade 2), "
    "Head of the Department of Data Science and Engineering, VIT-AP University"
)

WEEK_META = {
    1: ("Environment & Literature", "Month 1 · Week 1 of 12", "Foundation"),
    2: ("Infrastructure Complete", "Month 1 · Week 2 of 12", "Foundation"),
    3: ("Core Experiments", "Month 1 · Week 3 of 12", "Results"),
    4: ("Hypothesis Validated", "Month 1 · Week 4 of 12", "Results"),
    5: ("All Baselines Complete", "Month 2 · Week 1 of 12", "Science"),
    6: ("Ablations Complete", "Month 2 · Week 2 of 12", "Science"),
    7: ("Error Analysis & Paper Outline", "Month 2 · Week 3 of 12", "Science"),
    8: ("Paper Draft Complete", "Month 2 · Week 4 of 12", "Writing"),
    9: ("Revision & Reproducibility", "Month 3 · Week 1 of 12", "Polish"),
    10: ("Feedback Incorporated", "Month 3 · Week 2 of 12", "Polish"),
    11: ("Code Release & Presentation", "Month 3 · Week 3 of 12", "Polish"),
    12: ("Capstone Handoff", "Month 3 · Week 4 of 12", "Polish"),
    13: ("Agentic Extension", "Post Review 1 · Extension", "Agentic"),
    14: ("Agentic Benchmarks & Review 2", "Review 2 Prep · Extension", "Agentic"),
}


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def md_inline(text: str) -> str:
    text = esc(text)
    text = re.sub(r"`([^`]+)`", r'<code>\1</code>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    return text


def md_to_html(md: str) -> str:
    """Lightweight markdown → HTML (headings, lists, tables, code, quotes)."""
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    in_code = False
    code_buf: list[str] = []
    in_ul = False
    in_ol = False

    def close_lists():
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    while i < len(lines):
        line = lines[i]

        if line.startswith("```"):
            close_lists()
            if not in_code:
                in_code = True
                code_buf = []
            else:
                out.append("<pre><code>" + esc("\n".join(code_buf)) + "</code></pre>")
                in_code = False
            i += 1
            continue

        if in_code:
            code_buf.append(line)
            i += 1
            continue

        # Table block
        if "|" in line and i + 1 < len(lines) and re.match(r"^\s*\|?\s*-+", lines[i + 1]):
            close_lists()
            rows = []
            while i < len(lines) and "|" in lines[i]:
                if re.match(r"^\s*\|?\s*-+", lines[i]):
                    i += 1
                    continue
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                rows.append(cells)
                i += 1
            if rows:
                out.append("<table>")
                out.append("<thead><tr>" + "".join(f"<th>{md_inline(c)}</th>" for c in rows[0]) + "</tr></thead>")
                out.append("<tbody>")
                for row in rows[1:]:
                    out.append("<tr>" + "".join(f"<td>{md_inline(c)}</td>" for c in row) + "</tr>")
                out.append("</tbody></table>")
            continue

        if re.match(r"^#{1,3}\s", line):
            close_lists()
            level = len(line) - len(line.lstrip("#"))
            title = line.lstrip("#").strip()
            # Skip duplicate top title on thesis
            out.append(f"<h{min(level, 3)}>{md_inline(title)}</h{min(level, 3)}>")
            i += 1
            continue

        if line.startswith("> "):
            close_lists()
            quote = [line[2:]]
            i += 1
            while i < len(lines) and lines[i].startswith("> "):
                quote.append(lines[i][2:])
                i += 1
            out.append("<blockquote><p>" + "<br>".join(md_inline(q) for q in quote) + "</p></blockquote>")
            continue

        if re.match(r"^[-*]\s+", line):
            if not in_ul:
                close_lists()
                out.append("<ul>")
                in_ul = True
            item = re.sub(r"^[-*]\s+", "", line)
            out.append(f"<li>{md_inline(item)}</li>")
            i += 1
            continue

        if re.match(r"^\d+\.\s+", line):
            if not in_ol:
                close_lists()
                out.append("<ol>")
                in_ol = True
            item = re.sub(r"^\d+\.\s+", "", line)
            out.append(f"<li>{md_inline(item)}</li>")
            i += 1
            continue

        if line.strip() == "" or line.strip() == "---":
            close_lists()
            i += 1
            continue

        if line.startswith("**") and line.endswith("**") and line.count("**") == 2:
            close_lists()
            out.append(f"<p><strong>{md_inline(line.strip('*'))}</strong></p>")
            i += 1
            continue

        close_lists()
        out.append(f"<p>{md_inline(line)}</p>")
        i += 1

    close_lists()
    if in_code:
        out.append("<pre><code>" + esc("\n".join(code_buf)) + "</code></pre>")
    return "\n".join(out)


def team_html() -> str:
    members = "\n".join(
        f'<div class="team-member"><span>{esc(code)}</span>{esc(name)}</div>'
        for code, name in TEAM
    )
    return f"""
<div class="credits">
  <h3>Capstone team · Iksha Lab</h3>
  <div class="team-label">Students</div>
  {members}
  <p style="margin-top:14px"><strong>Done under the guidance of</strong><br>{esc(ADVISOR)}</p>
  <p style="margin-top:10px">Department of Data Science and Engineering · VIT-AP University</p>
</div>
"""


def shell(title: str, body: str, depth: int = 0, active: str = "") -> str:
    prefix = "../" * depth if depth else "./"
    if depth == 0:
        prefix = "./"
    nav = f"""
<header class="site-nav no-print">
  <a class="site-nav-brand" href="{prefix}">QUID</a>
  <nav class="site-nav-links">
    <a href="{prefix}" class="{'active' if active=='hub' else ''}">Overview</a>
    <a href="{prefix}thesis/" class="{'active' if active=='thesis' else ''}">Thesis</a>
    <a href="{prefix}pitch/" class="{'active' if active=='pitch' else ''}">Pitch</a>
    <a href="{prefix}weeks/" class="{'active' if active=='weeks' else ''}">Weeks</a>
    <a href="{prefix}assets/quid-paper-draft.pdf" target="_blank" rel="noreferrer">Draft PDF</a>
  </nav>
</header>
"""
    css = f"{prefix}assets/quid.css"
    js = f"{prefix}assets/site.js"
    mermaid = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{css}">
</head>
<body>
{nav}
{body}
<script src="{mermaid}"></script>
<script src="{js}"></script>
</body>
</html>
"""


def parse_week(md: str) -> dict:
    """Split week markdown into named sections."""
    sections: dict[str, list[str]] = {}
    current = "preamble"
    sections[current] = []
    for line in md.splitlines():
        if line.startswith("## "):
            current = line[3:].strip().lower()
            sections[current] = []
        else:
            sections.setdefault(current, []).append(line)

    def join(key_substr: str) -> str:
        for k, v in sections.items():
            if key_substr in k:
                return "\n".join(v).strip()
        return ""

    title_m = re.search(r"^#\s+(.+)$", md, re.M)
    title = title_m.group(1).strip() if title_m else "Week Report"

    # Extract first paragraph-ish from work completed for summary
    work = join("work completed")
    challenges = join("challenge")
    learnings = join("key learning") or join("learning")
    plan = join("plan for next") or join("next week") or join("plan")
    hours = join("hours")
    notes = join("notes for advisor") or join("advisor")
    objectives = join("objectives")
    motivation = join("motivation")
    results = join("result") or join("benchmark")

    return {
        "title": title,
        "objectives": objectives,
        "motivation": motivation,
        "work": work,
        "results": results,
        "challenges": challenges,
        "learnings": learnings,
        "plan": plan,
        "hours": hours,
        "notes": notes,
        "full": md,
    }


def expand_context(week_num: int, title: str) -> str:
    arcs = {
        range(1, 5): (
            "This week sits in Month 1 — building the substrate for QUID: environment, "
            "LLaDA porting, BEIR wiring, and the first signals of domain-dependent retrieval gains."
        ),
        range(5, 9): (
            "Month 2 deepens the science: full baselines, ablations, mechanism analysis "
            "(semantic anchoring / drift), and the first complete paper draft."
        ),
        range(9, 13): (
            "Month 3 focuses on polish — reproducibility, advisor feedback, code release, "
            "and presentation readiness — while locking the core thesis for Review 2."
        ),
        range(13, 15): (
            "This is an extension beyond the original 12-week plan, responding to Review 1: "
            "an agentic controller that decides when to call QUID, HyDE, or vanilla retrieval. "
            "The capstone still has one month remaining; a preprint is forthcoming."
        ),
    }
    for r, text in arcs.items():
        if week_num in r:
            return text
    return f"Week {week_num} continues the QUID capstone arc: {title}."


def build_week(week_num: int) -> None:
    path = REPORTS / f"week_{week_num:02d}.md"
    md = path.read_text(encoding="utf-8")
    data = parse_week(md)
    short, when, phase = WEEK_META[week_num]
    context = expand_context(week_num, short)
    status = (
        "Capstone in progress · Month 4 remaining · Preprint coming soon"
        if week_num >= 13
        else "Official 12-week arc · Capstone ongoing"
    )

    obj_html = md_to_html(data["objectives"] or "- Objectives recorded in source notes.")
    work_html = md_to_html(data["work"] or data["full"])
    # Prefer results subsection if present; else slice work
    results_src = data["results"] or data["work"]
    results_html = md_to_html(results_src)
    chal_html = md_to_html(data["challenges"] or "No major blockers recorded this week.")
    learn_html = md_to_html(data["learnings"] or "See work completed for takeaways.")
    plan_html = md_to_html(data["plan"] or "Continue per project roadmap.")
    hours_html = md_to_html(data["hours"]) if data["hours"] else ""
    notes_html = md_to_html(data["notes"]) if data["notes"] else ""
    motiv_html = md_to_html(data["motivation"]) if data["motivation"] else ""

    prev_link = f'../{week_num-1:02d}/' if week_num > 1 else '../'
    next_link = f'../{week_num+1:02d}/' if week_num < 14 else '../'
    prev_label = f"Week {week_num-1:02d}" if week_num > 1 else "All weeks"
    next_label = f"Week {week_num+1:02d}" if week_num < 14 else "All weeks"

    body = f"""
<main class="wrap wrap-wide">
  <div class="week-nav no-print">
    <a href="{prev_link}">← {esc(prev_label)}</a>
    <a href="../">All weeks</a>
    <a href="{next_link}">{esc(next_label)} →</a>
  </div>

  <div class="print-stack">
    <!-- PAGE 1: Cover -->
    <section class="page">
      <div class="kicker">QUID · {esc(when)} · {esc(phase)}</div>
      <h1 class="cover-title">Week {week_num:02d}<br><span>{esc(short)}</span></h1>
      <p class="cover-desc">{esc(context)}</p>
      <div class="status-row" style="margin-top:20px">
        <span class="chip accent">{esc(status)}</span>
      </div>
      <div class="cover-meta">
        <div>
          <div class="team-label">Team · Iksha Lab</div>
          {''.join(f'<div class="team-member"><span>{esc(c)}</span>{esc(n)}</div>' for c,n in TEAM)}
          <p class="explain" style="margin-top:14px"><strong style="color:var(--text)">Guidance:</strong> {esc(ADVISOR)}</p>
        </div>
        <div class="cover-week-big">{week_num:02d}</div>
      </div>
    </section>

    <!-- PAGE 2: Context & objectives -->
    <section class="page">
      <div class="page-header">
        <div class="page-header-left">QUID · Week {week_num}</div>
        <div class="page-header-right">Context &amp; objectives</div>
      </div>
      <div class="sec-eye">Why this week</div>
      <h2 class="sec-title">Place in the arc</h2>
      <div class="sec-rule"></div>
      <p class="explain">{esc(context)}</p>
      {"<div class='sec-eye'>Motivation</div><div class='prose'>" + motiv_html + "</div>" if motiv_html else ""}
      <div class="sec-eye" style="margin-top:28px">This week</div>
      <h2 class="sec-title">Objectives</h2>
      <div class="sec-rule"></div>
      <p class="explain">
        These objectives define what success looked like for Week {week_num}. Meeting them either
        unlocked the next experiment, closed a risk, or produced evidence for the thesis claim
        that diffusion expansion is domain-dependent.
      </p>
      <div class="prose">{obj_html}</div>
    </section>

    <!-- PAGE 3: Work completed -->
    <section class="page">
      <div class="page-header">
        <div class="page-header-left">QUID · Week {week_num}</div>
        <div class="page-header-right">Work completed</div>
      </div>
      <div class="sec-eye">Execution</div>
      <h2 class="sec-title">What we built and measured</h2>
      <div class="sec-rule"></div>
      <p class="explain">
        Below is the detailed record for the week — methods, implementation notes, and experimental
        setup — expanded from the team log so a reader can follow the technical path without the
        repository open.
      </p>
      <div class="prose">{work_html}</div>
    </section>

    <!-- PAGE 4: Results & interpretation -->
    <section class="page">
      <div class="page-header">
        <div class="page-header-left">QUID · Week {week_num}</div>
        <div class="page-header-right">Results &amp; interpretation</div>
      </div>
      <div class="sec-eye">Evidence</div>
      <h2 class="sec-title">Numbers and what they mean</h2>
      <div class="sec-rule"></div>
      <p class="explain">
        Metrics are only useful with interpretation. Where tables appear, read the deltas as
        claims about <em>when</em> QUID helps (vocabulary gap) versus when HyDE or vanilla wins
        (knowledge / claim gap). Agentic weeks emphasize tool-call policies over blind expansion.
      </p>
      <div class="prose">{results_html}</div>
    </section>

    <!-- PAGE 5: Challenges, learnings, next -->
    <section class="page">
      <div class="page-header">
        <div class="page-header-left">QUID · Week {week_num}</div>
        <div class="page-header-right">Reflection &amp; next</div>
      </div>
      <div class="sec-eye">Friction</div>
      <h2 class="sec-title">Challenges</h2>
      <div class="sec-rule"></div>
      <div class="prose">{chal_html}</div>

      <div class="sec-eye" style="margin-top:24px">Takeaways</div>
      <h2 class="sec-title">Key learnings</h2>
      <div class="sec-rule"></div>
      <div class="prose">{learn_html}</div>

      <div class="sec-eye" style="margin-top:24px">Forward</div>
      <h2 class="sec-title">Plan for next week</h2>
      <div class="sec-rule"></div>
      <div class="prose">{plan_html}</div>

      {"<div class='sec-eye' style='margin-top:24px'>Effort</div><h2 class='sec-title'>Hours logged</h2><div class='sec-rule'></div><div class='prose'>" + hours_html + "</div>" if hours_html else ""}
      {"<div class='sec-eye' style='margin-top:24px'>Advisor</div><h2 class='sec-title'>Notes for advisor</h2><div class='sec-rule'></div><div class='prose'>" + notes_html + "</div>" if notes_html else ""}

      <p class="footer-note">
        Capstone by Iksha Lab under guidance of {esc(ADVISOR)}.
        Status: Month 4 still in progress · Preprint coming soon.
      </p>
    </section>
  </div>
</main>
"""
    out_dir = OUT / "weeks" / f"{week_num:02d}"
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "index.html").write_text(
        shell(f"QUID · Week {week_num:02d} — {short}", body, depth=2, active="weeks"),
        encoding="utf-8",
    )
    print(f"wrote weeks/{week_num:02d}/")


def build_weeks_index() -> None:
    items = []
    for n in range(1, 15):
        short, when, phase = WEEK_META[n]
        items.append(
            f'<a href="./{n:02d}/"><span class="wnum">Week {n:02d} · {esc(phase)}</span>'
            f'<span class="wtitle">{esc(short)}</span></a>'
        )
    body = f"""
<main class="wrap">
  <p class="kicker">QUID · Weekly reports</p>
  <h1 class="hero-title">Fourteen weeks<br><span>of evidence</span></h1>
  <p class="lede">
    Detailed weekly logs (≥5 pages each) covering foundation, science, polish, and the
    post–Review 1 agentic extension. The official 12-week arc is documented; Weeks 13–14
    add the agentic controller. Capstone Month 4 is still underway — preprint coming soon.
  </p>
  <div class="status-row">
    <span class="chip accent">Weeks 1–12 · core thesis</span>
    <span class="chip">Weeks 13–14 · agentic extension</span>
    <span class="chip win">Month 4 in progress</span>
  </div>
  <div class="week-list">{''.join(items)}</div>
  {team_html()}
</main>
"""
    out = OUT / "weeks"
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(
        shell("QUID · Weekly reports", body, depth=1, active="weeks"),
        encoding="utf-8",
    )
    print("wrote weeks/index.html")


PIPELINE_MERMAID = """flowchart LR
  Q[User query] --> D[LLaDA masked diffusion]
  D --> E[Expanded query]
  E --> B[BGE-M3 embed]
  B --> R[Dense retrieve]
  R --> O[Ranked documents]
"""

AGENT_MERMAID = """flowchart TD
  Q[Query] --> F[Observe features + confidence]
  F --> P{Plan tool}
  P -->|vanilla| V[Skip expansion]
  P -->|QUID| U[Diffusion expand]
  P -->|HyDE| H[Hypothetical doc]
  V --> R[Retrieve]
  U --> R
  H --> R
  R --> C{Critique confidence}
  C -->|OK| A[Accept]
  C -->|Weak| T[Retry other tool]
  T --> R
"""

ANCHOR_MERMAID = """flowchart LR
  subgraph hyde [HyDE writer]
    Q1[Query] --> G[Autoregressive generate]
    G --> H[Hypothetical document]
  end
  subgraph quid [QUID editor]
    Q2[Query] --> M[Append masks]
    M --> I[Iterative unmask]
    I --> X[Anchored expansion]
  end
"""


def build_thesis() -> None:
    md = (REPORTS / "final_report.md").read_text(encoding="utf-8")
    # Drop TOC for cleaner web page; keep body from Abstract onward
    md_body = re.sub(r"## Table of Contents[\s\S]*?(?=## Abstract|## 1\.)", "", md, count=1)
    # Soften COMPLETE status for Month 4 remaining
    md_body = md_body.replace(
        "**Project Duration:** 3 Months + agentic extension | **Status:** COMPLETE ✅ (Review 2 agentic angle added)",
        "**Project Duration:** 3 Months + agentic extension + Month 4 in progress | **Status:** Capstone ongoing · Preprint coming soon",
    )
    md_body = md_body.replace(
        "**Completion Date:** Month 3",
        "**Timeline:** Months 1–3 complete · Month 4 in progress · Preprint coming soon",
    )
    prose = md_to_html(md_body)

    diagrams = f"""
<div class="section">
  <div class="sec-eye">Architecture</div>
  <h2 class="sec-title">QUID retrieval pipeline</h2>
  <div class="sec-rule"></div>
  <p class="explain">Masked diffusion expands the query before embedding — constrained refinement rather than free-form generation.</p>
  <div class="mermaid-wrap"><div class="mermaid">{PIPELINE_MERMAID}</div></div>
</div>
<div class="section">
  <div class="sec-eye">Mechanism</div>
  <h2 class="sec-title">Writer vs editor</h2>
  <div class="sec-rule"></div>
  <p class="explain">HyDE writes a hypothetical document; QUID edits the query through iterative unmasking — lower semantic drift in specialized domains.</p>
  <div class="mermaid-wrap"><div class="mermaid">{ANCHOR_MERMAID}</div></div>
</div>
<div class="section">
  <div class="sec-eye">Agentic extension</div>
  <h2 class="sec-title">Observe → decide → act → critique</h2>
  <div class="sec-rule"></div>
  <p class="explain">Because QUID is domain-dependent, an agent chooses among vanilla, QUID, and HyDE, then retries when unsupervised confidence is weak.</p>
  <div class="mermaid-wrap"><div class="mermaid">{AGENT_MERMAID}</div></div>
</div>
"""

    body = f"""
<main class="wrap">
  <p class="kicker">QUID · Capstone thesis</p>
  <h1 class="hero-title">Diffusion expansion<br><span>with semantic anchoring</span></h1>
  <p class="lede">
    Full written thesis for QUID — Queries Unmasked by Iterative Diffusion — including
    methodology, BEIR results, ablations, and the post–Review 1 agentic controller.
  </p>
  <div class="status-row">
    <span class="chip accent">Month 4 in progress</span>
    <span class="chip win">Preprint coming soon</span>
    <span class="chip">VIT-AP · DSE</span>
  </div>
  {team_html()}
  {diagrams}
  <article class="prose">
  {prose}
  </article>
  <p class="footer-note">
    Draft paper PDF: <a href="../assets/quid-paper-draft.pdf">quid-paper-draft.pdf</a>
    (working draft — not a published preprint). Capstone continues under {esc(ADVISOR)}.
  </p>
</main>
"""
    out = OUT / "thesis"
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(
        shell("QUID · Thesis", body, depth=1, active="thesis"),
        encoding="utf-8",
    )
    print("wrote thesis/")


def build_pitch() -> None:
    md = (REPORTS / "review2_pitch.md").read_text(encoding="utf-8")
    prose = md_to_html(md)
    body = f"""
<main class="wrap">
  <p class="kicker">QUID · Review 2 pitch</p>
  <h1 class="hero-title">Talk script<br><span>8–10 minutes</span></h1>
  <p class="lede">
    Panel pitch covering Months 1–3, the agentic extension, and the key claim:
    tool calls improve retrieval — diffusion is the tool; agency is when to use it.
  </p>
  <div class="status-row">
    <span class="chip accent">Review 2</span>
    <span class="chip">Month 4 still ahead</span>
    <span class="chip win">Preprint coming soon</span>
  </div>
  {team_html()}
  <div class="section">
    <div class="sec-eye">Diagram</div>
    <h2 class="sec-title">Agentic tool loop</h2>
    <div class="sec-rule"></div>
    <div class="mermaid-wrap"><div class="mermaid">{AGENT_MERMAID}</div></div>
  </div>
  <article class="prose">{prose}</article>
  <p class="footer-note">Guidance: {esc(ADVISOR)}</p>
</main>
"""
    out = OUT / "pitch"
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(
        shell("QUID · Pitch", body, depth=1, active="pitch"),
        encoding="utf-8",
    )
    print("wrote pitch/")


def build_hub() -> None:
    body = f"""
<main class="wrap wrap-wide">
  <p class="kicker">Iksha Lab · VIT-AP Capstone</p>
  <h1 class="hero-title">QUID<br><span>Queries Unmasked by Iterative Diffusion</span></h1>
  <p class="lede">
    Dense retrieval fails when short queries miss domain vocabulary. QUID expands queries with
    masked text diffusion (LLaDA) so expansions stay semantically anchored — then an agent
    decides whether to call QUID, HyDE, or vanilla per query.
  </p>
  <div class="status-row">
    <span class="chip accent">Month 4 in progress</span>
    <span class="chip win">Preprint coming soon</span>
    <span class="chip">Capstone under Dr. G. Muneeswari</span>
  </div>

  <div class="card-grid">
    <a class="card" href="./thesis/">
      <div class="card-label">Thesis</div>
      <div class="card-title">Full written report</div>
      <div class="card-body">Methodology, BEIR results, anchoring analysis, agentic extension, limitations.</div>
    </a>
    <a class="card" href="./pitch/">
      <div class="card-label">Pitch</div>
      <div class="card-title">Review 2 talk</div>
      <div class="card-body">8–10 minute script with the tool-call accuracy story.</div>
    </a>
    <a class="card" href="./weeks/">
      <div class="card-label">Weeks</div>
      <div class="card-title">14 detailed logs</div>
      <div class="card-body">Five-page weekly reports from foundation through agentic benchmarks.</div>
    </a>
    <a class="card" href="./assets/quid-paper-draft.pdf" target="_blank" rel="noreferrer">
      <div class="card-label">Paper</div>
      <div class="card-title">Draft PDF</div>
      <div class="card-body">Working draft only — formal preprint coming soon.</div>
    </a>
  </div>

  <div class="section">
    <div class="sec-eye">System</div>
    <h2 class="sec-title">How QUID retrieves</h2>
    <div class="sec-rule"></div>
    <div class="mermaid-wrap"><div class="mermaid">{PIPELINE_MERMAID}</div></div>
  </div>

  <div class="section">
    <div class="sec-eye">Agency</div>
    <h2 class="sec-title">When to expand</h2>
    <div class="sec-rule"></div>
    <p class="explain">
      Blind always-QUID can hurt on science-claim retrieval. The multi-step agent calls tools,
      critiques confidence without labels, and retries — on SciFact, <strong style="color:var(--text)">+3.3%</strong>
      nDCG@10 vs vanilla and <strong style="color:var(--text)">+6.3%</strong> vs always-QUID.
    </p>
    <div class="mermaid-wrap"><div class="mermaid">{AGENT_MERMAID}</div></div>
  </div>

  {team_html()}

  <p class="footer-note">
    Capstone project by the Iksha Lab team · Done under the guidance of {esc(ADVISOR)}.
    Site: <code class="mono">zhreyu.github.io/quid</code>
  </p>
</main>
"""
    (OUT / "index.html").write_text(
        shell("QUID — Queries Unmasked by Iterative Diffusion", body, depth=0, active="hub"),
        encoding="utf-8",
    )
    print("wrote index.html")


def maybe_link_projects() -> None:
    """Add a lightweight QUID card link on projects index if file exists."""
    projects = PORTFOLIO / "projects" / "index.html"
    if not projects.exists():
        return
    text = projects.read_text(encoding="utf-8", errors="ignore")
    if "/quid/" in text or "zhreyu.github.io/quid" in text:
        print("projects index already links to quid")
        return
    # Best-effort: prepend a note via HTML comment only if we can find a safe insertion.
    # Skip invasive edit if structure is opaque.
    print("skipped projects index auto-link (manual optional)")


def main() -> None:
    build_hub()
    build_thesis()
    build_pitch()
    build_weeks_index()
    for n in range(1, 15):
        build_week(n)
    maybe_link_projects()
    print("done")


if __name__ == "__main__":
    main()
