
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var authorization = "Basic " + btoa(username + ":" + password);


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */

var generirajPodatke = function(stPacienta, callback) {
    
    var ehrId = "";
    var sessionId = getSessionId(); 
    console.log(sessionId);
    if(stPacienta === 1){
        //Usvarimo pacienta
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
        $.ajax({
            url: baseUrl + "/ehr",
            type: 'POST',
            success: function (data) {
                //pridobimo ehr ID
                ehrId = data.ehrId;
                console.log(ehrId);
                // build party data
                var partyData = {
                    firstNames: "Prva",
                    lastNames: "Oseba",
                    dateOfBirth: "2000-3-15T23:00Z",
                    partyAdditionalInfo: [
                        {
                            key: "ehrId",
                            value: ehrId
                        },
                        {
                            key: "Type",
                            value: "Sporty"
                        },
                        {
                            key: "Country",
                            value: "SLO"
                        }
                    ]
                };
                $.ajax({
                    url: baseUrl + "/demographics/party",
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(partyData),
                    success: function (party) {
                        if (party.action == 'CREATE') {
                            
                            //adding composition 
                            var datumInUra = "2010-4-25T13:00Z";
                            var telesnaVisina = 150;
                            var telesnaTeza = 50;
                            var telesnaTemperatura = 36.5;
                            var sistolicniKrvniTlak = 120;
                            var diastolicniKrvniTlak = 80;
                            var nasicenostKrviSKisikom = 90;
                            var merilec = "Zan Valter Kamen";
                    		$.ajaxSetup({
                    		    headers: {"Ehr-Session": sessionId}
                    		});
                    		//creating composition
                    		var compositionData = {
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": datumInUra,
                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                    		};
                    		//creating query
                    		var queryParams = {
                                "ehrId": ehrId,
                                templateId: 'Vital Signs',
                                format: 'FLAT',
                                committer: merilec
                            };
                            $.ajax({
                                url: baseUrl + "/composition?" + $.param(queryParams),
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(compositionData),
                                success: function (res) {
                                    //adding composition 2
                                    var datumInUra = "2012-6-05T15:00Z";
                                    var telesnaVisina = 160;
                                    var telesnaTeza = 60;
                                    var telesnaTemperatura = 36.9;
                                    var sistolicniKrvniTlak = 123;
                                    var diastolicniKrvniTlak = 82;
                                    var nasicenostKrviSKisikom = 95;
                                    var merilec = "Zan Valter Kamen";
                            		$.ajaxSetup({
                            		    headers: {"Ehr-Session": sessionId}
                            		});
                            		//creating composition 2
                            		var compositionData = {
                            		    "ctx/language": "en",
                            		    "ctx/territory": "SI",
                            		    "ctx/time": datumInUra,
                            		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                            		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                            		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                            		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                            		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                            		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                            		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                            		};
                            		//creating query
                            		var queryParams = {
                                        "ehrId": ehrId,
                                        templateId: 'Vital Signs',
                                        format: 'FLAT',
                                        committer: merilec
                                    };
                                    $.ajax({
                                        url: baseUrl + "/composition?" + $.param(queryParams),
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(compositionData),
                                        success: function (res) {
                                            console.log("Composition succesfull");

                                            //adding composition 3
                                            var datumInUra = "2014-4-25T12:00Z";
                                            var telesnaVisina = 173;
                                            var telesnaTeza = 70;
                                            var telesnaTemperatura = 37.1;
                                            var sistolicniKrvniTlak = 126;
                                            var diastolicniKrvniTlak = 86;
                                            var nasicenostKrviSKisikom = 100;
                                            var merilec = "Zan Valter Kamen";
                                    		$.ajaxSetup({
                                    		    headers: {"Ehr-Session": sessionId}
                                    		});
                                    		//creating composition 3
                                    		var compositionData = {
                                    		    "ctx/language": "en",
                                    		    "ctx/territory": "SI",
                                    		    "ctx/time": datumInUra,
                                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                                    		};
                                    		//creating query
                                    		var queryParams = {
                                                "ehrId": ehrId,
                                                templateId: 'Vital Signs',
                                                format: 'FLAT',
                                                committer: merilec
                                            };
                                            $.ajax({
                                                url: baseUrl + "/composition?" + $.param(queryParams),
                                                type: 'POST',
                                                contentType: 'application/json',
                                                data: JSON.stringify(compositionData),
                                                success: function (res) {
                                                    callback(ehrId);
                                                    console.log("Composition succesfull");
                                                },
                                                error: function(err) {
                                                    console.log("Composition error");
                                                }
                                            });
                                        },
                                        error: function(err) {
                                            console.log("Composition error");
                                        }
                                    });
                                    console.log("Composition succesfull");
                                },
                                error: function(err) {
                                    console.log("Composition error");
                                }
                            });
                            console.log("Uspesno kreiran EHR"+ehrId);
                        }
                    },
                    error: function(err){
                       console.log("Prislo je do napake"+JSON.parse(err.responseText).userMessage);
                    }
                });
            }
        });
    }
    else if(stPacienta === 2){
        //Usvarimo pacienta
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
        $.ajax({
            url: baseUrl + "/ehr",
            type: 'POST',
            success: function (data) {
                //pridobimo ehr ID
                ehrId = data.ehrId;
        
                // build party data
                var partyData = {
                    firstNames: "Druga",
                    lastNames: "Oseba",
                    dateOfBirth: "1966-2-6T21:00Z",
                    partyAdditionalInfo: [
                        {
                            key: "ehrId",
                            value: ehrId
                        },
                        {
                            key: "Type",
                            value: "Family"
                        },
                        {
                            key:"Country",
                            value:"EN"
                        }
                    ]
                };
                $.ajax({
                    url: baseUrl + "/demographics/party",
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(partyData),
                    success: function (party) {
                        if (party.action == 'CREATE') {
                            //adding composition 
                            var datumInUra = "2010-4-25T13:00Z";
                            var telesnaVisina = 167;
                            var telesnaTeza = 75;
                            var telesnaTemperatura = 37.5;
                            var sistolicniKrvniTlak = 139;
                            var diastolicniKrvniTlak = 89;
                            var nasicenostKrviSKisikom = 70;
                            var merilec = "Tadej Pecenko";
                    		$.ajaxSetup({
                    		    headers: {"Ehr-Session": sessionId}
                    		});
                    		//creating composition
                    		var compositionData = {
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": datumInUra,
                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                    		};
                    		//creating query
                    		var queryParams = {
                                "ehrId": ehrId,
                                templateId: 'Vital Signs',
                                format: 'FLAT',
                                committer: merilec
                            };
                            $.ajax({
                                url: baseUrl + "/composition?" + $.param(queryParams),
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(compositionData),
                                success: function (res) {
                                    //adding composition 2
                                    var datumInUra = "2014-6-05T15:00Z";
                                    var telesnaVisina = 166;
                                    var telesnaTeza = 74;
                                    var telesnaTemperatura = 36.0;
                                    var sistolicniKrvniTlak = 142;
                                    var diastolicniKrvniTlak = 92;
                                    var nasicenostKrviSKisikom = 75;
                                    var merilec = "Tadej Pecenko";
                            		$.ajaxSetup({
                            		    headers: {"Ehr-Session": sessionId}
                            		});
                            		//creating composition 2
                            		var compositionData = {
                            		    "ctx/language": "en",
                            		    "ctx/territory": "SI",
                            		    "ctx/time": datumInUra,
                            		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                            		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                            		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                            		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                            		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                            		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                            		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                            		};
                            		//creating query
                            		var queryParams = {
                                        "ehrId": ehrId,
                                        templateId: 'Vital Signs',
                                        format: 'FLAT',
                                        committer: merilec
                                    };
                                    $.ajax({
                                        url: baseUrl + "/composition?" + $.param(queryParams),
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(compositionData),
                                        success: function (res) {
                                            //adding composition 3
                                            var datumInUra = "2015-11-11T12:00Z";
                                            var telesnaVisina = 176;
                                            var telesnaTeza = 76;
                                            var telesnaTemperatura = 36.9;
                                            var sistolicniKrvniTlak = 140;
                                            var diastolicniKrvniTlak = 90;
                                            var nasicenostKrviSKisikom = 90;
                                            var merilec = "Tadej Pecenko";
                                    		$.ajaxSetup({
                                    		    headers: {"Ehr-Session": sessionId}
                                    		});
                                    		//creating composition 3
                                    		var compositionData = {
                                    		    "ctx/language": "en",
                                    		    "ctx/territory": "SI",
                                    		    "ctx/time": datumInUra,
                                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                                    		};
                                    		//creating query
                                    		var queryParams = {
                                                "ehrId": ehrId,
                                                templateId: 'Vital Signs',
                                                format: 'FLAT',
                                                committer: merilec
                                            };
                                            $.ajax({
                                                url: baseUrl + "/composition?" + $.param(queryParams),
                                                type: 'POST',
                                                contentType: 'application/json',
                                                data: JSON.stringify(compositionData),
                                                success: function (res) {
                                                    callback(ehrId);
                                                    console.log("Composition succesfull");
                                                },
                                                error: function(err) {
                                                    console.log("Composition error");
                                                }
                                            });  
                                            console.log("Composition succesfull");
                                        },
                                        error: function(err) {
                                            console.log("Composition error");
                                        }
                                    });
                                    console.log("Composition succesfull");
                                },
                                error: function(err) {
                                    console.log("Composition error");
                                }
                            });
                            console.log("Uspesno kreiran EHR"+ehrId);
                        }
                    },
                    error: function(err){
                       console.log("Prislo je do napake"+JSON.parse(err.responseText).userMessage);
                    }
                });
            }
        });
    }
    else if(stPacienta === 3){
        //Usvarimo pacienta
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
        $.ajax({
            url: baseUrl + "/ehr",
            type: 'POST',
            success: function (data) {
                //pridobimo ehr ID
                ehrId = data.ehrId;
        
                // build party data
                var partyData = {
                    firstNames: "Tretja",
                    lastNames: "Oseba",
                    dateOfBirth: "1942-6-12T17:00Z",
                    partyAdditionalInfo: [
                        {
                            key: "ehrId",
                            value: ehrId
                        },
                        {
                            key: "Type",
                            value: "Old"
                        },
                        {
                            key:"Country",
                            value:"ITA"
                        }
                    ]
                };
                $.ajax({
                    url: baseUrl + "/demographics/party",
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(partyData),
                    success: function (party) {
                        if (party.action == 'CREATE') {
                            //adding composition 
                            var datumInUra = "2009-4-25T13:00Z";
                            var telesnaVisina = 160;
                            var telesnaTeza = 63;
                            var telesnaTemperatura = 36.0;
                            var sistolicniKrvniTlak = 100;
                            var diastolicniKrvniTlak = 60;
                            var nasicenostKrviSKisikom = 90;
                            var merilec = "Vilman Life";
                    		$.ajaxSetup({
                    		    headers: {"Ehr-Session": sessionId}
                    		});
                    		//creating composition
                    		var compositionData = {
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": datumInUra,
                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                    		};
                    		//creating query
                    		var queryParams = {
                                "ehrId": ehrId,
                                templateId: 'Vital Signs',
                                format: 'FLAT',
                                committer: merilec
                            };
                            $.ajax({
                                url: baseUrl + "/composition?" + $.param(queryParams),
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(compositionData),
                                success: function (res) {
                                    //adding composition 2
                                    var datumInUra = "2011-8-22T10:00Z";
                                    var telesnaVisina = 160;
                                    var telesnaTeza = 65;
                                    var telesnaTemperatura = 36.6;
                                    var sistolicniKrvniTlak = 98;
                                    var diastolicniKrvniTlak = 59;
                                    var nasicenostKrviSKisikom = 80;
                                    var merilec = "Vilman Life";
                            		$.ajaxSetup({
                            		    headers: {"Ehr-Session": sessionId}
                            		});
                            		//creating composition 2
                            		var compositionData = {
                            		    "ctx/language": "en",
                            		    "ctx/territory": "SI",
                            		    "ctx/time": datumInUra,
                            		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                            		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                            		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                            		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                            		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                            		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                            		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                            		};
                            		//creating query
                            		var queryParams = {
                                        "ehrId": ehrId,
                                        templateId: 'Vital Signs',
                                        format: 'FLAT',
                                        committer: merilec
                                    };
                                    $.ajax({
                                        url: baseUrl + "/composition?" + $.param(queryParams),
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(compositionData),
                                        success: function (res) {
                                            //adding composition 3
                                            var datumInUra = "2016-1-01T12:00Z";
                                            var telesnaVisina = 159;
                                            var telesnaTeza = 63;
                                            var telesnaTemperatura = 36.9;
                                            var sistolicniKrvniTlak = 95;
                                            var diastolicniKrvniTlak = 55;
                                            var nasicenostKrviSKisikom = 85;
                                            var merilec = "Vilman Life";
                                    		$.ajaxSetup({
                                    		    headers: {"Ehr-Session": sessionId}
                                    		});
                                    		//creating composition 3
                                    		var compositionData = {
                                    		    "ctx/language": "en",
                                    		    "ctx/territory": "SI",
                                    		    "ctx/time": datumInUra,
                                    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
                                    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
                                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
                                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                                    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
                                    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
                                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
                                    		};
                                    		//creating query
                                    		var queryParams = {
                                                "ehrId": ehrId,
                                                templateId: 'Vital Signs',
                                                format: 'FLAT',
                                                committer: merilec
                                            };
                                            $.ajax({
                                                url: baseUrl + "/composition?" + $.param(queryParams),
                                                type: 'POST',
                                                contentType: 'application/json',
                                                data: JSON.stringify(compositionData),
                                                success: function (res) {
                                                    callback(ehrId);
                                                    console.log("Composition succesfull");
                                                },
                                                error: function(err) {
                                                    console.log("Composition error");
                                                }
                                            });  
                                            console.log("Composition succesfull");
                                        },
                                        error: function(err) {
                                            console.log("Composition error");
                                        }
                                    });
                                    console.log("Composition succesfull");
                                },
                                error: function(err) {
                                    console.log("Composition error");
                                }
                            });
                            console.log("Uspesno kreiran EHR"+ehrId);
                        }
                    },
                    error: function(err){
                       console.log("Prislo je do napake"+JSON.parse(err.responseText).userMessage);
                    }
                });
            }
        });
    }
};

