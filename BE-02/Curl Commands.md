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
## Stage 1 : Your first real endpoint

### Request : get /

```bash
curl http://localhost:3000/
```

### Response

```json
{ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] }
```

### Request : get /health

```bash
curl http://localhost:3000/health
```

### Response

```json
{ "status": "ok" }
```
## Stage 2 : Read: list and single task

### Request : get /tasks/1

```bash
curl -i http://localhost:3000/tasks/1
```

### Response

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 36
ETag: W/"24-fIJvWZ/a7EGZk3iTRHDQYLmz2bw"
Date: Mon, 20 Jul 2026 23:46:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":1,"title":"task1","done":true}
```

### Request : get /tasks/99

```bash
curl -i http://localhost:3000/tasks/99
```

### Response

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 29
ETag: W/"1d-kQQdPQ+i/Wk9IgXh55Kh5auGltk"
Date: Mon, 20 Jul 2026 23:47:31 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Task 99 not found"}
```
## Stage 3 : create with validation


### Request : successful POST

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

### Response

```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-PpSBYV7i68cXyGc7AhjVpkZkY5Q"
Date: Mon, 20 Jul 2026 23:55:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Buy milk","done":false}
```

### Request : missing title

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{}'
```

### Response

```
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 23
ETag: W/"17-i22p4FL6eG9sZYzIFCm/xvy/pHM"
Date: Mon, 20 Jul 2026 23:56:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Title is required"}
```
## Stage 4 : Update & Delete (full CRUD)

### Request : update task (replace title and/or done)

```bash
curl -i -X PUT http://localhost:3000/tasks/3 -H "Content-Type: application/json" -d '{"title":"Checkpoint2 updated","done":true}'
```

### Response (200 OK)

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-jepLXie6TVWxwb/BpGeuN1OMyus"
Date: Tue, 21 Jul 2026 00:02:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":3,"title":"Checkpoint2 updated","done":true}
```

### Request : update with empty/invalid body

```bash
curl -i -X PUT http://localhost:3000/tasks/3 -H "Content-Type: application/json" -d '{}'
```

### Response (400 Bad Request)

```
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 23
ETag: W/"17-i22p4FL6eG9sZYzIFCm/xvy/pHM"
Date: Tue, 21 Jul 2026 00:03:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Bad Request"}
```

### Request : update unknown id

```bash
curl -i -X PUT http://localhost:3000/tasks/99 -H "Content-Type: application/json" -d '{"title":"Does not exist"}'
```

### Response (404 Not Found)

```HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-D4dsL3U5Autp3bKNpxD/le70vNM"
Date: Tue, 21 Jul 2026 00:03:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Task 99 not found"}
```

### Request : delete task

```bash
curl -i -X DELETE http://localhost:3000/tasks/3
```

### Response (204 No Content)

```
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Tue, 21 Jul 2026 00:04:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

```

### Request : delete unknown id

```bash
curl -i -X DELETE http://localhost:3000/tasks/99
```

### Response (404 Not Found)

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-D4dsL3U5Autp3bKNpxD/le70vNM"
Date: Tue, 21 Jul 2026 00:05:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Task 99 not found"}
```
