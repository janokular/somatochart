## SomatoChart
### Start the application
```
vagrant up && vagrant ssh

cd /vagrant
. ./.venv/bin/activate
flask run
```

### CSV file requirements
#### Expected CSV file header
| CSV header (order does not matter) |
|:----------------------------------:|
| `endo,meso,ecto,name,color,symbol` |

#### Supported values
| field | type | value requirements |
|:-----:|:----:|:------------------:|
| `endo` | float | in range from `0` to `8` |
| `meso` | float | in range from `0` to `8` |
| `ecto` | float | in range from `0` to `8` |
| `name` | string | no requirements |
| `color` | string | `red` `orange` `yellow` `green` `blue` `purple` |
| `symbol` | string | `circle` `square` `triangle` |

#### Example
```
endo,meso,ecto,name,color,symbol
1.55,6.63,2.56,Athlete Name,blue,circle
.
.
.
```

### curl
#### Get all athletes
```
curl -X GET http://localhost:5001/athletes
```

#### Add athletes from CSV file
```
curl -X POST http://localhost:5001/athletes \
     -F "file=@athletes.csv;type=text/csv"
```

#### Delete all athletes
```
curl -X DELETE http://localhost:5001/athletes
```
