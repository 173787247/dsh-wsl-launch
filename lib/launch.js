/** Allowlist matching for Windows launch targets. */
export function normalizeTarget(raw) {
  return String(raw ?? "").trim();
}

export function matchesAllowlist(target, allowlist) {
  const t = normalizeTarget(target).toLowerCase();
  if (!t) return false;
  const list = Array.isArray(allowlist) ? allowlist : [];
  return list.some((entry) => {
    const e = String(entry ?? "").trim().toLowerCase();
    if (!e) return false;
    if (e.endsWith("*")) return t.startsWith(e.slice(0, -1));
    return t === e || t.endsWith(`\\${e}`) || t.endsWith(`/${e}`);
  });
}

export const DEFAULT_ALLOWLIST = [
  "code",
  "code.cmd",
  "explorer.exe",
  "notepad.exe",
  "wt.exe",
  "windows terminal",
  "msedge.exe",
  "chrome.exe",
  "firefox.exe",
];

export function buildLaunchScript(target, args) {
  const t = normalizeTarget(target).replace(/'/g, "''");
  const argList = Array.isArray(args) ? args.map((a) => String(a)) : [];
  const argJson = JSON.stringify(argList).replace(/'/g, "''");
  return [
    `$target = '${t}'`,
    `$args = ConvertFrom-Json '${argJson}'`,
    "if ($args.Count -gt 0) { Start-Process -FilePath $target -ArgumentList $args } else { Start-Process -FilePath $target }",
    "'ok'",
  ].join("; ");
}

export function formatLaunchResult(value) {
  if (!value.ok) return `win_launch failed: ${value.error || "denied"}`;
  const args = (value.args || []).join(" ");
  return `launched: ${value.target}${args ? ` ${args}` : ""}`;
}
