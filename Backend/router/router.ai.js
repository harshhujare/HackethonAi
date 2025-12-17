import express from 'express';
const router=express.Router();
import {HandelPrompt} from '../controller/controller.ai.js';

router.post('/text',HandelPrompt);

export default router;