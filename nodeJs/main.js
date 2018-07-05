const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const template = require('./template.js');
const qs = require('querystring');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(bodyParser.urlencoded({extended: false})); // 폼을 읽어서 분석하는 body-parser
app.use(compression()); // 데이터를 압축하는 미들웨어, 필요하다.
app.use(function (request, response, next) {
    fs.readdir('./data', function(error, filelist){
        request.list = filelist;
        next();
    });
});
//route, routing
// app.get('/', (req, res) => res.send('hello World!'));
app.get('/', function (request,response) {
        const title = "welcome";
        const description = "hello nodejs";
        const list = template.list(request.list);
        const html = template.html(title, list,
            `<h2>${title}</h2><p>${description}</p>`,
            `<a href ='/create'>create</a>`
        );
        response.send(html);
});

app.get('/page/:pageId', function (request,response) {
        const filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
            const title = request.params.pageId;
            const list = template.list(request.list);
            const html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`,
                `<a href="/create">create</a>
                 <a href="/update/${title}">update</a>
                   <form action="/delete_process" method="post">
                      <input type="hidden" name="id" value="${title}">
                      <input type="submit" value="delete">
                   </form>>
          `);
            response.send(html);
        });
});

app.get('/create', function (request, response) {
        const title = "Web - create";
        const list = template.list(request.list);
        const html = template.html(title, list, `
        <form action = "/create" method = "post">
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
        response.send(html);
});

app.post('/create', function (request,response) {
    //body-parser 사용 방법
    const post = request.body;
    const title = post.title;
    const description = post.description;
    fs.writeFile(`./data/${title}`, description, 'utf8',
        function (err) {
            response.redirect('/?id=${title}');
        });

    /* 기존방법
    let body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        const post = qs.parse(body);
        const title = post.title;
        const description = post.description;
        fs.writeFile(`./data/${title}`, description, 'utf8',
            function (err) {
                // response.writeHead(302, {Location: `/?id=${title}`}); //302는 리다이랙션, 200은 성공
                // response.end();
                response.redirect('/?id=${title}');
            })
    });
    */
});

app.get('/update/:pageId', function (request, response) {
        const filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
            const title = request.params.pageId;
            const list = template.list(request.list);
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
          `, `<a href ='/create'>create</a> <a href="/update/${title}"">update</a>`);
            // title의 값이 변하면 수정이 되는 것이 아니라 새로운 파일이 생성되기때문에 id값으로 설정
            response.send(html);
        });
});

app.post('/update_process', function (request, response) {
    //body-parser 사용
    const post = request.body;
    const id = post.id;
    const title = post.title;
    const description = post.description;
    fs.rename(`./data/${id}`, `./data/${title}`, function(error) {
        fs.writeFile(`./data/${title}`, description, 'utf8',
            function(err) {
                response.redirect('/?id=${title}');
            })
    })
    /* 기존 방법
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
                    response.redirect('/?id=${title}');
                })
        })
    });
    */
});

app.post('/delete_process', function (request, response) {
    const post = request.body;
    const id = post.id;
    const filteredId = path.parse(id).base;
    fs.unlink(`./data/${filteredId}`, function(error) {
        response.redirect('/');
    })
    /*
    let body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        const post = qs.parse(body);
        const id = post.id;
        const filteredId = path.parse(id).base;
        fs.unlink(`./data/${filteredId}`, function(error) {
            response.redirect('/');
        })
    });
    */
});

app.listen(3000, function () {
    console.log('port 3000!')
});
