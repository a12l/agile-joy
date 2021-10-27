
var age_data;
var agespan = '20-24 år';

let population_data = {};

/* Import the age data from the agedata.csv file */
let import_agedata =
    d3.dsv(';', 'data/agedata.csv')
    .then(d => age_data = d);

let import_population_data = 
    d3.dsv(';', 'data/befolkning1.csv').then(function(data) {
    for (let i = 0; i < data.length; i++) {
        population_data[data[i].region] = data[i];
    }
});

function get_age_data_by_age_group_per_capita(age_group) {
    let per_capita = []
    let cases;
    let region
    let population;
    console.log('here');
    for (const i in age_data) {
        for(const j in age_data[i]){
            if(j==age_group) {
                // convert from String to Number and push to the array
                cases = age_data[i][j];
                region = age_data[i].län;
                population = population_data[region][j];
                per_capita.push(cases/population);
            }
        }
    }
    return (per_capita);
}

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
            if(j=="län")
                curr_county = age_data[i][j];
            if(j==age_group && county == curr_county)
                age_data_by_age_group_and_county = parseInt(age_data[i][j]);
        }
    }
    return age_data_by_age_group_and_county;
}

function get_age_data_by_age_group_and_county_per_capita(county, age_group){
    var curr_county;      
    var age_data_by_age_group_and_county = null;
    let population;
    let per_capita;
    for (const i in age_data){                                               
        for(const j in age_data[i]){
            if(j=="län")
                curr_county = age_data[i][j];
            if(j==age_group && county == curr_county) {
                age_data_by_age_group_and_county = parseInt(age_data[i][j]);
                population = population_data[curr_county][j];
                per_capita = age_data_by_age_group_and_county/population;
            }
        }
    }
    return per_capita;
}

function get_population_data_by_age_group_and_county(county, age_group) {
    return population_data[county][age_group];
}

