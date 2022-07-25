const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    const str = `您的请求路径是${req.url}，您的method类型是${req.method}`
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(str)
})

server.listen(80, () => {
    console.log('http://127.0.0.1')
})