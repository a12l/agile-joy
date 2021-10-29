
function spawn_legend(append_to, minmax) {


    //Settings for legend
    var legendSettings = {
        boxX: 5,
        boxY: 24,
        boxHeight: 20,
        boxWidth: 300,
        fontSize: 12
    }
    
    var svgSettings = {
        svgX: 0,
        svgY: 550,
        svgWidth: legendSettings.boxWidth+100,
        svgHeight: legendSettings.boxHeight*3
    }

    //Spawn SVG
    var svg = d3.select(append_to).append("svg")
    //.attr("x", svgSettings.svgX)
    //.attr("y", 1000)
    .attr("width", svgSettings.svgWidth)
    .attr("height", svgSettings.svgHeight)



    //
    var svgDefinitions = svg.append("defs");
    var linearGradientTextLabel = svgDefinitions.append("linearGradient");

    linearGradientTextLabel
    .attr("id", "textBg")
    .attr("x1", "0")
    .attr("x2", "1")
    .attr("y1", "0")
    .attr("y2", "0");

    //Adjust gradients
    linearGradientTextLabel.append("stop")
    //.attr("offset", "")
    .attr("stop-color", d3.interpolateReds(0))
    .attr("stop-opacity", "1")

    linearGradientTextLabel.append("stop")
    .attr("offset", "1")
    .attr("stop-color", d3.interpolateReds(1))

    //Append Box  
    svg.append("rect")
        .attr("y", legendSettings.boxY)
    .attr("x", legendSettings.boxX)
    .attr("width", legendSettings.boxWidth)
    .attr("height", legendSettings.boxHeight)
        .attr("fill", "url(#textBg)")
//        .attr("stroke", "")
    
    //Append Text
    svg.append("text")
//    .text("Antal sjuka i Covid 19 per län")
    .text("Antal vaccinerade per capita")
    .attr("y", legendSettings.boxY-5)
    .attr("x", legendSettings.boxX)
    .attr("font-size", legendSettings.fontSize)
    .attr("font-family", "monospace")
    .attr("fill", "black");
    
    //---------------
    //Lines

    var nLines = 4;
    


    /*Linesettings
        x1      |-------------------|
                |                   |
            y1  |                   |
                |-------------------| x2,y2
    */
    var lineSettings = {
        x1: legendSettings.boxX,
        y1: legendSettings.boxY+legendSettings.boxHeight-5,
        x2: legendSettings.boxX+legendSettings.boxWidth,
        y2: legendSettings.boxY+legendSettings.boxHeight+10,
        height: legendSettings.boxHeight,
        offset: legendSettings.boxWidth/nLines,
    }
    var textSettings = {
        fontSize: 12
    }
    //Make array of values where all lines should start
    var lineSeriesX =[];
    var valuesSeries = [];

    for (let i=0; i<nLines; i++) {
        lineSeriesX[i] = lineSettings.x1 + lineSettings.offset*i;     
        valuesSeries[i] = minmax[0] + i*(minmax[1]-minmax[0])/nLines;
        }

    function valuesSeries_to_percent(n){
        return d3.format(".2%")(valuesSeries[n]);
    }

    //Draw lines and add text
    svg.append("line")
        .attr("x1", lineSeriesX[0])
        .attr("y1",lineSettings.y1)
        .attr("x2",lineSeriesX[0])
        .attr("y2",lineSettings.y2)
        .style("stroke", "black")
        .style("stroke-width",2);
    svg.append("text")
        .text(valuesSeries_to_percent(0))
        .attr("y", lineSettings.y2)
        .attr("x", lineSeriesX[0])
        .attr("font-size", textSettings.fontSize)
        

    svg.append("line")
        .attr("x1", lineSeriesX[1])
        .attr("y1",lineSettings.y1)
        .attr("x2",lineSeriesX[1])
        .attr("y2",lineSettings.y2)
        .style("stroke", "black")
        .style("stroke-width",2)
    svg.append("text")
        .text(valuesSeries_to_percent(1))
        .attr("y", lineSettings.y2)
        .attr("x", lineSeriesX[1])
        .attr("font-size", textSettings.fontSize)

    svg.append("line")
        .attr("x1", lineSeriesX[2])
        .attr("y1",lineSettings.y1)
        .attr("x2",lineSeriesX[2])
        .attr("y2",lineSettings.y2)
        .style("stroke", "black")
        .style("stroke-width",2)
    svg.append("text")
        .text(valuesSeries_to_percent(2))
        .attr("y", lineSettings.y2)
        .attr("x", lineSeriesX[2])
        .attr("font-size", textSettings.fontSize)

    svg.append("line")
        .attr("x1", lineSeriesX[3])
        .attr("y1",lineSettings.y1)
        .attr("x2",lineSeriesX[3])
        .attr("y2",lineSettings.y2)
        .style("stroke", "black")
        .style("stroke-width",2)
    svg.append("text")
        .text(valuesSeries_to_percent(3))
        .attr("y", lineSettings.y2)
        .attr("x", lineSeriesX[3])
        .attr("font-size", textSettings.fontSize)

    svg.append("line")
        .attr("x1", lineSettings.x2-1)
        .attr("y1",lineSettings.y1)
        .attr("x2",lineSettings.x2-1)
        .attr("y2",lineSettings.y2)
        .style("stroke", "black")
        .style("stroke-width",2)
    svg.append("text")
        .text(d3.format(".2%")(minmax[1]))
        .attr("y", lineSettings.y2)
        .attr("x", lineSettings.x2)
        .attr("font-size", textSettings.fontSize)

    // for debugging:
    // console.log(minmax)
}


