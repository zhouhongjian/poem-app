# poem app

## 简介

一个实时**古诗检索**app（唐诗5.7W+，宋诗25W+）。
项目的后台使用的是**elasticsearch**，关于elasticsearch的数据来源. 数据转换. 数据处理. 索引构建. docker部署等信息写在了另外一个项目[**poem-es**](https://github.com/zhouhongjian/poem-es)中。bug和todo参考项目中的**todo**文件。

### 使用

1. 通过`git clone`下载该项目
2. 下载安装[yarn](https://yarn.bootcss.com/)依赖管理工具
3. 在项目的home目录中，执行`yarn`下载依赖。
4. 如果有本地安装项目[poem-es](https://github.com/zhouhongjian/poem-es)中指定的数据源[chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)在本地的elasticsearch中，直接看步骤6；如果没有，看步骤5。
5. 在App.js文件中，修改ReactiveBase标签中的url为`http://111.231.192.212:8000`即可连接上我的数据源(本身服务器资源比较小，请合理使用)。
6. 执行`yarn start`可以开启本地调试，浏览器会弹出`localhost:3000`地址；如果3000端口被占用，控制台会提示是否使用其他端口。

### 部署

1. 执行`yarn build`，会在home目录下生成一个build文件夹
2. 将这个的内容放置在任何一个支持静态文件托管的web服务器（如果：Nginx. Apache）上即可完成部署。

### 关于ssl

要使用**https**进行访问，那么以**docker**的Nginx镜像为例进行说明。

1. 自行生成或者下载证书。
2. 将相关的证书文件(.crt和.key文件)放置到一个自认为安全的路径下
3. 修改配置文件,具体参考代码如下：

    ```Nginx
    server {
        listen       443 ssl;
        server_name  域名;

        ssl_certificate  .crt文件路径
        ssl_certificate_key  .key文件路径;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        #charset koi8-r;
        #access_log  /var/log/nginx/host.access.log  main;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
    ```

    将模板内容涉及的证书地址和域名进行修改。再这个文件保存下来，比如文件名为https.conf

4. 通过docker挂在卷的方式将证书文件（2个）和配置文件（1个）进行挂载运行即可。`docker run -p 443:443  --name poem-app  -v 部署步骤中生成的build文件在宿主机路径:/usr/share/nginx/html:ro -v 证书文件放置的宿主机路径:配置文件中的证书路径 -v 配置文件的宿主机路径:/etc/nginx/conf.d/default.conf -d nginx:1.14.0`

5. 如果没有使用docker部署的Nginx，那么修改配置文件中server部分相关配置即可。

6. 因为访问elasticsearch的时候，使用的是http方式访问的，所以会出现https页面不允许加载http资源的情况。如果愿意配置https的elasticsearch，可以参考[这里](https://www.elastic.co/blog/getting-started-with-elasticsearch-ssl-native-authentication)。
7. 如果不想配置，那么也有解决办法，可以参考[这里](https://ask.csdn.net/questions/693810)的Nginx配置，将对应location加入到server中，记得修改proxy_pass为自己elasticsearch服务器的访问地址。然后将ReactiveBase标签中的url修改为`https://域名/esApi`的形式。

### 依赖于以下项目（查看代码的时候可以作参考）

- [poem-es](https://github.com/zhouhongjian/poem-es)
- [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)
- [React](https://reactjs.org/)
- [ReactiveSearch](https://opensource.appbase.io/reactivesearch)
- [Appbaseio](https://appbase.io)
- ❤
