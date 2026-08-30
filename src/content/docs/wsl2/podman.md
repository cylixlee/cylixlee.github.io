---
title: Podman 的根共享挂载问题
---

### 问题

在 WSL2 中使用 Podman 时，可能会报如下错误：

```
WARN[0000] "/" is not a shared mount, this could cause issues or missing mounts with rootless containers
```

这是因为Linux 系统根目录 / 的挂载属性是“私有（private）”的。而 Podman 在启动容器时，需要在后台偷偷“挂载”一些东西（比如 /proc、/sys、设备节点等）。如果根目录是私有的，Podman 的这些幕后操作就无法正确通知到容器内部，或者容器退出时无法干净地清理掉，容易导致挂载丢失或残留。

> *这和用 volumes 绑定目录（文件共享）没关系。它管的是 Podman 自己“搭脚手架”的权限问题。*

### 解决方案

#### 1. 创建 systemd 服务文件

```bash
sudo vim /etc/systemd/system/mount-root-rshared.service
```

#### 2. 写入共享挂载脚本

```ini
[Unit]
Description=Make root mount rshared for rootless containers
Before=podman.service

[Service]
Type=oneshot
ExecStart=/usr/bin/mount --make-rshared /

[Install]
WantedBy=multi-user.target
```

#### 3. 启用并启动服务

```bash
sudo systemctl enable mount-root-rshared.service
sudo systemctl start mount-root-rshared.service
```

> **验证效果**
>
> *可以使用 `findmnt -o TARGET,PROPAGATION` 来验证是否根及子挂载点都被标记为共享。*