## SomatoChart
### Start the application
```
. ./.venv/bin/activate
flask run --host=0.0.0.0 --port=3000 --debug
```

### curl
```
curl -X GET http://localhost:3000/athletes
```
```
curl -X GET http://localhost:3000/athletes/6732f8c9e1a4b2f9d4c12345
```
```
curl -X POST http://localhost:3000/athletes \
     -H "Content-Type: application/json" \
     -d '{"endo": 1, "meso": 2, "ecto": 3, "name": "New Athlete", "color": "blue"}'
```
```
curl -X PUT http://localhost:3000/athletes/6732f8c9e1a4b2f9d4c12345 \
     -H "Content-Type: application/json" \
     -d '{"endo": 0, "meso": 1, "ecto": 1, "name": "Updated Athlete", "color": "green"}'
```
```
curl -X DELETE http://localhost:3000/athletes/6732f8c9e1a4b2f9d4c12345
```
