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

# Add athlete
curl -X POST http://localhost:5001/athletes \
     -H "Content-Type: application/json" \
     -d '{"endo": 1, "meso": 2, "ecto": 3, "name": "New Athlete", "color": "blue", "symbol": "circle", "visible": true}'

# Delete all athletes
curl -X DELETE http://localhost:5001/athletes
```
