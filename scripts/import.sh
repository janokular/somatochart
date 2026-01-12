#!/bin/bash

# Script used for importing .csv data for SomatoChart
# .csv file must end with an empty line otherwise last entry will be skipped

# Make sure user provided all needed arguments
number_of_params="${#}"
if [[ "${number_of_params}" -lt 2 ]]; then
  echo "Usage: ${0} CSV_FILE COLOR" >&2
  exit 1
fi

csv_file=$1
color=$2

# Make sure the file exists
if [[ ! -e "${csv_file}" ]]; then
  echo "Cannot open .csv file ${csv_file}" >&2
  exit 1
fi

name=$(basename $csv_file .csv)

while IFS=',' read -r endo meso ecto; do
  curl -X POST http://localhost:8080/athletes \
     -H "Content-Type: application/json" \
     -d "{\"endo\": $endo, \"meso\": $meso, \"ecto\": $ecto, \"name\": \"$name\", \"color\": \"$color\", \"symbol\": \"circle\", \"isVisible\": true}"
done < $csv_file
