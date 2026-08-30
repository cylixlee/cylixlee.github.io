---
title: 跨文件系统创建符号链接
---

### 问题

在 WSL2 创建文件系统内部的符号链接含简单，直接 `ln -s` 即可。然而，当我们需要跨 Windows 和 WSL2 创建符号链接时，就无法使用 `ln -s` 了。

准确地说，是 Linux 侧能够识别符号链接，但 Windows 侧将 Linux 创建的对文件夹的符号链接也识别为文件，因此导致无法使用文件管理器查看。

### 解决方案

首先我们要明确：除非主要是在 Windows 侧使用，否则文件本体最好放在 Linux 中。比如 `~/.ssh` 基本都是被 Linux 侧的 Git、SSH 使用的，就需要存放在 Linux 侧。

以 Ubuntu 为例，用户目录在 Windows 侧的 URI 是 `\\wsl.localhost\Ubuntu\home\cylix` （注意更改用户名）。此时我们可以使用

```powershell
New-Item -Path "C:\Users\cylix\.ssh" -ItemType SymbolicLink -Target "\\wsl.localhost\Ubuntu\home\cylix\.ssh"
```

来创建 Windows 格式的软链接。这个软链接由于是 Windows 格式的，因此所有 Windows 侧的软件都能够正确识别。对于 Windows 侧的用户目录 `C:\Users\cylix`，WSL2 倒是无法识别其中 Windows 风格的软链接，但我们也基本不会使用 WSL2 访问 Windows 侧的用户目录。

> *`\\wsl$\Ubuntu\...` 这种形式的 URI 是比较过时的 URI，请尽量使用 `\\wsl.localhost`，区别在于 `\\wsl.localhost` 在 Ubuntu 实例未启动时会静默启动，而 `\\wsl$` 会直接报错。*