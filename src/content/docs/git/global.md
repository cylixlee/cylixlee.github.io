---
title: 常用的 Git 全局配置
---

### 整体配置

个人常用的 Git 全局配置项如下：

```
user.name=Cylix Lee
user.email=cylix.lee@outlook.com
init.defaultbranch=main
core.symlinks=true
core.quotepath=false
alias.tree=log --graph --oneline --decorate --all --reflog
alias.stat=status -s
alias.ext=lfs migrate info --everything --top=99999
alias.treeshake=!git reflog expire --expire-unreachable=now --all && git gc --prune=now
url.git@github.com:.insteadof=https://github.com/
url.git@gitee.com:.insteadof=https://gitee.com/
url.git@gitcode.com:.insteadof=https://gitcode.com/
url.local:.insteadof=http://localhost:3000/
```

### 详细介绍

#### 1. 用户名与邮箱

这没什么好说的。这是标识用户身份的两个字段，必须设置。

```
user.name=Cylix Lee
user.email=cylix.lee@outlook.com
```

#### 2. 核心功能

```
init.defaultbranch=main
core.symlinks=true
core.quotepath=false
```

常用的核心功能。

1. **默认分支设置**：现代 Git 托管平台的默认分支名大多是 `main`，而不是老式的 `master`。
2. **启用符号链接**：在 POSIX 操作系统上默认是开启的，在 Windows 上默认关闭。启用之后 Git 会忠实地将符号链接上传和下载，而不是复制一份文件造成不一致。
3. **禁用转义中文**：对于非 ASCII 字符（如中文），Git 默认会以 `\xxx\yyy` 的形式显示，没有编码错乱的风险但完全人类不可读。禁用之后会忠实输出中文。

#### 3. 别名命令

这些别名命令是我自己总结的比较常用、好用的命令。

##### 终端提交树状图

```
alias.tree=log --graph --oneline --decorate --all --reflog
```

是 `git log` 及参数的别名，在终端输出树状图，每个节点只占一行，且输出装饰。输出所有分支，以及暂时没有被分支指向的节点。

##### 简短状态

```
alias.stat=status -s
```

输出文件简短的状态，不输出一大堆文字。

##### 后缀名统计

```
alias.ext=lfs migrate info --everything --top=99999
```

使用了 Git LFS 的 `migrate info` 命令，显示当前工作区中所有未被 LFS 托管的文件后缀。

##### GC 剪枝

```
alias.treeshake=!git reflog expire --expire-unreachable=now --all && git gc --prune=now
```

检测所有未被指向的节点，使它们马上过期并使用 `git gc` 来清理。

#### 4. URL 替换

```
url.git@github.com:.insteadof=https://github.com/
url.git@gitee.com:.insteadof=https://gitee.com/
url.git@gitcode.com:.insteadof=https://gitcode.com/
url.local:.insteadof=http://localhost:3000/
```

将克隆、拉取和推送时的 URL 替换为指定的值。比如，当 `git clone https://github.com/username/repo` 时，按照配置，命令会被替换为 `git clone git@github.com:username/repo`，**从而进行 SSH 克隆而不是 HTTPS 克隆**。

URL 替换常伴随着[常用的配套 SSH 配置](/git/ssh)使用。