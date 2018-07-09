'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Book from '../model/book';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
 
const bookRouter = new Router();
 
bookRouter.post('/api/books', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'BOOK ROUTER POST ERROR: not authorized'));
 
  Book.init()
    .then(() => {
      logger.log(logger.INFO, `BOOK ROUTER BEFORE SAVE: Saved a new book ${JSON.stringify(request.body)}`);
      return new Book(request.body).save();
    })
    .then((newBook) => {
      logger.log(logger.INFO, `BOOK ROUTER AFTER SAVE: Saved a new book ${JSON.stringify(newBook)}`);
      return response.json(newBook);
    })
    .catch(next);
   
  return undefined;
});

bookRouter.get('/api/books/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'BOOK ROUTER POST ERROR: not authorized'));
    
  Book.init()
    .then(() => {
      return Book.findOne({ _id: request.params.id });
    })
    .then((foundBook) => {
      logger.log(logger.INFO, `BOOK ROUTER: FOUND THE MODEL, ${JSON.stringify(foundBook)}`);
      response.json(foundBook);
    })
    .catch(next);
      
  return undefined;
});
     
export default bookRouter;
