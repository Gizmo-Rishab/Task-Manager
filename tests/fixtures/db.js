const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const _id1 = new mongoose.Types.ObjectId()
const user1 = {
    _id: _id1,
    name: 'ChocoWaffles',
    email: 'waffles@choco.io',
    password: 'ChocoWaffles100@',
    tokens: [{
        token: jwt.sign({ _id: _id1 }, process.env.JWT_SECRET)
    }]
}

const _id2 = new mongoose.Types.ObjectId()
const user2 = {
    _id: _id2,
    name: 'ChocoPancakes',
    email: 'pancakes@choco.io',
    password: 'ChocoPancakes200@',
    tokens: [{
        token: jwt.sign({ _id: _id2 }, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: _id1
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: _id1
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: _id2
}

const configDB = async () => {
    await User.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
}

module.exports = {
    _id1,
    user1,
    configDB
}