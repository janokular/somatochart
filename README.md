## SomatoChart
### Start the application
```
vagrant up && vagrant ssh

cd /vagrant
. ./.venv/bin/activate
flask run
```

### CSV file requirements
```
# CSV file is expected to have the following header (order does not matter)
endo,meso,ecto,name,color,symbol

# Example
endo,meso,ecto,name,color,symbol
1.55,6.63,2.56,Athlete Name,blue,circle
.
.
.
```

#### Supported values
| field | type | value |
|:-----:|:----:|-------|
| `endo` | float | from 0 to 8 |
| `meso` | float | from 0 to 8 |
| `ecto` | float | from 0 to 8 |
| `name` | string | |
| `color` | string | red, orange, yellow, green, blue, purple |
| `symbol` | string | circle, square, triangle |

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
