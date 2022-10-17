import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (request, response) => {
    response.send('Welcome to my practice web page!');
})

app.get('/contact', (request, response) => {
    response.send('Reach out to us if you have any questions'); 
})

app.post('/contact', (request, response) => {
    response.send('Thank you for your message. We will get in touch soon.');
})

//Route that does some JavaScript math 
//then returnes saved variable values.
app.get('/math', (request, response) => {
    const number1 = 9;
    const number2 = 10;
    const plusMath = (number1 + number2)
    response.send(`What's ${number1} + ${number2}? It's ${plusMath}`);
})


app.listen(PORT, () => {
    console.log(`😁 Started server on port ${PORT}`);
})