$(document).ready(function() {
    $( "#generiraj" ).click(function(event) {
        event.preventDefault();
        $(".oseba").remove();
        var chosen = 0;
        generirajPodatke(1,function(ehrId1){
            pridobiImePriimek(ehrId1, function(ime, priimek){
                $("#seznamUporabnikov").append("<li class=\"oseba\"><a id=\"prvi\" href = \"#\">"+ime+" "+ priimek +"</a></li>");
            });
            generirajPodatke(2,function(ehrId2){
                pridobiImePriimek(ehrId2, function(ime, priimek){
                    $("#seznamUporabnikov").append("<li class=\"oseba\"><a id=\"drugi\" href = \"#\">"+ime+" "+ priimek +"</a></li>");
                });
                generirajPodatke(3,function(ehrId3){
                    pridobiImePriimek(ehrId3, function(ime, priimek){
                        $("#seznamUporabnikov").append("<li class=\"oseba\"><a id=\"tretji\" href = \"#\">"+ime+" "+ priimek +"</a></li>");
                        $( "#prvi" ).click(function(event) {
                            event.preventDefault();
                            prikaziSpletno(ehrId1);
                            console.log("1. oseba");
                        });
                        $( "#drugi" ).click(function(event) {
                            event.preventDefault();
                            prikaziSpletno(ehrId2);
                            console.log("2. oseba");
                        });
                        $( "#tretji" ).click(function(event) {
                            event.preventDefault();
                            prikaziSpletno(ehrId3);
                            console.log("3. oseba");
                        });
                    });
                });
                        
            });
        });

    });
});

