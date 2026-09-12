# dsh-wsl-launch
> **套件安装：** 见 [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)。推荐 `KIT_SET=daily` | `llm` | `github` | `full`。故障树：[TROUBLESHOOTING.zh.md](https://github.com/173787247/dsh-wsl-kit/blob/master/docs/TROUBLESHOOTING.zh.md)。


DeepSeek Harness 工具：**`win_launch`** — 从 WSL 启动**白名单内**的 Windows 应用（`code`、资源管理器、浏览器等）。

属于 **[dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit)**。

[English → README.md](./README.md)

---
## 兼容性

| 项 | 值 |
|----|----|
| **插件** | `dsh-wsl-launch` **0.1.0** |
| **最低 dsh** | ≥ **0.1.2**（Windows 中继 `:3081` 一次性 `?token=`） |
| **最新验证** | 以 [dsh-wsl-kit 兼容性](https://github.com/173787247/dsh-wsl-kit#compatibility-2026-09) 为准（当前 **`0.1.5-rc.1`**）— 套件唯一真源 |
| **套件档位** | `daily`（亦含于 `github` / `full`；fetch+net 亦在 `llm`） |
| **云端 Flash** | settings / `llm-deepseek` 使用 **`deepseek-flash`**（V4.1 Flash）；本插件不配置模型 id |
| **Agent Teams** | 上游实验包；本插件不依赖 |

套件版本地板：[`check-plugin-versions.sh`](https://github.com/173787247/dsh-wsl-kit/blob/master/scripts/check-plugin-versions.sh)。故障树：[TROUBLESHOOTING.zh.md](https://github.com/173787247/dsh-wsl-kit/blob/master/docs/TROUBLESHOOTING.zh.md)。

## 为什么需要

打开**文件**属于 [dsh-wsl-open](https://github.com/173787247/dsh-wsl-open)。启动 **VS Code / Edge / 资源管理器** 这类应用需要受控启动器，避免 Agent 任意执行 `.exe`。

## 工具

| 参数 | 是否必填 | 含义 |
|------|----------|------|
| `target` | 是 | 可执行文件名或 Windows 路径（必须匹配白名单） |
| `args` | 否 | 字符串参数列表 |

## 默认白名单

`code`、`code.cmd`、`explorer.exe`、`notepad.exe`、`wt.exe`、`windows terminal`、`msedge.exe`、`chrome.exe`、`firefox.exe`

通过 `config.allowlist` 扩展（精确名称、路径后缀，或 `prefix*`）。

## 安装

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-launch
```

## 配置

```yaml
- id: dsh-wsl-launch
  name: dsh-wsl-launch
  config:
    timeoutMs: 20000
    # allowlist: ["code", "explorer.exe", "msedge*"]
```

若省略 `allowlist` 或为空，则使用默认白名单。

## 测试

```sh
npm test
```

## 许可

MIT
