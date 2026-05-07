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

# Add athletes from CSV file
curl -X POST http://localhost:5001/athletes \
     -F "file=@athletes.csv;type=text/csv"

# Delete all athletes
curl -X DELETE http://localhost:5001/athletes
```
