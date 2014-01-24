function calculateColor(id, max, min) {
    if (document.getElementById("temperature" + id).textContent == "n/a") {
        return "rgba(0,0,255,1)";
    } else {
        var value = Number(document.getElementById("temperature" + id).textContent).toFixed(1),
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