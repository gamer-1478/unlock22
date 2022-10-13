const Axios = require("axios");

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function ReportWebVital(content) {
    Axios({
        url: process.env.DISCORD_WEBHOOKS_WEB_VITALS,
        method: 'POST',
        data: { content }
    }).catch((err) => {
        console.log(err);
    });
}

async function ReportCrash(content) {
    Axios({
        url: process.env.DISCORD_WEBHOOKS_CRASH_REPORT,
        method: 'POST',
        data: { content }
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = { ReportWebVital, ReportCrash, validateEmail }
