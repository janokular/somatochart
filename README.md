## SomatoChart
### Start the application
```shell
# Create an virtual environment
python3 -m venv .venv

# Activate the virtual environment
. ./.venv/bin/activate

# Install requirements.txt
pip3 install -r requirements.txt

# Run the application with Flack CLI
flask run

# Or run it from the project directory
python3 run.py
```

### CSV file requirements
> [!IMPORTANT]
> **Use the following instructions for creating compatible CSV files**

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
