function modelConstructor() {
    //AT THE END DELETE :
    /*
     
      var uniUKPRNNotExistCount 
      var uniTownNotExist 



    var model = {};

    model.processData = function (universities, towns, countries, countries2) {
        var sortedData = dataDisplay(universities, towns, countries, countries2);       
        dataInJson.json = sortedData;
       // dataInJson.length = sortedData.length;
        return model;
    }

   
   
    model.model = function () { return dataInJson }


    var dataInJson = {};
    */
    let countriesMap = new Map();
    var data = []; 

    d3.queue()
        .defer(d3.csv, "data/REF2014_Results.csv")
        .defer(d3.csv, "data/learning-providers-plus.csv")
        .defer(d3.csv, "data/uk-towns.csv")  // from https://github.com/bwghughes/badbatch
        .defer(d3.csv, "data/Towns_List (1).csv")
        .await(dataDisplay)


    function dataDisplay(error, universities, towns, countries, countries2) {



        countries.forEach(function (d) {
            if (countriesMap.has(d["country"])) {

            } else {
                countriesMap.set(d["country"], [0, 0, 0, 0, 0]);
            }

        })


        var currentUniID = 0;
        var uniSchools = 0;
        var uniScores = [0, 0, 0, 0];
        var uniUKPRNNotExistCount = 0;
        var uniTownNotExist = 0;
        //goes through every uni and averages it's star rating and adds its averages to the uni's country
        universities.forEach(function (d) {
            //this if clause is to avoid skipping the first university
            if (currentUniID == 0) {
                currentUniID = d["Institution code (UKPRN)"];

            }
            else if (d["Institution code (UKPRN)"] == currentUniID) {   //only getting the overall scores
                if (d["Profile"].localeCompare("Overall") == 0) {
                    //counting the number of schools in a university to allow for average calculation later on
                    uniSchools = uniSchools + 1;
                    uniScores[0] = parseFloat(uniScores[0]) + parseFloat(d["4*"]);
                    uniScores[1] = parseFloat(uniScores[1]) + parseFloat(d["3*"]);
                    uniScores[2] = parseFloat(uniScores[2]) + parseFloat(d["2*"]);
                    uniScores[3] = parseFloat(uniScores[3]) + parseFloat(d["1*"]);

                }
            } else {

                var uniTown = townSearch(currentUniID);

                //some university's UKPRNs did not exist in learning-provider-plus.csv so they are ignored
                if (uniTown != null) {
                    var country = countrySearch(uniTown.toLowerCase());

                    //some uni towns did not exist in towns_list(1).csv so they are ignored
                    if (country != true) {
                        processUniAverage(country, uniScores);

                    } else {
                        //to go through a second csv to find the country
                        var countryOfUni = countrySearchMissing(uniTown.toLowerCase());

                        if (countryOfUni != true) {
                            processUniAverage(countryOfUni, uniScores);

                        } else {


                            uniTownNotExist++;
                        }


                    }

                } else {
                    uniUKPRNNotExistCount++;
                }


                currentUniID = d["Institution code (UKPRN)"];
                uniSchools = 0;
                uniScores = [0, 0, 0, 0];
            }

        })


        //get town of uni
        function townSearch(uniID) {
            for (let town of towns) {
                if (uniID == town["UKPRN"]) {
                    return town["TOWN"];
                }
            }
        }


        // calculates the average of the ratings for the uni and adds the array values to the uni's country
        function processUniAverage(country, uniScores) {
            var countryScores = countriesMap.get(country);
            //countryScores[0] keeps track of the number of universities in a country
            countryScores[0] = parseFloat(countryScores[0]) + 1;

            var count;
            for (count = 0; count < uniScores.length; count++) {
                countryScores[count + 1] = parseFloat(countryScores[count + 1]) + parseFloat(uniScores[count] / uniSchools);
            }

            countriesMap.set(country, countryScores);
        }

        //get country of uni
        function countrySearch(townName) {
            if (townName.toLowerCase() == null) {

            } else {
                var notFound = true;
                for (let country of countries) {

                    if (townName.toLowerCase().localeCompare(country["place_name"].toLowerCase()) == 0 || townName.toLowerCase().localeCompare(country["county"].toLowerCase()) == 0) {
                        notFound = false;
                        return country["country"];

                    }
                }
                if (notFound) {
                    return notFound;
                }
            }

        }

        //find countries of missing uni towns
        function countrySearchMissing(townName) {
            if (townName.toLowerCase() == null) {

            } else {
                var notFound = true;
                for (let country of countries2) {

                    if (townName.toLowerCase().localeCompare(country["Town"].toLowerCase()) == 0) {
                        notFound = false;
                        return country["Country"];

                    }
                }
                if (notFound) {
                    return notFound;
                }
            }

        }

        //calculate average score for each star rating per country
        function calculateCountryScore(ScoreMap) {
            for (let country of ScoreMap.keys()) {
                var result = ScoreMap.get(country);
                var i;
                for (i = 1; i < result.length; i++) {
                    result[i] = Math.round(result[i] / result[0]);

                }
                ScoreMap.set(country, result);
            }
            return ScoreMap;
        }

        countriesMap = calculateCountryScore(countriesMap);

       
        var count = 0;
        //var data = [];
        //putting the country data into an array 
        for (let country of countriesMap.keys()) {
            var countryResults = countriesMap.get(country);
            data[count] = { 'key': country, '1 star': countryResults[4], '2 star': countryResults[3], '3 star': countryResults[2], '4 star': countryResults[1] };
            count++;
        }

        
       
    }
    return data;
   
}