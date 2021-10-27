
var geojson;

/* Gets map data, after that imports age data, after that updating the view,
   after that connects mouse events */
d3.json('data/lan_7.0.geojson')
    .then(d => geojson = d)
    .then(import_population_data)
    .then(import_agedata)
    .then(draw_map)
    .then(clickable);

/* structure of the lan_7.0.geojson file:

    Object { type: "FeatureCollection", generator: "JOSM", features: (48) […] }

        Object { type: "Feature", properties: {…}, geometry: {…} }

            features: Array(48) [ {…}, {…}, {…}, … ]
               LnKod (Länkod, County code) and LnNamn (Län namn, County name)

            geometry: Object { type: "LineString", coordinates: (99) […] }
               vector data for displaying the map
*/

/* returns the features of the selected object (look at the structure above) */
function get_geojson_features(){
    return geojson.features;
}

