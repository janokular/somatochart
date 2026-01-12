def validate_user_request(data):
    REQUIRED_FIELDS = ['name', 'endo', 'meso', 'ecto', 'color', 'symbol', 'isVisible']
    MAX_NAME_LEN = 20
    MAX_ENDO_MESO_ECTO = 8
    MIN_ENDO_MESO_ECTO = 0
    POINT_COLORS = ['blue', 'red', 'green']
    POINT_SYMBOLS = ['circle', 'square', 'triangle']
    
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
                            errors.append(
                                f'{key}: {data[key]} must be a string of max length {MAX_NAME_LEN}'
                            )
                case 'endo':
                    if not isinstance(data[key], (int, float)) \
                        or data[key] > MAX_ENDO_MESO_ECTO \
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(
                                f'{key}: {data[key]} must be an number in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}'
                            )
                case 'meso':
                    if not isinstance(data[key], (int, float)) \
                        or data[key] > MAX_ENDO_MESO_ECTO\
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(
                                f'{key}: {data[key]} must be an number in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}'
                            )
                case 'ecto':
                    if not isinstance(data[key], (int, float)) \
                        or data[key] > MAX_ENDO_MESO_ECTO \
                        or data[key] < MIN_ENDO_MESO_ECTO:
                            errors.append(
                                f'{key}: {data[key]} must be an number in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}'
                            )
                case 'color':
                    if not isinstance(data[key], str) \
                        or data[key] not in POINT_COLORS:
                            errors.append(
                                f'{key}: {data[key]} must be a string of following values {POINT_COLORS}'
                            )
                case 'symbol':
                    if not isinstance(data[key], str) \
                        or data[key] not in POINT_SYMBOLS:
                            errors.append(
                                f'{key}: {data[key]} must be a string of following values {POINT_SYMBOLS}'
                            )
                case 'isVisible':
                    if not isinstance(data[key], bool):
                        errors.append(f'{key}: {data[key]} must be a boolean')
                case _:
                    errors.append(f'{key}: {data} unsupported key')
        else:
            errors.append(f'Missing key {key}')

    return errors
