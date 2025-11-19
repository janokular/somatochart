REQUIRED_FIELDS = ['name', 'endo', 'meso', 'ecto', 'color', 'symbol', 'isVisible']

MAX_NAME_LEN = 20
MAX_ENDO_MESO_ECTO = 7
MIN_ENDO_MESO_ECTO = 1
POINT_COLORS = ['blue', 'red', 'green']
POINT_SYMBOLS = ['circle', 'square', 'triangle']

def validate_user_request(data):
    errors = []
    
    if not data:
        errors.append('Request body is missing')
        return errors

    for key in REQUIRED_FIELDS:
        if key in data:
            match key:
                case 'name':
                    if not isinstance(data[key], str) \
                        or len(data[key]) > MAX_NAME_LEN:
                            errors.append(f'{key}: {data[key]} must be a string of max length 20')
                case 'endo':
                    if not isinstance(data[key], int) \
                        or data[key] > MAX_ENDO_MESO_ECTO \
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(f'{key}: {data[key]} must be an integer in range from 1 to 7')
                case 'meso':
                    if not isinstance(data[key], int) \
                        or data[key] > MAX_ENDO_MESO_ECTO\
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(f'{key}: {data[key]} must be an integer in range from 1 to 7')
                case 'ecto':
                    if not isinstance(data[key], int) \
                        or data[key] > MAX_ENDO_MESO_ECTO \
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(f'{key}: {data[key]} must be an integer in range from 1 to 7')
                case 'color':
                    if not isinstance(data[key], str) \
                        or data[key] not in POINT_COLORS:
                            errors.append(f'{key}: {data[key]} must be a string of following values blue|red|green')
                case 'symbol':
                    if not isinstance(data[key], str) \
                        or data[key] not in POINT_SYMBOLS:
                            errors.append(f'{key}: {data[key]} must be a string of following values circle|square|triangle')
                case 'isVisible':
                    if not isinstance(data[key], bool):
                        errors.append(f'{key}: {data[key]} must be a boolean')
                case _:
                    errors.append(f'{key}: {data} unsupported key')
        else:
            errors.append(f'Missing key {key}')

    return errors
