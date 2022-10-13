async function getDiscordUser(access_token) {
    return await Axios({
        url: `https://discord.com/api/users/@me`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((res_dis) => {
        return res_dis.data;
    }).catch((err) => {
        return err;
    });
}

async function refreshDiscordToken(refresh_token) {
    return await Axios({
        url: `https://discord.com/api/oauth2/token`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`
    }).then((res_dis) => {
        return res_dis.data;
    }).catch((err) => {
        return err;
    });
}

module.exports = { getDiscordUser, refreshDiscordToken }