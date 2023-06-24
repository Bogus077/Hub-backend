const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
import { getUserRequest, getAllUsersRequest } from '../controllers/user.controller';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

router.use([jsonParser]);
router.get('/getCurrentUser', [verifyJWT], getUserRequest);
router.get('/getAllUsers', [], getAllUsersRequest);

