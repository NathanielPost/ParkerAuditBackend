import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/scores - Get all scores
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching all scores...');
    const result = await pool.query(
      'SELECT * FROM scores ORDER BY score DESC, date DESC'
    );
    
    console.log(`✅ Found ${result.rows.length} scores`);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('💥 Error fetching scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scores',
      details: error.message
    });
  }
});

// GET /api/scores/:id - Get specific score
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Fetching score with ID: ${id}`);
    
    const result = await pool.query(
      'SELECT * FROM scores WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Score not found'
      });
    }
    
    console.log(`✅ Found score: ${result.rows[0].player}`);
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('💥 Error fetching score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch score',
      details: error.message
    });
  }
});

// POST /api/scores - Create new score
router.post('/', async (req, res) => {
  try {
    const { player, score, date } = req.body;
    
    // Validation
    if (!player || !score) {
      return res.status(400).json({
        success: false,
        error: 'Player and score are required'
      });
    }
    
    console.log(`📊 Creating new score: ${player} - ${score}`);
    
    const result = await pool.query(
      'INSERT INTO scores (player, score, date) VALUES ($1, $2, $3) RETURNING *',
      [player, score, date || new Date()]
    );
    
    console.log(`✅ Score created with ID: ${result.rows[0].id}`);
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Score created successfully'
    });
  } catch (error) {
    console.error('💥 Error creating score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create score',
      details: error.message
    });
  }
});

// PUT /api/scores/:id - Update score
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { player, score, date } = req.body;
    
    console.log(`📊 Updating score with ID: ${id}`);
    
    const result = await pool.query(
      'UPDATE scores SET player = $1, score = $2, date = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [player, score, date, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Score not found'
      });
    }
    
    console.log(`✅ Score updated: ${result.rows[0].player}`);
    res.json({
      success: true,
      data: result.rows[0],
      message: 'Score updated successfully'
    });
  } catch (error) {
    console.error('💥 Error updating score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update score',
      details: error.message
    });
  }
});

// DELETE /api/scores/:id - Delete score
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📊 Deleting score with ID: ${id}`);
    
    const result = await pool.query(
      'DELETE FROM scores WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Score not found'
      });
    }
    
    console.log(`✅ Score deleted: ${result.rows[0].player}`);
    res.json({
      success: true,
      message: 'Score deleted successfully'
    });
  } catch (error) {
    console.error('💥 Error deleting score:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete score',
      details: error.message
    });
  }
});

export default router;
