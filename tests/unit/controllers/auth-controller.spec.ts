import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import request from 'supertest';
import { LoginDto } from '../../../src/modules/dto/user.dto';
import App from '../../../src/app';

describe('main', () => {
  let app: App;

  beforeAll(async () => {
    app = new App(3000);
    await app.init();
    await app.listen();
  }, 15000);

  afterAll(async () => {
    // Clean up any resources if needed
  });

  it('check connection', async () => {
    const res = await request(app.application()).get('/').send();
    expect(res.statusCode).toBe(200);
  });

    it('should return API response with login data on successful login', async () => {

    // Prepare the request body
    const loginDto: LoginDto = { email: 'maadmughal@gmail.com', password: 'Test@123' };

    // Send a POST request to the login endpoint
    const response = await request(app.application()).post('/auth/login').send(loginDto);

    // Assertions
    expect(response.statusCode).toBe(200);
  });

  it('should call the next middleware with the error on login failure', async () => {

    // Prepare the request body
    const loginDto: LoginDto = { email: 'maadmughal@gmail.com', password: 'Test@12' };

    // Send a POST request to the login endpoint
    const response = await request(app.application()).post('/auth/login').send(loginDto);

    // Assertions
    expect(response.statusCode).toBe(401);
  });
});