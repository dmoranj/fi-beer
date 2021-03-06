var max,
    min;

function updateRepresentation() {
    var width = document.getElementById("fi-beer-desktop").clientWidth - document.getElementById("fi-beer-values").clientWidth -20,
        height = document.getElementById("fi-beer-desktop").clientHeight - document.getElementById("fi-beer-controls").clientHeight - 20,
        radius = (height < width)?(height/2)*0.9:(width/2)*0.9,
        circleX = width/2,
        circleY = height/2;

    document.getElementById("fi-beer-graph").width = width;
    document.getElementById("fi-beer-graph").height = height;

    var c=document.getElementById("fi-beer-graph");
    var ctx=c.getContext("2d");

    ctx.save();
    ctx.beginPath();
    ctx.arc(circleX,circleY,radius,0,2*Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.lineWidth=5;
    ctx.fill();
    ctx.stroke();
    ctx.clip();

    var circles = [
        {
            id: 0,
            x: circleX,
            y: circleY - radius,
            color: 'rgba(255,0,0, 1)'
        },
        {
            id: 1,
            x: circleX + radius,
            y: circleY,
            color: 'rgba(255,0,0, 1)'
        },
        {
            id: 2,
            x: circleX,
            y: circleY + radius,
            color: 'rgba(0,255,0, 1)'
        },
        {
            id: 3,
            x: circleX - radius,
            y: circleY,
            color: 'rgba(255,180,180, 1)'
        },
        {
            id: 3,
            x: circleX,
            y: circleY,
            color: 'rgba(180,255,180, 1)'
        }
    ];

    for (var c in circles) {
        var grd=ctx.createRadialGradient(circles[c].x,circles[c].y,0,circles[c].x,circles[c].y, radius);
        grd.addColorStop(0, calculateColor(circles[c].id, max, min));
        grd.addColorStop(1,'rgba(255,255,255, 0)');
        ctx.fillStyle=grd;

        ctx.beginPath();
        ctx.arc(circles[c].x, circles[c].y,radius,0,2*Math.PI);
        ctx.fill();
    }

    ctx.restore();
}

function writeSensor(id, value) {
    document.getElementById(id).textContent = value;
}

function handleSensorResults(result) {
    var attributes = result.contextResponses[0].contextElement.attributes;

    for (var i=0; i < attributes.length; i++) {
        writeSensor(attributes[i].name, Number(attributes[i].contextValue).toFixed(1));
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

function updateSensorData() {
    var contentTypeRequest = $.ajax('/queryContext', {
        data: '{\
            "entities": [\
                {\
                    "type": "Cuba",\
                    "isPattern": "false",\
                    "id": "CubaDani"\
                }\
            ]\
        }',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
    });

    max = Number(document.getElementById("max-temperature").value);
    min = Number(document.getElementById("min-temperature").value);
    contentTypeRequest.done(handleSensorResults);
    contentTypeRequest.fail(handleFailure);
}

function init() {
    updateRepresentation();
    updateSensorData();
}


