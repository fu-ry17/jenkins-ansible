const express = require('express');
const path = require('path');
const Calculator = require('./calculator');

const app = express();
const calculator = new Calculator();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/calculate', (req, res) => {
    const { operation, a, b } = req.body;
    let result;

    try {
        switch (operation) {
            case 'add':
                result = calculator.add(Number(a), Number(b));
                break;
            case 'subtract':
                result = calculator.subtract(Number(a), Number(b));
                break;
            case 'multiply':
                result = calculator.multiply(Number(a), Number(b));
                break;
            case 'divide':
                result = calculator.divide(Number(a), Number(b));
                break;
            default:
                return res.status(400).json({ error: 'Invalid operation' });
        }
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; 