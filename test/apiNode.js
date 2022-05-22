const Task = require('../dist/index').Task;

const initServer = () => {
  const http = require('http');

  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const msg = { data: 'method:' + req.method + ' body:' + body.toString() };
      console.log(new Date(), msg);
      res.write(JSON.stringify(msg));
      res.end();
    });
  });
  server.listen(8888);
};

(async () => {
  initServer();

  const task = new Task();
  task.nodes = [{
    key: 'api',
    params: {
      dataSource: 'parent',
      url: 'http://localhost:8888'
    },
    parent: null,
    uuid: '1'
  }, {
    key: 'api',
    params: {
      method: 'post',
      body: { a: 1 },
      url: 'http://localhost:8888'
    },
    uuid: '2',
    parent: '1'
  }, {
    key: 'api',
    params: {
      method: 'post',
      dataSource: 'parent',
      body: { a: 1 },
      url: 'http://localhost:8888'
    },
    uuid: '3',
    parent: '2'
  }];
  await task.start();
})();
