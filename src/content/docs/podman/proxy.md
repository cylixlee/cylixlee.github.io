---
title: Podman Machine 设置代理
---

### 问题

在 Windows 上使用 Podman 作为容器引擎比 Docker 省事，因为 Podman 自动配置了一个 WSL2 发行版，叫做 `podman-machine-default`，并使用它来和 Windows 侧的 Podman 服务通信。

然而，如果要从 Docker Hub 拉取镜像，仍然需要设置代理。使用 TUN 模式并不一定能解决问题。

### 解决方案

1. 将 WSL2 的网络模式设置为镜像模式而不是 NAT 模式。请参阅 [WSL2 自动继承 Windows 代理](/wsl2/autoproxy)。
2. 使用 `podman machine ssh` 进入 Podman 发行版。**这是一个基于 Fedora 定制的发行版，因此可以使用 `dnf` 安装必要工具**。
3. 将以下配置写进 `~/.config/containers/containers.conf`。如果文件不存在，请新建该文件。

```toml
[engine]
env = [
  "HTTP_PROXY=http://127.0.0.1:7897",
  "HTTPS_PROXY=http://127.0.0.1:7897",
  "NO_PROXY=localhost,127.0.0.1"
]
```

这是根据[podman-container-tools 仓库文档](https://github.com/podman-container-tools/container-libs/blob/main/common/docs/containers.conf.5.md)来配置的。当 Podman 引擎启动时会将配置文件中的环境变量加载。因此，配置好后需要 `podman machine stop` 后再 `podman machine start` 重启后才能生效。