## SomatoChart
> [!IMPORTANT]
> **Consider this app a working demo and proof of concept; it is not production-ready**
### Start the application locally
```shell
# Clone the repository
git clone https://github.com/janokular/somatochart.git

# Create the .env file with following environment variables
FLASK_APP=somatochart
FLASK_RUN_HOST=0.0.0.0
FLASK_RUN_PORT=5001
FLASK_DEBUG=True

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

# Go to the locally running app
http://localhost:5001
```

> [!IMPORTANT]
> **Use the following instructions for creating compatible CSV files**
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
