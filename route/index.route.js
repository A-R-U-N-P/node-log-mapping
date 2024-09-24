import express from 'express';
import { getUsers } from '../controller/users.js';
import { getCustomers } from '../controller/customers.js';
const app = express();
const route = express.Router();


route.get('/users',getUsers);
route.get('/customers',getCustomers);

export const indexRoute = route;