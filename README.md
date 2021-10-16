This example is using D3
https://d3js.org
https://github.com/d3

and modified example code from https://www.d3indepth.com


./resources/get_Folkhalsomyndigheten_Covid19_latest.sh
Gets the latest data from https://github.com/codler/sweden-coronavirus and
converts it to a CSV file.

The map ./static/data/lan_6.0.geojson is converted using qgis, layer import,
then export layer as GeoJSON with option RFC7946 enabled. The original file
used was ./resources/tab_svenska_210505.zip owned by Lantmäteriet.

./static/bare_index.html
without local access, using js, geoJSON, cvs data from github
