'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createImageMockPromise, removeImageAndAccounts } from './lib/image-mock';

const elephantPic = `${__dirname}/asset/elefante.jpg`;
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  let token;
  let account;
  let image;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createImageMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      image = mockData.image; /*eslint-disable-line*/
    } catch (error) {
      return console.log(error);
    }
    return undefined;
  });
  afterEach(async () => {
    await removeImageAndAccounts();
  });

  describe('POST ROUTES TO /api/images', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'elefante')
          .attach('image', elephantPic);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('elefante');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (error) {
        console.log(error);
        expect(error).toEqual('foo');
      }
      return undefined;
    });
  });

  describe('GET ROUTES to /api/images', () => {
    test('200 GET /api/images for succesful fetching of an image', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(image.title);
        expect(response.body.accountId).toEqual(image.accountId.toString());
        expect(response.body.url).toEqual(image.url);
        expect(response.body.fileName).toEqual(image.fileName);
      } catch (error) {
        console.log(error);
        expect(error).toEqual('FAILING IN GET 200 POST');
      }
    });
  });
});
