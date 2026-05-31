from csv import DictReader
from io import TextIOWrapper
from typing import get_type_hints

from .models import Athlete


def csv_parser(csv_file) -> list[dict]:
    '''
    Read CSV file, parse data to expected type based on Athlete schema
    and return list of dictionaries with Athletes data
    '''
    athletes = []
    
    stream = TextIOWrapper(
        csv_file.stream,
        encoding='utf-8',
        newline=''
    )
    reader = DictReader(stream)

    expected_type = get_type_hints(Athlete)
    expected_header = list(expected_type.keys())

    if sorted(reader.fieldnames) != sorted(expected_header):
        raise Exception(
            f"Incorrect CSV file header, expected header '{','.join(expected_header)}'"
        )

    for row in reader:
        parsed_row = {}
        for key, value in row.items():
            try:
                parsed_row[key] = expected_type[key](value)
            except:
                raise Exception(
                    f'Incorrect data type, {key} should be of type {expected_type[key].__name__} current value: {value}'
                )
        athletes.append(Athlete(**parsed_row).to_dict())

    return athletes
