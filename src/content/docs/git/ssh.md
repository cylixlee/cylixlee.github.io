---
title: 常用的配套 SSH 配置
---

在使用 Git 的 SSH 方式克隆/拉取/推送仓库时，经常需要配置 SSH。SSH 配置位于 `~/.ssh/config` 文件中，Windows 上建议使用符号链接将 `C:/msys64/home/cylix/.ssh` 指向 `C:/Users/cylix/.ssh`。

要在 MSYS2 中使用符号链接，请参阅[启用符号链接功能及继承环境变量](/msys2/symlink)。

### 完整配置

```
Host github
  HostName ssh.github.com
  Port 443
  User git
  ProxyCommand "C:/Program Files/Git/mingw64/bin/connect.exe" -S 127.0.0.1:7897 %h %p

Host gitcode.com
  HostName gitcode.com
  User git

Host gitcode
  HostName gitcode.com
  User git

Host local
  HostName localhost
  User git
  Port 2222
```

### 详细解释

默认的 Git SSH 命令如下：

```
git clone name@host:username/repo
```

其中 `name` 是 SSH 主机接受的名称，通常为 `git`。`host` 是主机名，而 `username/repo` 则与 GitHub 上的用户名、仓库名对应。

在 SSH 配置文件中，一个 `Host` 代表一个**自定义的**主机名，克隆/拉取/推送时它会被替换为 `HostName` 的真正URL。并且：

1. 如果指定了 `User` 且命令未指定用户名，那么会使用配置文件中定义的用户名。
2. 如果指定了 `Port`，则会使用配置文件中定义的端口而不是默认的 `22` SSH 端口。
3. 如果指定了 `ProxyCommand`，则会使用该命令来进行代理 SSH，而不是直连 SSH。

比如，如下就是 GitHub 推荐的 [SSH over HTTPS](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port) 访问方式：

```
Host github
  HostName ssh.github.com
  Port 443
  User git
  ProxyCommand "C:/Program Files/Git/mingw64/bin/connect.exe" -S 127.0.0.1:7897 %h %p
```

因为防火墙的设置，一般使用代理时无法访问 `22` 端口。此时可以访问 443 端口来进行 SSH。此时运行

```
git clone github:username/repo
```

就会被替换为

```
git clone git@ssh.github.com:username/repo # 且通过 443 端口访问
```

> **命令行指定端口**
>
> *以上演示的命令行中其实无法指定端口。如果要在命令行中指定端口，就要使用完整的 SSH URL：*
>
> `git clone ssh://git@github.com:443/username/repo.git`
>
> *这样很繁琐且复杂，不如直接在配置文件中指定，一劳永逸。*