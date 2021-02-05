const request = require("request-promise");
const cheerio = require("cheerio");
const { json, errorJson } = require("../utils/response");

exports.index = (req, res) => {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

    return json(res, {
        maintainer: "Azhari Muhammad M <azhari.marzan@gmail.com>",
        source: "https://github.com/azharimm/jadwal-shalat-api",
    });
};

exports.cities = async (req, res) => {
    try {
        const htmlResult = await request.get(`${process.env.BASE_URL}`);
        const $ = await cheerio.load(htmlResult);
        const cityList = [];
        $(".inputcity")
            .children("option")
            .each((_, el) => {
                const cityId = $(el).val();
                const cityName = $(el).text();
                cityList.push({ cityId, cityName });
            });
        return json(res, cityList);
    } catch (error) {
        return errorJson(res, error);
    }
};
