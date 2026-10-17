---
title: 自动申请并续期 HTTPS 证书
---

### 问题

在使用 VPS 部署自己的服务器之后，使用浏览器访问会显示无法访问。这是因为现代浏览器默认采用了 HTTPS 而不是 HTTP，以获得更高的安全性。目前，几乎所有的网站、WebAPI 都使用了 HTTPS，而 HTTPS 证书是需要手动获取的，且配置较繁琐。

### 解决方案

我们可以使用 [Caddy](https://caddyserver.com) 来**自动申请和续期** HTTPS 证书。Caddy 本质上是反向代理，替服务端拦截了客户端的 HTTPS 请求，自动处理加解密，并将真正的业务逻辑转发到本地的 HTTP 服务（通常转发给 Nginx）。

#### 有域名的服务器

对于已有域名的服务器，Caddy 配置非常简单：只需将如下的配置写入 `/etc/caddy/Caddyfile`

```nginx
服务器域名 {
    reverse_proxy localhost:8080
}
```

使用 `sudo caddy validate --config /etc/caddy/Caddyfile` 验证其语法无误之后，即可使用 `sudo systemctl reload caddy` 重新加载 caddy 服务。

#### 无域名的服务器

对于无域名服务器，caddy 的默认行为是创建一个本地证书，使用浏览器访问时会弹出“不安全”提示，显然这不是我们想要的行为。

Let's Encrypt 在 2024/2025 年逐步推出的 IP 地址证书支持。我们可以通过 Let's Encrypt 的 ACME 协议来为 IP 地址申请证书，配置如下：

```nginx
{
    default_sni 服务器IP
}

服务器IP {
    tls {
        issuer acme {
            dir https://acme-v02.api.letsencrypt.org/directory
            profile shortlived
        }
    }
    reverse_proxy 127.0.0.1:8080 {
        header_up X-Real-IP {remote_host}
    }
}
```

同样，使用 `sudo caddy validate --config /etc/caddy/Caddyfile` 通过验证之后，就可以 `sudo systemctl reload caddy` 来重载 caddy 服务了。证书申请、续期都是自动完成的。

> **Issuer URL**
>
> *这里的 Issuer ACME 的 URL 来源于[Let's Encrypt 官方文档](https://letsencrypt.org/docs/acme-protocol-updates/)。如果过期，请以当下的 URL 为准。*

#### Nginx 配置

在使用 caddy 反代之后，nginx 应该监听本地的 8080 端口，而不是所有地址的 8080 端口。Nginx 配置模板如下：

```nginx
server {
    listen 127.0.0.1:8080;
    server_name 域名或下划线留空;

    location / {
        proxy_pass http://127.0.0.1:9000; 
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $http_x_real_ip;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

注意，这里的 `listen` 是本地回环 `127.0.0.1:端口`。如果写成 `listen 端口` 就会暴露在公网并与 caddy 冲突。

对于无域名服务器，使用 `server_name _;` 即可。