const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.listen(port, () => {
    console.log('La API está siendo escuchada correctamente');
});