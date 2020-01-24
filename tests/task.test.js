import request from 'supertest';
import app from '../src/app';
import { findById } from '../src/models/task';
import { user1, user2, task1, task2, configDB } from './fixtures/db';

beforeEach(configDB);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201);
    const task = await findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Should not create task with invalid description/completed', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 2367,
            completed: 'nope'
        })
        .expect(400);
});

test('Should get tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(2);
});

test('Should delete task of user', async () => {
    await request(app)
        .delete(`/tasks/${task2._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not delete task of other user', async () => {
    await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404);
    const task = findById(task1._id);
    expect(task).not.toBeNull();
});

test('Should not delete task if unauthenticated', async () => {
    await request(app)
        .delete(`/tasks/${task1._id}`)
        .send()
        .expect(401);
    const task = findById(task1._id);
    expect(task).not.toBeNull();
});

test('Should not update task with invalid description/completed', async () => {
    await request(app)
        .patch(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 2367,
            completed: 'nope'
        })
        .expect(400);
});

test('Should not update other users task', async () => {
    await request(app)
        .patch(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send({
            description: 'lay eggs'
        })
        .expect(404);
    const task = findById(task1._id);
    expect(task.description).not.toBe('lay eggs');
});

test('Should fetch user task by id', async () => {
    await request(app)
        .get(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not fetch user task by id if unauthenticated', async () => {
    await request(app)
        .get(`/tasks/${task1._id}`)
        .send()
        .expect(401);
});

test('Should not fetch other users task by id', async () => {
    await request(app)
        .get(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404);
});

test('Should fetch only completed tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].completed).toEqual(true);
});

test('Should fetch only incomplete tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].completed).toEqual(false);
});

test('Should sort tasks by description', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=description:desc')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body).toMatchObject([
        {
            description: 'Second Task',
            completed: true
        },
        {
            description: 'First Task',
            completed: false
        }
    ]);
});

test('Should sort tasks by completed', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=completed:desc')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body).toMatchObject([
        {
            description: 'Second Task',
            completed: true
        },
        {
            description: 'First Task',
            completed: false
        }
    ]);
});

test('Should sort tasks by createdAt', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=createdAt:asc')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body).toMatchObject([
        {
            description: 'First Task',
            completed: false
        },
        {
            description: 'Second Task',
            completed: true
        }
    ]);
});

test('Should sort tasks by updatedAt', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=updatedAt:aesc')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body).toMatchObject([
        {
            description: 'First Task',
            completed: false
        },
        {
            description: 'Second Task',
            completed: true
        }
    ]);
});

test('Should fetch page of tasks', async () => {
    const response = await request(app)
        .get('/tasks?limit=1&skip=1')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body).toMatchObject([
        {
            description: 'Second Task',
            completed: true
        }
    ]);
});

test('Should add task image', async () => {
    await request(app)
        .post(`/tasks/${task1._id}/image`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('image', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const task = await findById(task1._id);
    expect(task.image).toEqual(expect.any(Buffer));
});
