#!/bin/bash

# Make sure user provided all needed arguments
number_of_params="${#}"
if [[ "${number_of_params}" -ne 1 ]]; then
  echo "Usage: ${0} CSV_FILE" >&2
  exit 1
fi

csv_file="${1}"

# Make sure the .csv file exists
if [[ ! -e "${csv_file}" ]]; then
  echo "Cannot open .csv file ${csv_file}" >&2
  exit 1
fi

curl -X POST http://localhost:5001/athletes \
     -F "file=@$csv_file;type=text/csv"
