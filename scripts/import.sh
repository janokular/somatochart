#!/bin/bash

# Script used for importing .csv data for SomatoChart
# .csv file must end with an empty line otherwise last entry will be skipped

csv_file=$1
name=$(basename $csv_file .csv)
color=$2

# Make sure the file was supplied as an argument
if [[ ! -e "${csv_file}" ]]; then
  echo "Cannot open .csv file ${csv_file}" >&2
  exit 1
fi

while IFS=',' read -r endo meso ecto; do
  curl -X POST http://localhost:8080/athletes \
     -H "Content-Type: application/json" \
     -d "{\"endo\": $endo, \"meso\": $meso, \"ecto\": $ecto, \"name\": \"$name\", \"color\": \"$color\", \"symbol\": \"circle\", \"isVisible\": true}"
done < $csv_file
