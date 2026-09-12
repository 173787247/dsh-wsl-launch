# dsh-wsl-launch
> **Install set:** part of [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit). Prefer `KIT_SET=daily` | `llm` | `github` | `full` (see kit README). Fault tree: [TROUBLESHOOTING.md](https://github.com/173787247/dsh-wsl-kit/blob/master/docs/TROUBLESHOOTING.md).


DeepSeek Harness tool: **`win_launch`** — start an **allowlisted** Windows app from WSL (`code`, Explorer, browsers, …).

Part of **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**.

[中文说明 → README.zh.md](./README.zh.md)

---
## Compatibility

| Field | Value |
|-------|-------|
| **Plugin** | `dsh-wsl-launch` **0.1.0** |
| **Minimum dsh** | ≥ **0.1.2** (web UI one-shot `?token=` on Windows relay `:3081`) |
| **Latest verified** | See [dsh-wsl-kit Compatibility](https://github.com/173787247/dsh-wsl-kit#compatibility-2026-09) (currently **`0.1.5-rc.1`**) — single source of truth for the suite |
| **Kit set** | `daily` (also in `github` / `full`; fetch+net also in `llm`) |
| **Cloud Flash** | Use model id **`deepseek-flash`** (V4.1 Flash) in `~/.dsh/settings.yaml` / `llm-deepseek` — not configured by this plugin |
| **Agent Teams** | Upstream experimental; not required here |

Suite floor versions: kit [`check-plugin-versions.sh`](https://github.com/173787247/dsh-wsl-kit/blob/master/scripts/check-plugin-versions.sh). Fault tree: [TROUBLESHOOTING.md](https://github.com/173787247/dsh-wsl-kit/blob/master/docs/TROUBLESHOOTING.md).

## Why

Opening a **file** belongs to [dsh-wsl-open](https://github.com/173787247/dsh-wsl-open). Starting **VS Code / Edge / Explorer** as an app needs a controlled launcher so the agent cannot run arbitrary `.exe`.

## Tool

| Arg | Required | Meaning |
|-----|----------|---------|
| `target` | yes | Executable name or Windows path (must match allowlist) |
| `args` | no | String argument list |

## Default allowlist

`code`, `code.cmd`, `explorer.exe`, `notepad.exe`, `wt.exe`, `windows terminal`, `msedge.exe`, `chrome.exe`, `firefox.exe`

Extend via `config.allowlist` (exact name, path suffix, or `prefix*`).

## Install

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-launch
```

## Config

```yaml
- id: dsh-wsl-launch
  name: dsh-wsl-launch
  config:
    timeoutMs: 20000
    # allowlist: ["code", "explorer.exe", "msedge*"]
```

If `allowlist` is omitted or empty, defaults apply.

## Test

```sh
npm test
```

## License

MIT
