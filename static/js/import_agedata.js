
var age_data;
var agespan = "30-34 år";
// var curr_couty = "Västra Götalands län";

//agespan = d3.select("#ageselect").node().value;

/* Import the age data from the agedata.csv file */
let import_agedata =
    d3.dsv(';', 'data/agedata.csv')
    .then(d => age_data = d);

/* Get the data based on age group
   get_age_data_by_county_and_age_group("100+ år")
       = [ 777, 129, 116, 163, 167, 82, 106, 22, 67, 455, ... ]  */
function get_age_data_by_age_group(age_group){
    let age_data_by_age_group = [];
    for (const i in age_data){
        for(const j in age_data[i]){
            if(j==age_group)
                // convert from String to Number and push to the array
                age_data_by_age_group.push(parseInt(age_data[i][j]));
        }
    }
    return age_data_by_age_group;
}

/* Get the data based on County and age group
   get_age_data_by_county_and_age_group("Värmlands län", "100+ år") = 109 */
function get_age_data_by_county_and_age_group(county, age_group){
    var curr_county;      
    var age_data_by_age_group_and_county = null;
    for (const i in age_data){                                               
        for(const j in age_data[i]){
            if(j=="län"){
                curr_county = age_data[i][j];
            }
            if(j==age_group && county == curr_county)
                age_data_by_age_group_and_county = parseInt(age_data[i][j]);
        }
    } 
    return age_data_by_age_group_and_county;
}