var prikaziSpletno = function(ehrId){
    $(".datumComp").remove();
    var podatkiVisine = "";
    var podatkiTeze = "";
    var podatkiKrvi = "";
    var podatkiKisika = "";
    $("#ehrid").text(ehrId);
    pridobiImePriimekDatum(ehrId, function(ime, priimek, datum){
        console.log("prirejam ime");
        $("#ime").text(ime);
        $("#priimek").text(priimek);
        console.log(datum);
        $("#datum").text(datum);
    });
    pridobiVitalnePodatke(ehrId,function(res1,res2,res3,res4,res5){
        //default vrednosti zadnje
        $("#ehrid2").text(ehrId);
        $("#datuminura").text(res1[0].time);
        $("#telesnaVisina").text(res1[0].height+" "+res1[0].unit);
        $("#telesnaTeza").text(res2[0].weight+" "+res2[0].unit);
        $("#telesnaTemperatura").text(res5[0].temperature+" "+res5[0].unit);
        $("#sistolicniKrvniTlak").text(res4[0].systolic+" "+res4[0].unit);
        $("#diastolicniKrvniTlak").text(res4[0].diastolic+" "+res4[0].unit);
        $("#nasicenostKrviSKisikom").text(res3[0].spO2);
        podatkiVisine = res1;
        podatkiTeze = res2;
        podatkiKisika = res3;
        podatkiKrvi = res4;
        podatkiTemp = res5;
        $("#seznamDatumov").append("<li class=\"datumComp\"><a id=\"prviDatum\" href = \"#\">"+res1[0].time+"</a></li>");
        $( "#prviDatum" ).click(function(event) {
            event.preventDefault();
            console.log("kliknu sin  1 datum");
            $("#ehrid2").text(ehrId);
            $("#datuminura").text(res1[0].time);
            $("#telesnaVisina").text(res1[0].height+" "+res1[0].unit);
            $("#telesnaTeza").text(res2[0].weight+" "+res2[0].unit);
            $("#telesnaTemperatura").text(res5[0].temperature+" "+res5[0].unit);
            $("#sistolicniKrvniTlak").text(res4[0].systolic+" "+res4[0].unit);
            $("#diastolicniKrvniTlak").text(res4[0].diastolic+" "+res4[0].unit);
            $("#nasicenostKrviSKisikom").text(res3[0].spO2);
        });
        $("#seznamDatumov").append("<li class=\"datumComp\"><a id=\"drugiDatum\" href = \"#\">"+res1[1].time+"</a></li>");
            $( "#drugiDatum" ).click(function(event) {
                event.preventDefault();
                $("#ehrid2").text(ehrId);
                $("#datuminura").text(res1[1].time);
                $("#telesnaVisina").text(res1[1].height+" "+res1[1].unit);
                $("#telesnaTeza").text(res2[1].weight+" "+res2[1].unit);
                $("#telesnaTemperatura").text(res5[1].temperature+" "+res5[1].unit);
                $("#sistolicniKrvniTlak").text(res4[1].systolic+" "+res4[1].unit);
                $("#diastolicniKrvniTlak").text(res4[1].diastolic+" "+res4[1].unit);
                $("#nasicenostKrviSKisikom").text(res3[1].spO2);
                console.log("kliknu sin  2 datum");
            });
        $("#seznamDatumov").append("<li class=\"datumComp\"><a id=\"tretjiDatum\" href = \"#\">"+res1[2].time+"</a></li>");
        $( "#tretjiDatum" ).click(function(event) {
            event.preventDefault();
            event.preventDefault();
            $("#ehrid2").text(ehrId);
            $("#datuminura").text(res1[2].time);
            $("#telesnaVisina").text(res1[2].height+" "+res1[2].unit);
            $("#telesnaTeza").text(res2[2].weight+" "+res2[2].unit);
            $("#telesnaTemperatura").text(res5[2].temperature+" "+res5[2].unit);
            $("#sistolicniKrvniTlak").text(res4[2].systolic+" "+res4[2].unit);
            $("#diastolicniKrvniTlak").text(res4[2].diastolic+" "+res4[2].unit);
            $("#nasicenostKrviSKisikom").text(res3[2].spO2);
            console.log("kliknu sin  3 datum");
        });
        console.log(res1);
        console.log(res2);
        console.log(res3);
        console.log(res4);
        console.log(res5);
    });
};

