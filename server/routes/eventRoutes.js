import express from 'express';

import { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent } from '../controllers/eventController.js'

const router = express.Router();

router.post('/', createEvent);

router.get('/:id', getEvent);
router.get('/', getAllEvents);

router.patch('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;