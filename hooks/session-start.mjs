#!/usr/bin/env node
// Drax SessionStart hook — detection only, never mutates the workspace.
// Detects an existing drax-workspace/, reports document inventory, and flags a
// version mismatch against the schema this plugin version expects.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCHEMA_VERSION = "1"; // bump when the expected governance doc set changes.

// Absolute path to this plugin's bundled assets (agents/, protocols/, knowledge/,
// DRAX_SYSTEM.md). Agents and protocols refer to this as {{DRAX_ASSETS}}; the hook
// resolves it from its own location so it works at any install path.
const DRAX_ASSETS = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Canonical governance suite expected by this plugin version (English artifacts).
const EXPECTED_DOCS = [
  "CHAIRMAN_LETTER.md",
  "VISION.md",
  "ARTICLES_OF_INCORPORATION.md",
  "SHAREHOLDERS_AGREEMENT.md",
  "BOARD_CHARTER.md",
  "AUTHORITY_MATRIX.md",
  "JOB_DESCRIPTIONS.md",
  "INTERNAL_SLAS.md",
  "NDA_NONCOMPETE.md",
  "STOCK_OPTION_PLAN.md",
  "IP_ASSIGNMENT.md",
  "STRATEGIC_PLAN_AND_BUDGET.md",
  "DATA_GOVERNANCE_POLICY.md",
];

function emit(context) {
  const prefix =
    `DRAX_ASSETS=${DRAX_ASSETS}\n` +
    `(In any Drax agent, protocol, or knowledge file, the marker {{DRAX_ASSETS}} resolves to the path above. ` +
    `Read bundled skills from {{DRAX_ASSETS}}/protocols/, knowledge from {{DRAX_ASSETS}}/knowledge/, and the constitution at {{DRAX_ASSETS}}/DRAX_SYSTEM.md. ` +
    `Runtime state and artifacts live under ./drax-workspace/.)\n\n`;
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: (prefix + context).slice(0, 9000),
      },
    })
  );
}

function safeJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function main() {
  const cwd = process.cwd();
  const ws = path.join(cwd, "drax-workspace");
  if (!fs.existsSync(ws) || !fs.statSync(ws).isDirectory()) {
    emit(
      "No drax-workspace found in the current directory. Run /drax to start a new corporate-governance build."
    );
    return;
  }

  const files = fs
    .readdirSync(ws)
    .filter((f) => f.endsWith(".md") && fs.statSync(path.join(ws, f)).isFile());

  const manifest = safeJson(path.join(ws, ".drax", "manifest.json"));
  const wsVersion = manifest?.schemaVersion ?? null;
  const present = new Set(files);
  const expectedPresent = EXPECTED_DOCS.filter((d) => present.has(d));
  const unknown = files.filter((f) => !EXPECTED_DOCS.includes(f));

  let context = `Drax workspace detected at ./drax-workspace (${files.length} documents).`;
  context += `\nExpected-suite docs present: ${expectedPresent.length}/${EXPECTED_DOCS.length}.`;

  const versionMismatch = wsVersion !== SCHEMA_VERSION;
  if (versionMismatch) {
    context += `\nVERSION MISMATCH: workspace schema = ${
      wsVersion ?? "unversioned/legacy"
    }; this plugin expects schema = ${SCHEMA_VERSION}.`;
    context += `\nMigration is available via /drax:migrate. Do NOT rename or restructure anything without the founder's explicit approval; migration backs up first and is non-destructive.`;
  }
  if (unknown.length) {
    context += `\nNon-suite documents present (candidates for migration mapping): ${unknown
      .slice(0, 20)
      .join(", ")}.`;
  }
  if (!versionMismatch && unknown.length === 0) {
    context += `\nWorkspace is on the current schema. Resume with /drax or check progress with /drax:status.`;
  }

  emit(context);
}

try {
  main();
} catch (err) {
  emit(`Drax SessionStart detection skipped: ${err?.message ?? "unknown error"}.`);
}
