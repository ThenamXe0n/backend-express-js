## file numbering
- file 1 (index.js)
  initialize dotenv
  server setup(intance of app using express)
  adding middleware app.use(express.json) ,app.use(express.urlencoded())
  listen server using (app.listen) 
- file 2 (config/mongoDbconnet.js)
  create mongodb connection using connect function from mongoose
  export the function 
- call mongodb connect function in index.js
- file 3 (model/quotes.model.js)
  create a model quotes for database using Schema and model from mongoose
  export the created schema using model("model name",schema you have created)
- file 4 (controller/quotes.controller.js)
  write your controller functions here (for creating quotes and fetching data from model)
  1. import you quote model in controller file which you have created in file 3
  2. create controller for creatingquotes use Quotemodelname.create(req.body) to create data in database when controller run
  3. export the function from this file using export or module.exports = {controllerfunction name } if using common js(require wala code agr use kr rhe ho toh)
- file 5 (routers/main.routes.js)
  1. create a router using const router =  express.Router()
  2. navigate router to another router i.e quotes router using router.use("/quote",QuoteRouter) - QuoteRouter hum file 6 k andr banaege
  3. export router form this file as default export
- file 6 (routers/quotes.routes.js)
  1. create a router using const router = express.Router()
  2. ab isme api method create karenge first import controller functions from file 4
  3. router.post("/add",controller function ka naam jese createQuote ya jo bhi tumne file 4 m banaya ho)
  4. export router from this file too isko hum main.routes.js m import krenge jisko hum router.use("/quote",yaha pr quote.routes.js wala router likhenge)
- file 6 (index.js)
- abhi yaha middle wares k niche app.use("/api",yaha pr main.router.js se export kiya hua router ka name likhenge)

## important 
- .env m port and mongodb url likhenge 

# api ka flow kuch esa hoga 
```
index.js (app.use('/api',MainRouter)) 
                ⇓
main.routes.js (router.use("/quote",QuoteRouter))
                ⇓
quotes.routes.js (router.post("/add",createQuote))
                ⇓
quotes.controller.js (yaha pr createQuotes wala controller chalega)
                ⇓
quotes.model.js (yaha pr data validate hoga as per shcema)
                ⇓
mongoDb (data mongodb m save hoga)
                ⇓
controller ko mongobd create kiye hua data dega 
                ⇓
controller api ko reponse m data send kr dega message k sath 
                ⇓
                api close ho jae gi response dene k baad
```