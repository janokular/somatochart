## SomatoChart
### Start the application inside Vagrant VM
```
vagrant up && vagrant ssh

cd /vagrant
. ./.venv/bin/activate
flask run
```

### CSV file requirements
```
# CSV file is expected to have following header (order does not matter)
endo,meso,ecto,name,color,symbol
```

| field | type | value |
|:-----:|:----:|-------|
| `endo` | float | from 0 to 8 |
| `meso` | float | from 0 to 8 |
| `ecto` | float | from 0 to 8 |
| `name` | string | |
| `color` | string | circle, square, triangle |
| `symbol` | string | red, orange, yellow, green, blue, purple |

```
# Example
endo,meso,ecto,name,color,symbol
1.55,6.63,2.56,Athlete Name,blue,circle
.
.
.
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
