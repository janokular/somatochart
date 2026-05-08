from csv import DictReader
from io import TextIOWrapper
from typing import get_type_hints

from .models import Athlete


def csv_parser(csv_file) -> list[dict]:
    '''
    Read CSV file, parse data using Athlete schema and
    return list of dictionaires with Athletes data
    '''
    athletes = []
    
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
            try:
                parsed_row[key] = expected_type(value)
            except:
                raise Exception(f'Inccorect data type {key} is expected to be {expected_type}')
        athlete = Athlete(**parsed_row).to_dict()
        athletes.append(athlete)

    return athletes
