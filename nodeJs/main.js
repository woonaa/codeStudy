const http = require('http');
const fs = require('fs');
const url = require('url');

function templateHMTL(title, list, body) {
  return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
      </body>
      </html>
      `;
}

function templateList(filelist) {
  let list = '<ul>';
  let i = 0;
  while (i < filelist.length) {
    list = list + `<li> <a href = "/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}
const app = http.createServer(function(request, response) {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  console.log(queryData)

  if (pathname === '/') {
    if (queryData.id === undefined) {

      //파일리스트 가져오기
      fs.readdir('./data', function(error, filelist) {
        const title = "welcome";
        const description1 = "hello nodejs"

        const list = templateList(filelist);


        const template = templateHMTL(title, list, `<h2>${title}</h2><p>${description1}</p>`);
        response.writeHead(200);
        response.end(template);
      })


    } else {
      //파일리스트 가져오기
      fs.readdir('./data', function(error, filelist) {
        fs.readFile(`./data/${queryData.id}`, 'utf8', function(err, description) {
          const title = queryData.id;
          const list = templateList(filelist);
          const template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
          //왜 templateHMTL(title, list, `<h2>${title}</h2><p>${description1}</p>`); 이렇게 하면 실행이 안되는가?
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('not found');
  }
});

app.listen(3000);
