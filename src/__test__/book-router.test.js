'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Book from '../model/book';
import Account from '../model/account';
import Profile from '../model/profile';
import createBookMockPromise from './lib/book-mock';
import { createAccountMockPromise } from './lib/account-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/books`;

beforeAll(startServer);
afterAll(stopServer);
afterEach((done) => {
  Promise.all([
    Account.remove({}),
    Book.remove({}),
    Profile.remove({}),

  ]);
  done();
});

describe('POST /api/books', () => {
  test('200 POST for successful post of a book', () => {
    return createAccountMockPromise()
      .then((accountMock) => {
        const bookData = {
          title: faker.lorem.words(3),
          author: faker.lorem.words(2),
          accountId: accountMock.account._id,
        };
        const { token } = accountMock;
  
        return superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .send(bookData)
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      })
      .catch((err) => {
        throw err;
      });
  });
  
  test('400 POST for bad request if no request body was provided', () => {
    return superagent.post(apiUrl)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
});
  
describe('GET /api/books', () => {
  test('200 GET for successful fetching of a book', () => {
    let savedBook;
    return createBookMockPromise()
      .then((newBook) => {
        savedBook = newBook;
        const { token } = newBook;
        return superagent.get(`${apiUrl}/${savedBook.book._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.title).toEqual(savedBook.book.title);
            expect(response.body.author).toBe(savedBook.book.author);
          });
      })
      .catch((err) => {
        throw err;
      });
  });
  
  test('404 GET for valid request made with an id that was not found', async () => {
    try {
      const savedBookData = await createBookMockPromise();
      const response = await superagent.get(`${apiUrl}/"badId"`)
        .set('Authorization', `Bearer ${savedBookData.token}`);
  
      expect(response).toEqual('potato');
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
  
//   test('401 GET for a valid request made with an invalid token', async () => {
//     try {
//       const savedBookData = await createBookMockPromise();
//       // const { token } = savedBookData;
//       const token = 'BADTOKEN';
//       const response = await superagent.get(`${apiUrl}/${savedBookData.movie._id}`)
//         .set('Authorization', `Bearer ${token}`);
  
//       expect(response.status).toEqual('potato');
//     } catch (err) {
//       expect(err.status).toEqual(401);
//     }
//   });
});
