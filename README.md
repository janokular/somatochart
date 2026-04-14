## SomatoChart
### Start the application
```
vagrant up && vagrant ssh

cd /vagrant
. ./.venv/bin/activate
flask run
```

### curl
```
# Get all athletes
curl -X GET http://localhost:5001/athletes

# Get athlete
curl -X GET http://localhost:5001/athletes/6732f8c9e1a4b2f9d4c12345

# Add athlete
curl -X POST http://localhost:5001/athletes \
     -H "Content-Type: application/json" \
     -d '{"endo": 1, "meso": 2, "ecto": 3, "name": "New Athlete", "color": "blue", "symbol": "circle", "isVisible": true}'

# Update athlete
curl -X PUT http://localhost:5001/athletes/6732f8c9e1a4b2f9d4c12345 \
     -H "Content-Type: application/json" \
     -d '{"endo": 0, "meso": 1, "ecto": 1, "name": "Updated Athlete", "color": "green", "symbol": "square", "isVisible": true}'

# Delete athlete
curl -X DELETE http://localhost:5001/athletes/6732f8c9e1a4b2f9d4c12345

# Delete all athletes
curl -X DELETE http://localhost:5001/athletes
```
