var BeerManager = (function() {

    function calculateColor(id) {
        if (document.getElementById("temperature" + id).textContent == "n/a") {
            return "rgba(0,0,255,1)";
        } else {
            var value = Number(document.getElementById("temperature" + id).textContent).toFixed(1),
                max = Number(document.getElementById("max-temperature").value),
                min = Number(document.getElementById("min-temperature").value),
                avg = (max + min)/2,
                interval = max - min,
                difference = Math.abs(value - avg);

            if (difference < interval /4) {
                var grayLevel = Math.round((difference / (interval/4)) * 255);

                return "rgba(" + grayLevel + ", 255, " + grayLevel + ",1)";

            } else {
                var grayLevel = Math.round(((difference - (interval/4))/ (interval/4)) * 255);

                if (grayLevel > 255) {
                    grayLevel = 0;
                } else{
                    grayLevel = 255 - grayLevel;
                }

                return "rgba(255, " + grayLevel + "," + grayLevel + ",1)";
            }
        }
    }

    function updateRepresentation() {
        var c=document.getElementById("fi-beer-graph");
        var ctx=c.getContext("2d");

        ctx.save();
        ctx.beginPath();
        ctx.arc(120,100,80,0,2*Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.lineWidth=5;
        ctx.fill();
        ctx.stroke();
        ctx.clip();

        var circles = [
            {
                id: 0,
                x: 120,
                y: 20,
                color: 'rgba(255,0,0, 1)'
            },
            {
                id: 1,
                x: 40,
                y: 100,
                color: 'rgba(255,0,0, 1)'
            },
            {
                id: 2,
                x: 120,
                y: 180,
                color: 'rgba(0,255,0, 1)'
            },
            {
                id: 3,
                x: 200,
                y: 100,
                color: 'rgba(255,180,180, 1)'
            },
            {
                id: 3,
                x: 120,
                y: 100,
                color: 'rgba(180,255,180, 1)'
            }
        ];

        for (var c in circles) {
            var grd=ctx.createRadialGradient(circles[c].x,circles[c].y,0,circles[c].x,circles[c].y, 80);
            grd.addColorStop(0, calculateColor(circles[c].id));
            grd.addColorStop(1,'rgba(255,255,255, 0)');
            ctx.fillStyle=grd;

            ctx.beginPath();
            ctx.arc(circles[c].x, circles[c].y,80,0,2*Math.PI);
            ctx.fill();
        }

        ctx.restore();
    }

    function writeSensor(id, value) {
        document.getElementById(id).textContent = value;
    }

    function handleSensorResults(result) {
        var attributes = result.CubaDani.attributes;

        for (var i=0; i < Object.keys(attributes).length; i++) {
            var context = attributes[Object.keys(attributes)[i]];
            writeSensor(Object.keys(attributes)[i], Number(context.contextValue).toFixed(1));
        }

        updateRepresentation();
        setTimeout(updateSensorData, 2000);
    }

    function handleFailure(jqXHR, textStatus) {
        console.log( "DEBUG :  Ajax request failed... (" + textStatus + ' - ' + jqXHR.responseText + ")." );
    }

    function getStatus(jqXHR, textStatus) {
        console.log( "DEBUG :  Ajax request status... (" + textStatus + ' - ' + jqXHR.responseText + ")." );
    }

    function createConnection() {
        return new NGSI.Connection(MashupPlatform.prefs.get('ngsi_server'));
    };

    function updateSensorData() {
        var connection = createConnection(),
            options = {
                onSuccess: handleSensorResults,
                onFailure: handleFailure
            },
            entities = [{
                "type": "Cuba",
                "isPattern": "false",
                "id": "CubaDani"
            }];

        connection.query(entities, ["temperature0", "temperature1", "temperature2", "temperature3", "temperature4", "temperature5"], options);
    }

    function init() {
        updateRepresentation();
        updateSensorData();
    }

    return {
        init: init
    }
})();
