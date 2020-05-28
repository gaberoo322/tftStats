exports.handler = async (event, context, callback) => {
  const summonerName = event.queryStringParameters.name || "magioflife"
  const url = `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}`
  const pass = body => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) })
  }
  try {
    let response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        "X-Riot-Token": `${process.env.RIOT_API}`,
        "Content-Type": "application/json",
      },
      body: event.body,
    })
    let data = await response.json()
    await pass(data)
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    }
    await pass(error)
  }
}
