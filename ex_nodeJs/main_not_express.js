const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./template.js'); //모듈 사용
const path = require('path');


const app = http.createServer(function(request, response) {
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {

            //파일리스트 가져오기
            fs.readdir('./data', function(error, filelist) {
                const title = "welcome";
                const description = "hello nodejs"
                const list = template.list(filelist);
                const html = template.html(title, list,`<h2>${title}</h2><p>${description}</p>`, `<a href ='/create'>create</a>`);
                response.writeHead(200);
                response.end(html);
            })
        } else {
            //파일리스트 가져오기

            fs.readdir('./data', function(error, filelist) {
                const filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                    const title = queryData.id;
                    const list = template.list(filelist);
                    const html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
                        `<a href="/create">create</a>
               <a href="/update?id=${title}">update</a>
               <form action="/delete_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <input type="submit" value="delete">
               </form>>
          `);

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function(error, filelist) {
            const title = "Web - create";
            const list = template.list(filelist);
            const html = template.html(title, list, `
        <form action = "/create_process" method = "post">
          <p>
            <input type = "text" name = "title" placeholder ="title">
          </p>
          <p>
            <textarea name ="description" placeholder = "description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `, '');
            response.writeHead(200);
            response.end(html);
        })

    } else if (pathname === '/create_process') {
        let body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            const title = post.title;
            const description = post.description;
            fs.writeFile(`./data/${title}`, description, 'utf8',
                function(err) {
                    response.writeHead(302, {
                        Location: `/?id=${title}`
                    }); //302는 리다이랙션, 200은 성공
                    response.end();
                })
        });


    } else if (pathname === '/update') {
        fs.readdir('./data', function(error, filelist) {
            const filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                const title = queryData.id;
                const list = template.list(filelist);
                const html = template.html(title, list,
                    `
          <form action = "/update_process" method = "post">
            <input type = "hidden" name = "id" value= "${title}">
            <p>
              <input type = "text" name = "title" value ="${title}">
            </p>
            <p>
              <textarea name ="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
                    `<a href ='/create'>create</a> <a href="/update?id=${title}"">update</a>`);
                // title의 값이 변하면 수정이 되는 것이 아니라 새로운 파일이 생성되기때문에 id값으로 설정
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === '/update_process') {
        let body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            const id = post.id;
            const title = post.title;
            const description = post.description;
            fs.rename(`./data/${id}`, `./data/${title}`, function(error) {
                fs.writeFile(`./data/${title}`, description, 'utf8',
                    function(err) {
                        response.writeHead(302, {
                            Location: `/?id=${title}`
                        });
                        response.end();
                    })
            })
        });

    } else if (pathname === '/delete_process') {
        let body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            const post = qs.parse(body);
            const id = post.id;
            const filteredId = path.parse(id).base;
            fs.unlink(`./data/${filteredId}`, function(error) {
                response.writeHead(302, {
                    Location: `/`
                });
                response.end();
            })
        });
    } else {
        response.writeHead(404);
        response.end('not found');
    }
});

app.listen(3000);