const Calculator = require('../src/calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('adds two numbers correctly', () => {
        expect(calculator.add(2, 3)).toBe(5);
    });

    test('subtracts two numbers correctly', () => {
        expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('multiplies two numbers correctly', () => {
        expect(calculator.multiply(4, 3)).toBe(12);
    });

    test('divides two numbers correctly', () => {
        expect(calculator.divide(6, 2)).toBe(3);
    });

    test('throws error when dividing by zero', () => {
        expect(() => calculator.divide(6, 0)).toThrow('Division by zero');
    });
}); 