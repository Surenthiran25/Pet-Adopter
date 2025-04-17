import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../index.js';

const router = express.Router();

// Get all adoption applications for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('adoption_applications')
      .select('*, pets(*)')
      .eq('user_id', req.params.userId);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit a new adoption application
router.post('/', [
  body('petId').notEmpty(),
  body('userId').notEmpty(),
  body('notes').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const application = {
      pet_id: req.body.petId,
      user_id: req.body.userId,
      status: 'pending',
      notes: req.body.notes,
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('adoption_applications')
      .insert([application])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status
router.put('/:id/status', [
  body('status').isIn(['pending', 'approved', 'rejected']),
  body('notes').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('adoption_applications')
      .update({
        status: req.body.status,
        notes: req.body.notes,
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Application not found' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const adoptionsRouter = router;