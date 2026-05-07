from csv import DictReader
from io import StringIO


def auto_convert(value):
    value = value.strip()

    if value == "":
        return None

    # Boolean
    if value.lower() == 'true':
        return True
    if value.lower() == 'false':
        return False

    # Integer
    try:
        return int(value)
    except ValueError:
        pass

    # Float
    try:
        return float(value)
    except ValueError:
        pass

    # Default: string
    return value


def csv_reader(csv_file):
    file_data = []
    
    stream = StringIO(csv_file.stream.read().decode('UTF8'), newline=None)
    csv_reader = DictReader(stream)

    for row in csv_reader:
        converted_row = {key: auto_convert(value) for key, value in row.items()}
        file_data.append(converted_row)

    return file_data
