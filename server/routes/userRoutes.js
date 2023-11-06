import express from 'express';

import { createUserProfile, getUserProfile, getAllUserProfiles, updateUserProfile, deleteUserProfile } from '../controllers/userController.js'

const router = express.Router();

router.post('/', createUserProfile); 

router.get('/:id', getUserProfile);
router.get('/', getAllUserProfiles);

router.patch('/:id', updateUserProfile);

router.delete('/:id', deleteUserProfile);

export default router;