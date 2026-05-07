from csv import DictReader
from io import TextIOWrapper
from typing import get_type_hints

from .models import Athlete


def parse_csv_file(csv_file):
    file_data = []
    
    stream = TextIOWrapper(
        csv_file.stream,
        encoding='utf-8',
        newline=''
    )

    reader = DictReader(stream)

    for row in reader:
        parsed_row = {}
        for key, value in row.items():
            expected_type = get_type_hints(Athlete).get(key)
            parsed_row[key] = expected_type(value)
        
        file_data.append(parsed_row)

    return file_data
