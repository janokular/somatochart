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
curl -X POST http://localhost:3000/add_athlete \
     -H "Content-Type: application/json" \
     -d '{"x": 1, "y": 2, "name": "New Athlete", "color": "blue"}'
```
```
curl -X PUT http://localhost:3000/update_athlete/6732f8c9e1a4b2f9d4c12345 \
     -H "Content-Type: application/json" \
     -d '{"x": 2, "y": 3, "name": "Updated Athlete", "color": "green"}'
```
```
curl -X DELETE http://localhost:3000/delete_athlete/6732f8c9e1a4b2f9d4c12345
```
