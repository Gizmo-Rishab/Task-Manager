const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { _id1, user1, configDB } = require('./fixtures/db')

beforeEach(configDB)

test('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Rishab',
            email: 'rishabarora2008@googlemail.com',
            password: 'MyCode765$'
        })
        .expect(201)

    // Asserts that something is changed correctly in the DB
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Rishab',
            email: 'rishabarora2008@googlemail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyCode765$')
})

test('Should not signup user with invalid name/email/password', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 12,
            email: 'googs',
            password: 'password'
        })
        .expect(400)
})

test('Should login a existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: user1.email,
            password: user1.password
        })
        .expect(200)

    const user = await User.findById(_id1)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login a non-existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: user1.email,
            password: 'notmypasscodelolol'
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthorized user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(_id1)
    expect(user).toBeNull()
})

test('Should not delete user if unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)

    const user = await User.findById(_id1)
    expect(user).not.toBeNull()
})

test('Should upload user avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(_id1)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            name:'ChocolateWaffles'
        })
        .expect(200)

    const user = await User.findById(_id1)
    expect(user.name).toEqual('ChocolateWaffles')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            location:'British Columbia'
        })
        .expect(400)
})

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name:'Butterscotch'
        })
        .expect(401)
})

test('Should not update user with invalid name/email/password', async () => {
    await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            name: 12,
            email: 'googs',
            password: 'password'
        })
        .expect(400)
})