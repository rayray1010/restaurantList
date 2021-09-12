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
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === restaurantId
  })
  res.render('show', { restaurant })
})

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLocaleLowerCase()
  const containKeywordList = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.trim().toLocaleLowerCase().includes(keyword) ||
      restaurant.category.trim().toLocaleLowerCase().includes(keyword)
    )
  })
  res.render('index', { restaurants: containKeywordList, keyword })
})
// listen sever
app.listen(port, () => {
  console.log('本機伺服器啟動，路由為：http://localhost:3000')
})
