
/* Map projection settings */
let proj;
let geoGenerator = d3.geoPath().projection(proj);

let state = {
    type:       'Mercator',
    scale:      900,
    translateX: 170,
    translateY: 250,
    centerLon:  15,
    centerLat:  63
}

var data_div_title;
var data_div_type;
var data_div_value;

/* Updates the #data_div (right of the map) with text */
function update_data_div(title, type, value){
    d3.select("#data_div")
        .html('<div class="data">' + title + "</div>" +
              "<br/>" + type + ": " + value)
}

/* Spread the d3.interpolateReds colour scale between min and max,

   maximum value returns "strongest" colour:
   heat_colour([0,100000])(100000) == rgb(103, 0, 13)
   heat_colour([0,99])(99) == rgb(103, 0, 13)

   minimum value returns "weakest" colour:
   heat_colour([0,99])(0) == rgb(255, 245, 240)
   heat_colour([55,555])(55) == rgb(255, 245, 240) */

function heat_colour([min,max]){
        return d3.scaleSequential([min,max],d3.interpolateReds);
}



/* Updates the map */
function update() {
    /* [min,max] "agespan" values
       for all counties */
    var minmax = d3.extent(get_age_data_by_age_group(agespan));

    console.log("updating agespan: " + agespan)

    data_div_type = agespan;
    data_div_value = get_age_data_by_county_and_age_group(data_div_title,
                                                          agespan);

    update_data_div(data_div_title, data_div_type, data_div_value);

    /* select g.map (take a look at the index.html - it is the "g" tag of class
     * "map" inside the svg tag), parse through all the data we get through
     * get_geojson_features(), which is map vector data of every County/Län -
     * assign it to <path> tag, basically, draw the map. Read more about path
     * tag/element:
      https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
     */
    let u = d3.select('g.map')
       .selectAll('path')
       .data(get_geojson_features())

    u.attr("fill", d =>
           heat_colour(minmax)(
               get_age_data_by_county_and_age_group
               (d.properties.LnNamn,agespan))
       )
}

/* Constructs the map on the *first* run */
function draw_map(){

    /* choose Mercator as projection type */
    proj = d3.geoMercator()
    geoGenerator.projection(proj)

    /* fit Sweden on the map */
    proj.scale(state.scale)
        .translate([state.translateX, state.translateY])
        .center([state.centerLon, state.centerLat])

    let u = d3.select('g.map')
        .selectAll('path')
        .data(get_geojson_features())

    /* append every "path" to the DOM, assign the right colour (by using "fill"
     * attribute) based on Län+age span data */ 
    u.enter()
       .append('path')
    /*
      Data to be drawn, more about the attribute "d":
      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d */
       .attr('d', geoGenerator)


    /* Set some initial values */
    d3.select("select#ageselect").node().value = agespan; // selector
    data_div_title="Västra Götalands län"; // select the county

//    add_legend("#legend");

    add_table(age_data, "div#table");
    /* add colours to the map */
    update();
}

