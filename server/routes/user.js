import express from 'express';

import { createUserProfile, getUserProfile } from '../controllers/user.js'

const router = express.Router();

router.post('/', createUserProfile);
router.get('/:id', getUserProfile);

export default router;