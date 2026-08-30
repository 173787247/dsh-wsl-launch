# dsh-wsl-launch

DeepSeek Harness tool: **`win_launch`** — start an **allowlisted** Windows app from WSL (`code`, Explorer, browsers, …).

Part of **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**.

[中文说明 → README.zh.md](./README.zh.md)

---

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
