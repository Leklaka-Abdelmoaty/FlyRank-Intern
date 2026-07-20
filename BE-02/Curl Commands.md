# Curl Response

## Stage 0 : Hello, server

### Request

```bash
curl -i http://localhost:3000/
```

### Response

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-iEQ9RXvkycqsT4vWvcdHrxZT8OE"
Date: Mon, 20 Jul 2026 23:37:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Hello World!"}
```