var pridobiImePriimekDatum = function(ehrId, callback){
    $.ajax({
        url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
        type: 'GET',
        success: function (data) {
            var party = data.party;
            callback(party.firstNames, party.lastNames, party.dateOfBirth);
        }
    });
};

var pridobiVitalnePodatke = function(ehrId, callback){

    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/height",
        type: 'GET',
        success: function (res1) {
    		//console.log(res1);
            //pridobi podatke teze
            $.ajax({
                url: baseUrl + "/view/" + ehrId + "/weight",
                type: 'GET',
                success: function (res2) {
            		//console.log(res2);
                    $.ajax({
                        url: baseUrl + "/view/" + ehrId + "/spO2",
                        type: 'GET',
                        success: function (res3) {
                    	//	console.log(res3);
                            $.ajax({
                                url: baseUrl + "/view/" + ehrId + "/blood_pressure",
                                type: 'GET',
                                success: function (res4) {
                            	//	console.log(res4);
                                    $.ajax({
                                        url: baseUrl + "/view/" + ehrId + "/body_temperature",
                                        type: 'GET',
                                        success: function (res5) {
                                            callback(res1,res2,res3,res4,res5);
                                        }
                                    });
                            		
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

var pridobiImePriimek = function(ehrId, callback){
    $.ajax({
        url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
        type: 'GET',
        success: function (data) {
            var party = data.party;
            callback(party.firstNames, party.lastNames);
        }
    });
};

// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
