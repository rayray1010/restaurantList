//creat variables
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// activate handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  })
)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// render index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//show each page detail
app.get('/restaurants/:restaurant', (req, res) => {
  const restaurantId = req.params.restaurant
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === restaurantId
  })
  res.render('show', { restaurant })
})

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const containKeywordList = restaurantList.results.filter((restaurant) => {
    return restaurant.name
      .trim()
      .toLocaleLowerCase()
      .includes(keyword.trim().toLocaleLowerCase())
  })
  res.render('index', { restaurants: containKeywordList, keyword })
})
// listen sever
app.listen(port, () => {
  console.log('本機伺服器啟動，路由為：http://localhost:3000')
})
