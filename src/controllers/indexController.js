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

exports.daily = async (req, res) => {
    try {
        const d = req.query.date;
        let id = req.query.cityId;
        let baseUrl = `${process.env.BASE_URL}`;
        let day,
            date,
            region,
            data = [];
        if (!id) id = 83;
        if (d) {
            let m = d.split("-")[1];
            let y = d.split("-")[0];
            day = d.split("-")[2];
            let nth = parseInt(day) + 4;
            baseUrl = `${process.env.BASE_URL}/monthly.php?id=${id}&m=${m}&y=${y}`;
            console.log(baseUrl);
            const htmlResult = await request.get(baseUrl);
            const $ = await cheerio.load(htmlResult);
            date = $(".table_title").children("td").eq(2).children("b").text();
            region = $(".table_title")
                .children("td")
                .eq(2)
                .children("small")
                .text();
            $(".table_adzan")
                .find("tr")
                .eq(nth)
                .children("td")
                .each((index, el) => {
                    if (index > 0) {
                        let name;
                        let time = $(el).text();
                        if (index === 1) {
                            name = "Shubuh";
                        } else if (index === 2) {
                            name = "Dzuhur";
                        } else if (index === 3) {
                            name = "Ashr";
                        } else if (index === 4) {
                            name = "Maghrib";
                        } else if (index === 5) {
                            name = "Isya";
                        }
                        data.push({ name, time });
                    }
                });
        } else {
            const htmlResult = await request.get(baseUrl);
            const $ = await cheerio.load(htmlResult);
            date = $(".table_title").children("td").eq(2).children("b").text();
            region = $(".table_title")
                .children("td")
                .eq(2)
                .children("small")
                .text();
            $(".table_highlight")
                .children("td")
                .each((index, el) => {
                    if (index === 0) {
                        day = $(el).text();
                    }
                    if (index > 0) {
                        let name;
                        let time = $(el).text();
                        if (index === 1) {
                            name = "Shubuh";
                        } else if (index === 2) {
                            name = "Dzuhur";
                        } else if (index === 3) {
                            name = "Ashr";
                        } else if (index === 4) {
                            name = "Maghrib";
                        } else if (index === 5) {
                            name = "Isya";
                        }
                        data.push({ name, time });
                    }
                });
        }
        date = day + " " + date;
        return json(res, { date, region, data });
    } catch (error) {
        return errorJson(res, error);
    }
};
