---
title: 替换 VSCode 默认 Shell
---

### 问题

VSCode 默认 Shell 是 PowerShell。想要默认 MSYS2 Bash，我们还需要手动配置。

### 解决方案

在 VSCode 的系统级 `settings.json` 中添加如下配置：

```json
  "terminal.integrated.profiles.windows": {
    "MSYS2 Bash": {
      "path": "cmd.exe",
      "args": [
        "/c",
        "C:\\msys64\\msys2_shell.cmd -defterm -here -no-start -msys"
      ]
    }
  },
  "terminal.integrated.defaultProfile.windows": "MSYS2 Bash",
```