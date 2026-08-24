---
title: 替换 Windows Terminal 默认 Shell
---

### 问题

Windows Terminal 默认的配置是打开 PowerShell。要使用 MSYS2 Bash 作为默认 Shell，我们还需要手动配置。

### 解决方案

1. 在 Windows Terminal 中新建配置文件
2. 命令行设置为 `C:/msys64/msys2_shell.cmd -defterm -here -no-start -msys`
3. 启动目录设置为 `C:/msys64/home/cylix` （注意更改用户名）

> *图标可以设置为 Chevron Right Med，看起来就像一个 `>`，更加贴近 Linux 的风格*