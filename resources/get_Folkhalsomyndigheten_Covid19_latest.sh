# Gets the latest data from https://github.com/codler/sweden-coronavirus and
# converts it to a CSV file.

#!/bin/bash

NAME=Folkhalsomyndigheten_Covid19_latest
XLSX=$NAME.xlsx
CSV=$NAME.csv

wget -O $XLSX "https://github.com/codler/sweden-coronavirus/blob/master/folkhalsomyndigheten/Folkhalsomyndigheten_Covid19_latest.xlsx?raw=true"

if test -f "$XLSX"; then
    xlsx2csv $XLSX $CSV
fi
