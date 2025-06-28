import request from 'supertest';
import app from '../index';

describe('Product API', () => {
  it('GET /api/products - should return empty array initially', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
