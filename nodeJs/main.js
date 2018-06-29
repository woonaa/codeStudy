const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function(request,response){
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    console.log(queryData);
    if(_url === '/'){
        _url = '/index.html';
    }
    if(_url === '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + _url));

});
app.listen(3000);