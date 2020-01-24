import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../../src/models/user';
import Task, { deleteMany } from '../../src/models/task';

const _id1 = new Types.ObjectId();
const user1 = {
    _id: _id1,
    name: 'ChocoWaffles',
    email: 'waffles@choco.io',
    password: 'ChocoWaffles100@',
    tokens: [{
        token: sign({ _id: _id1 }, process.env.JWT_SECRET)
    }]
};

const _id2 = new Types.ObjectId();
const user2 = {
    _id: _id2,
    name: 'ChocoPancakes',
    email: 'pancakes@choco.io',
    password: 'ChocoPancakes200@',
    tokens: [{
        token: sign({ _id: _id2 }, process.env.JWT_SECRET)
    }]
};

const task1 = {
    _id: new Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: _id1
};

const task2 = {
    _id: new Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: _id1
};

const task3 = {
    _id: new Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: _id2
};

const configDB = async () => {
    await User.deleteMany();
    await deleteMany();
    await new User(user1).save();
    await new User(user2).save();
    await new Task(task1).save();
    await new Task(task2).save();
    await new Task(task3).save();
};

export default {
    _id1,
    _id2,
    user1,
    user2,
    task1,
    task2,
    task3,
    configDB
};
