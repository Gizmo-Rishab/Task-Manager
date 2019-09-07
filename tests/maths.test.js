const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .2)
    expect(total).toBe(12)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(17.5)
})

test('Should convert farenhiet to celsius', () => {
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})

test('Should convert celsius to farenhiet', () => {
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})

// test('Async Test Demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Should add 2 numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add 2 numbers async/await', async () => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
})