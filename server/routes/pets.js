import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { supabase } from '../index.js';

const router = express.Router();

// Get all pets with filters
router.get('/', [
  query('species').optional().isIn(['dog', 'cat', 'other']),
  query('status').optional().isIn(['available', 'pending', 'adopted']),
  query('age').optional().isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { species, status, age } = req.query;
    let query = supabase.from('pets').select('*');

    if (species) query = query.eq('species', species);
    if (status) query = query.eq('status', status);
    if (age) query = query.eq('age', parseInt(age));

    const { data, error } = await query;
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Pet not found' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new pet listing
router.post('/', [
  body('name').notEmpty().trim(),
  body('species').isIn(['dog', 'cat', 'other']),
  body('breed').notEmpty().trim(),
  body('age').isInt({ min: 0 }),
  body('size').isIn(['small', 'medium', 'large']),
  body('description').notEmpty().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('pets')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a pet listing
router.put('/:id', [
  body('name').optional().notEmpty().trim(),
  body('species').optional().isIn(['dog', 'cat', 'other']),
  body('breed').optional().notEmpty().trim(),
  body('age').optional().isInt({ min: 0 }),
  body('size').optional().isIn(['small', 'medium', 'large']),
  body('description').optional().notEmpty().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('pets')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Pet not found' });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const petsRouter = router;