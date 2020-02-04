// Bước 1: Import module http
var http = require('http');
var qs = require('querystring');

// Bước 2: Khởi tạo server
var server = http.createServer(function(request, response){
    // Biến request: là biến lưu trữ thông tin gửi lên của client
    // Biến response: là biến lưu trữ các thông tin trả về cho client

    if (request.url === '/api/summary') {
      // Thiết lập Header
      response.writeHead(200, {
          "Context-type" : "application/json"
      });

      // Show thông tin
      var objToJson = {
        address: 13445,
        strategy: 123,
        donor: 1231,
        total: 44000000000,
      };
      response.write(JSON.stringify(objToJson));

      // Kết thúc
      response.end();
    } else if (request.method === 'POST' && request.url === '/api/login') {
      var body = '';
        request.on('data', function (data) {
          console.log('data ',data)
            body += data.toString();
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {

            var POST = qs.parse(body);
            console.log('post ',POST)
            if (POST.username === 'sanglq') {
              console.log('asdasd')
            }
            // use POST
            var objToJson = {
              username: 'sanglq',
              token: '123dsfdgdgdg1313',
            };
            response.end(JSON.stringify(objToJson));
        });

    }
    else // trường hợp ngược lại ko tìm thấy file
    {
        // Thiết lập Header
        response.writeHead(404, {
            "Context-type" : "text/plain"
        });

        // Show lỗi không tìm thấy trang
        response.write('404 Not Found ' + request.url);

        // Kết thúc
        response.end();
    }
});

// Bước 3: Lắng nghe cổng 300 thì thực hiện chương trình
server.listen(8080, function(){
    console.log('Connected Successfull!');
});
