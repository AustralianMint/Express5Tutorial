import express from 'express'
import { logger } from './middlewares/logger.js'

// create instance of express micro-framework 
// & for port to listen
const app = express()
const PORT = 3000

//add middleware:
app.use(logger)
//<the virtual url path>, (<the actual folder name>)
app.use('/assets', express.static('public'))
//allows parsing the .body of request
app.use(express.urlencoded({extended: true}))

//One entry in a database
const dbObject = {
    "slug": "test",
    "name": "The Test",
    "description": "The BEST Test Ever!",
    "price": "Priceless"
}

//representing a database w/ entries
const dbReplica = [{
    "slug": "coffee",
    "name": "Coffee",
    "description": "very good very nice",
    "price": "6"
},
{
    "slug": "tea",
    "name": "Tea",
    "description": "a healthy alternative",
    "price": "3"
}]

app.get('/', (request, response) => {    
    console.log(request.query)
    response.send('Welcome to my practice web page!')
})

app.get('/contact', (request, response) => {
    response.send('Reach out to us if you have any questions'); 
})

app.get('/search', (request, response) => {
    //responds with query string 
    response.send('item searched for: ' + request.query.q)
})

app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('Thank you for your message. We will get in touch soon.');
})

//immitate sending data to server w/ form
app.post('/admin', (request, response) => { 
    console.log('You have added: ', request.body)
    response.send('This is suppose to show you what you have added but it does not yet')
})

//Route that does some JavaScript math 
//then returnes saved variable values.
app.get('/math', (request, response) => {
    const number1 = 9;
    const number2 = 10;
    const plusMath = (number1 + number2)
    response.send(`What's ${number1} + ${number2}? It's ${plusMath}`);
})


//Route that handles depending on the request info
app.get('/dynamic/:slug1', (request, response) => {
    
    //saves url slug 
    const slug1 = request.params.slug1
    
    //control flow + check if slug is in list
    if (Object.values(dbObject).includes(slug1)) {
        response.send(`You have selected the item: '${slug1}'. <p>
        Name: '${dbObject.name}' <p>
        Description: '${dbObject.description}' <p> 
        Price: '${dbObject.price}'`)
    } else {
        response.send(`'${slug1}' is not available today kekW.`)
    }
})


//this route adds two numbers, then shows the result.
app.get('/dynamic/add/:firstNumber/and/:secondNumber', (request, response) => {
    const first = Number(request.params.firstNumber)
    const second = Number(request.params.secondNumber)
    const result = first + second
    response.send(`${first} plust ${second} equals = ${result}.`) 
})


app.listen(PORT, () => {
    console.log(`???? Started server on port ${PORT}`);
})
