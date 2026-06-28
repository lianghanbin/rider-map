// 简单的网页服务器 —— 让手机能访问骑手地图

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 6666;
const ROOT = __dirname;  // 当前目录就是骑手地图

// 不同文件类型的标记
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
};

const server = http.createServer((req, res) => {
  // 去掉 ? 后面的参数
  const urlPath = req.url.split('?')[0];
  // 默认访问 index.html
  const fileName = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(ROOT, fileName);

  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('文件没找到: ' + fileName);
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('============================================');
  console.log('  骑手地图服务已启动！');
  console.log('  在本机打开: http://localhost:' + PORT);
  console.log('  在手机打开: http://你电脑IP:' + PORT);
  console.log('============================================');
});
