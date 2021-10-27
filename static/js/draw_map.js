
/* Map projection settings */
let proj;
let geoGenerator = d3.geoPath().projection(proj);
var lan_name;

let state = {
    type:       'Mercator',
    scale:      1000,
    translateX: 170,
    translateY: 270,
    centerLon:  15,
    centerLat:  63
}

function update_data_div(){
    let lan_cases = get_age_data_by_county_and_age_group(lan_name, agespan);
    let lan_population = get_population_data_by_age_group_and_county(lan_name, agespan);
    let ratio = get_age_data_by_age_group_and_county_per_capita(lan_name, agespan);

    data_div_title = lan_name;
    data_div_subtitle = "Åldersgrupp: " + agespan;
    data_div_row0 = "Antal vaccinerade: " + lan_cases;
    data_div_row1 = "Befolkning: " + lan_population;
    data_div_row2 = "Antal vaccinerade per capita: "
                        + d3.format(".2%")(ratio);

    d3.select("#data_div")
        .html('<div class="data title">' + data_div_title + '</div>' +
              '<div class="data subtitle">' + data_div_subtitle + '</div>' +
              '<div class="data row0">' + data_div_row0 + '</div>' +
              '<div class="data row1">' + data_div_row1 + '</div>' +
              '<div class="data row2">' + data_div_row2 + '</div>')
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
    var minmax = d3.extent(get_age_data_by_age_group_per_capita(agespan));

    update_data_div();

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
           get_age_data_by_age_group_and_county_per_capita(d.properties.LnNamn,
                                                           agespan))
       )
    
    d3.select("#legend svg").remove();
    spawn_legend("#legend", minmax);
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
    lan_name = "Västra Götalands län";
    update_data_div();

    add_table(age_data, "div#table");
    /* add colours to the map */
    update();
}

