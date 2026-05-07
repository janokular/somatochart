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

# TODO: .csv file must end with an empty line otherwise last entry will be skipped
while IFS="," read -r endo meso ecto name color symbol visible; do
  curl -X POST http://localhost:5001/athletes \
     -H "Content-Type: application/json" \
     -d "{\"endo\": $endo, \"meso\": $meso, \"ecto\": $ecto, \"name\": \"$name\", \"color\": \"$color\", \"symbol\": \"$symbol\", \"visible\": $visible}"
done < <(tail -n +2 "${csv_file}")
