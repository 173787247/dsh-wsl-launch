import { detectWsl, runPowerShell } from "./lib/wsl-host.js";
import {
  DEFAULT_ALLOWLIST,
  buildLaunchScript,
  formatLaunchResult,
  matchesAllowlist,
  normalizeTarget,
} from "./lib/launch.js";

export const name = "dsh-wsl-launch";
export const inject = ["tools", "systemPrompt"];

export function apply(ctx, config = {}) {
  const timeoutMs = positive(config.timeoutMs, 20_000);
  const allowlist = Array.isArray(config.allowlist) && config.allowlist.length
    ? config.allowlist.map(String)
    : DEFAULT_ALLOWLIST;
  const wsl = detectWsl();

  ctx.systemPrompt.section({
    name: "tool:win_launch",
    order: 118,
    text: [
      "Use win_launch to start an allowlisted Windows app (code, explorer.exe, browsers, etc.).",
      "Do not invent executables outside the allowlist; ask the user to extend config.allowlist if needed.",
      "Prefer dsh-wsl-open for opening Linux file paths; use win_launch for apps and Windows-native targets.",
    ].join(" "),
  });

  ctx.tools.register({
    name: "win_launch",
    description: "Start an allowlisted Windows executable or shell command name from WSL.",
    parameters: {
      type: "object",
      additionalProperties: false,
      required: ["target"],
      properties: {
        target: {
          type: "string",
          description: "Executable name or path on Windows PATH / absolute Windows path (must match allowlist).",
        },
        args: {
          type: "array",
          items: { type: "string" },
          description: "Optional argument list.",
        },
      },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          ok: { type: "boolean" },
          target: { type: "string" },
          args: { type: "array", items: { type: "string" } },
          error: { type: "string" },
        },
      },
      render: (_args, value) => [{ type: "text", text: formatLaunchResult(value) }],
    },
    timeoutMs,
    isConcurrencySafe: () => false,
    async execute(args) {
      if (!wsl) return { ok: false, error: "not running in WSL" };
      const target = normalizeTarget(args?.target);
      const launchArgs = Array.isArray(args?.args) ? args.args.map(String) : [];
      if (!target) return { ok: false, error: "missing target" };
      if (!matchesAllowlist(target, allowlist)) {
        return { ok: false, target, args: launchArgs, error: `target not allowlisted: ${target}` };
      }
      try {
        await runPowerShell(buildLaunchScript(target, launchArgs), { timeoutMs });
        return { ok: true, target, args: launchArgs };
      } catch (err) {
        return {
          ok: false,
          target,
          args: launchArgs,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    },
    presentCall: () => ({ card: "generic", title: "Windows launch" }),
    presentResult: (_args, result) => (
      result.isError
        ? { card: "generic", title: "Windows launch failed", content: result.content }
        : { card: "generic", title: "Windows launch", content: result.content }
    ),
  });
}

function positive(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
