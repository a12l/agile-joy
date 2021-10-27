
function add_table(data, append_to) {
        var columns = data.columns;

        d3.select(append_to)
            .append("table")
            .attr("class", "tabell") 
            .append("thead")
            .append("tr")
            .selectAll("th")
            .data(columns)
            .join("th")
            .text(d => d)

        d3.select(".tabell")
            .append("tbody")
        
        d3.select("tbody")
            .selectAll("tr")
            .data(data)
            .enter()
            .append("tr")
            .selectAll("td")
            .data(d => Object.values(d))
            .enter().append("td")
            .text(d => d);
}

