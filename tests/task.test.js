const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { _id1, user1, configDB } = require('./fixtures/db')

beforeEach(configDB)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})