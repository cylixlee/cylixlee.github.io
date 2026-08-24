---
title: 启用符号链接功能及继承环境变量
---

### 问题

安装好后的 MSYS2 默认不启用符号链接功能，且不继承 Windows 环境变量。

### 解决方案

打开 `C:\msys64\msys2_shell.cmd`，找到

```cmd
rem To activate windows native symlinks uncomment next line
rem set MSYS=winsymlinks:nativestrict

rem Set debugging program for errors
rem set MSYS=error_start:%WD%../../mingw64/bin/qtcreator.exe^|-debug^|^<process-id^>

rem To export full current PATH from environment into MSYS2 use '-use-full-path' parameter
rem or uncomment next line
rem set MSYS2_PATH_TYPE=inherit
```

将其中的 `winsymlinks` 和 `MSYS2_PATH_TYPE` 解除注释（删掉 `rem` 关键字）即可。也即

```cmd
set MSYS=winsymlinks:nativestrict
set MSYS2_PATH_TYPE=inherit
```

