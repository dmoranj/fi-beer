var history = {
    "minutes": "1",
    "data": [
        [
            "2014-01-23T10:17:51.674643",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:18:01.671633",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:18:15.625770",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:18:21.572811",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:18:31.653626",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:18:41.610729",
            "CubaDani",
            "temperature3",
            "62.500019200000004"
        ],
        [
            "2014-01-23T10:17:52.314273",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:02.276369",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:16.246328",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:22.130775",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:32.342934",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:42.195349",
            "CubaDani",
            "temperature5",
            "19.531256"
        ],
        [
            "2014-01-23T10:17:51.054497",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:01.043178",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:15.047605",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:21.026454",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:31.038436",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:41.048417",
            "CubaDani",
            "temperature1",
            "20.0195374"
        ],
        [
            "2014-01-23T10:17:50.727271",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:00.728230",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:10.729438",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:20.730363",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:30.731712",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:40.732747",
            "CubaDani",
            "temperature0",
            "20.0195374"
        ],
        [
            "2014-01-23T10:17:51.338206",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:01.366626",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:15.344453",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:21.308449",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:31.337086",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:18:41.331559",
            "CubaDani",
            "temperature2",
            "20.0195374"
        ],
        [
            "2014-01-23T10:17:51.979471",
            "CubaDani",
            "temperature4",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:01.969206",
            "CubaDani",
            "temperature4",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:15.925771",
            "CubaDani",
            "temperature4",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:21.849962",
            "CubaDani",
            "temperature4",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:31.977072",
            "CubaDani",
            "temperature4",
            "19.531256"
        ],
        [
            "2014-01-23T10:18:41.891991",
            "CubaDani",
            "temperature4",
            "19.531256"
        ]
    ]
};

var data = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [65,59,90,81,56,55,40]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [28,48,40,19,96,27,100]
        }
    ]
};

var options = {
    animation: false
};

function calculateData(historicData) {
    function notRepeated(previousValue, currentValue) {
        if (previousValue.indexOf(currentValue) < 0) {
            previousValue.push(currentValue);
        }

        return previousValue;
    }

    function getRecord(number, item) {
        return item[number];
    }

    function cropMiliseconds(value) {
        return value.substring(11, 19);
    }

    function getWithNameAndDate(name, date, currentValue) {
        return (cropMiliseconds(currentValue[0]) == date) && (currentValue[2] == name);
    }

    function valuesForSeries(name, previousValue, currentValue) {
        var valueForCurrentDate = historicData.filter(getWithNameAndDate.bind(null, name, currentValue));

        if (valueForCurrentDate.length > 0) {
            previousValue.push(Number(valueForCurrentDate[0][3]).toFixed(1));
        } else if (previousValue.length > 0) {
            previousValue.push(previousValue[previousValue.length-1]);
        } else {
            previousValue.push(0);
        }

        return previousValue;
    }

    var series = historicData.map(getRecord.bind(null, 2)).reduce(notRepeated, []),
        times = historicData.map(getRecord.bind(null, 0)).map(cropMiliseconds).reduce(notRepeated, []).sort();

    var data = {
        labels: times,
        datasets: []
    };

    for (var id in series) {
        data.datasets.push({
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data: times.reduce(valuesForSeries.bind(null, series[id]), [])
        });
    }

    return data;
}

function updateCharts() {
    document.getElementById("fi-beer-graph").width = document.getElementById("fi-beer-history").clientWidth * 0.9;
    document.getElementById("fi-beer-graph").height = document.getElementById("fi-beer-history").clientHeight * 0.9;

    var ctx = document.getElementById("fi-beer-graph").getContext("2d");
    var historyChart = new Chart(ctx).Line(calculateData(history.data),options);
}

function updateData() {
    updateCharts();
}

function init() {
    updateData();
    setInterval(updateData,  5000);

}