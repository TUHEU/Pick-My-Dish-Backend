// recipeRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/recipes/');
  },
  filename: (req, file, cb) => {
    cb(null, `recipe-${Date.now()}-${Math.random()}.jpg`);
  }
});

const upload = multer({ storage });

router.post('/recipes', upload.single('image'), async (req, res) => {
  try {
    const { name, category, time, calories, ingredients, instructions, userId } = req.body;
    
    const recipe = await db.query(
      `INSERT INTO recipes (user_id, name, category_id, cooking_time, calories, ingredients, instructions, image_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId || null, name, category, time, calories, ingredients, instructions, req.file?.path || null]
    );
    
    res.status(201).json({ message: 'Recipe created', recipeId: recipe.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await db.query('SELECT * FROM recipes');
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});