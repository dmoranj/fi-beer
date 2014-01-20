"use strict";

var request = require("request");

function query(req, res, next) {
    var options = {
        url: "http://130.206.82.80:1026/NGSI10/queryContext",
        method: "POST",
        json: req.body
    };

    request(options, function (error, response, body) {
        if (error) {
            res.json(500, {
                errorMessage: error
            });
        } else {
            res.json(200, body);
        }
    });
}

exports.query = query;