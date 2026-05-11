from csv import DictReader
from io import TextIOWrapper
from typing import get_type_hints

from .models import Athlete


def csv_parser(csv_file) -> list[dict]:
    '''
    Read CSV file, parse data to expected type based on Athlete schema
    and return list of dictionaires with Athletes data
    '''
    stream = TextIOWrapper(
        csv_file.stream,
        encoding='utf-8',
        newline=''
    )
    reader = DictReader(stream)

    athletes = []
    expected_type = get_type_hints(Athlete)

    for row in reader:
        parsed_row = {}
        for key, value in row.items():
            try:
                parsed_row[key] = expected_type[key](value)
            except:
                raise Exception(
                    f"Inccorect data type, {key} is of type {expected_type[key].__name__} but found value '{value}'"
                )
        athletes.append(Athlete(**parsed_row).to_dict())

    return athletes
