import request from 'supertest';
import { app } from '../../src/app';
import { redisClient } from '../../src/utils/redis';

describe('SWAPI Routes', () => {
  beforeAll(async () => {
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('should get people data and cache it', async () => {
    const res = await request(app).get('/api/people/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Luke Skywalker');

    // Check cache
    const cachedData = await redisClient.get('people:1');
    expect(cachedData).not.toBeNull();
  });
});
