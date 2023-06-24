const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';
import { addKidsRequest, createClassRequest, getAllClassesRequest, getAllKidsRequest } from '../controllers/kid.controller';

router.use([jsonParser]);
router.get('/getAllKids', [verifyJWT], getAllKidsRequest);
router.get('/getAllClasses', [verifyJWT], getAllClassesRequest);
router.put('/createClass', [verifyJWT], createClassRequest);
router.put('/addKid', [verifyJWT], addKidsRequest);

