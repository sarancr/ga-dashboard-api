var express = require('express');
var router = express.Router();
var request = require('request');
const pubd_api_url = "https://api.jsonbin.io/b/5ab266d9c76676147eb6c817";
const aggr_api_url = "https://api.jsonbin.io/b/5ab2670bdaaaea147dca5474";
const mfgmix_api_url = "https://api.jsonbin.io/b/5ab26735c76676147eb6c81a";

function fetchPupdData(from, to) {
    return new Promise((resolve, reject) => {
        //request.get({ url: `https://hiring.testgaai.com/ask/floor/pupd?from=${from}&to=${to}` },
        request.get({ url: `${pubd_api_url}?from=${from}&to=${to}` },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).result);
            }else{
                reject(error);
            }
        });
    } )
}


function fetchAggrData(from, to) {
    return new Promise((resolve, reject) => {
        //request.get({ url: `https://hiring.testgaai.com/ask/floor/aggr?from=${from}&to=${to}` },
        request.get({ url: `${aggr_api_url}?from=${from}&to=${to}` },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).result);
            }else{
                reject(error);
            }
        });
    } )
}


function fetchMfgmixData(from, to) {
    return new Promise((resolve, reject) => {
        //request.get({ url: `https://hiring.testgaai.com/ask/floor/mfgmix?from=${from}&to=${to}` },
        request.get({ url: `${mfgmix_api_url}?from=${from}&to=${to}` },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body).result);
            }else{
                reject(error);
            }
        });
    } )
}

const fetchData  = async(req, res, next) => {
    const from = req.query.from;
    const to = req.query.to;
    const dashboardData = {};
    const pupd = await fetchPupdData(from, to);
    const aggr = await fetchAggrData(from, to);
    const mfgmix = await fetchMfgmixData(from, to);
    dashboardData.pupd = pupd;
    dashboardData.aggr = aggr;
    dashboardData.mfgmix = mfgmix;
    res.json(dashboardData);
}


/* GET home page. */
router.get('/', function (req, res, next) {
    fetchData(req, res, next);
});


module.exports = router;
