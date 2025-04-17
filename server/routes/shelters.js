import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../index.js';

const router = express.Router();

// Get all shelters
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shelters')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single shelter by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shelters')
      .select('*, pets(*)')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Shelter not found' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new shelter
router.post('/', [
  body('name').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('email').isEmail(),
  body('phone').notEmpty().trim(),
  body('description').notEmpty().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('shelters')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a shelter
router.put('/:id', [
  body('name').optional().notEmpty().trim(),
  body('location').optional().notEmpty().trim(),
  body('email').optional().isEmail(),
  body('phone').optional().notEmpty().trim(),
  body('description').optional().notEmpty().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('shelters')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Shelter not found' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const sheltersRouter = router;