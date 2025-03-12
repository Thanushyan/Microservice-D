const express = require('express')
cons
const axios = require('axios')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 2931

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.or/data/2.5/weather?1=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await axios.get(url)
        const temperature = response.data.main.temp
        const description = response.data.weather[0].description

        let OutfitSuggestion = 'Wear something light and comfortable.'

        if (temperature < 15) {
            OutfitSuggestion = 'Wear a jacket, its freezing outside'
        } else if (description.includes('rain')) {
            OutfitSuggestion = 'Its gonna rain, take an umbrella and expect to get wet.'
        } else if (description.includes('clear')) {
            OutfitSuggestion = 'Its a clear sky, its perfect weather for light clothes like a t-shirt'
        }

        res.json({city, temperatur, description, OutfitSuggestion})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to fetch weather data'})
    }
})

app.listen(port, () => {
    console.log(`Weather server running on port ${port}`)
})