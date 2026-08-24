---
title: 使用 Shift Enter 换行
---

### 问题

在 Windows Terminal 上，默认的换行键是 `Ctrl + Enter`（或 `Ctrl + J`）。这与网页或 Electron App 的默认值 `Shift + Enter` 不同。尤其是在交错使用 Web UI 和 TUI 时，经常会出现快捷键按错的情况。

### 解决方案

可以使用如下配置将 `Shift + Enter` 设置为 Windows Terminal 的换行快捷键。

1. 打开 Windows Terminal 设置，点击“**打开 JSON 文件**”。
2. 将以下内容输入到 JSON 文件的对应部分。

```json
{
  "actions": [
    {
      "command": { "action": "sendInput", "input": "\u001b[13;2u" },
      "keys": "shift+enter"
    }
  ]
}
```