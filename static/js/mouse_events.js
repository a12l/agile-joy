
var tmp_colour;

/* Callback function for mouseover event, use the "geojson_data" that is passed
 * to the function, to write the lan_name and lan_cases data to the
 * "div#data_div" */

function handle_mouseover(a, geojson_data) {

    lan_name = geojson_data.properties.LnNamn;
    update_data_div(lan_name);

    var this_path = d3.select(this);
    tmp_colour = this_path.attr("fill");
    this_path.attr("fill", "#0aa")
}

/* On mouseout, fill the County map with the old colour */
function handle_mouseout() {
    d3.select(this).attr("fill", tmp_colour)
}

/* Callback for the "select" element (used for choosing the age)  */
function handle_ageselect() {
    agespan = event.target.value;
    update();
}

var display_table = 0;
function handle_button_toggle_table() {
    if(display_table == 0) {
       display_table = 1;
       d3.select("div#table")
            .style("opacity", 0)
            .style("visibility", "visible") 
            .transition()
            .duration(1000)
            .style("opacity", 0.9);
    } else {
       display_table = 0;
       d3.select("div#table")
            .style("opacity", 0.9)
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .transition()
            .style("visibility", "hidden"); 
    }
}

function clickable() {
    d3.selectAll("path").on("mouseover", handle_mouseover);
    d3.selectAll("path").on("mouseout", handle_mouseout);
    d3.select("#ageselect").on("change", handle_ageselect);
    d3.select("#button_table").on("click", handle_button_toggle_table);
}

