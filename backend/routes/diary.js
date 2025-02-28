import express from 'express';
import DiaryEntry from '../models/DiaryEntry.js';
import { Op } from 'sequelize';

const router = express.Router();

// Create a new diary entry
router.post('/', async (req, res) => {
  const { date, title, content, userId } = req.body;

  try {
    const newEntry = await DiaryEntry.create({ date, title, content, userId });
    res.status(201).json({ message: 'Diary entry created successfully.', entry: newEntry });
  } catch (error) {
    console.error('Error creating diary entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all diary entries for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await DiaryEntry.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });

    if (entries.length === 0) {
      return res.status(404).json({ message: 'No diary entries found for this user.' });
    }

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get a specific diary entry by ID
router.get('/:userId/:entryId', async (req, res) => {
  const { userId, entryId } = req.params;

  try {
    const entry = await DiaryEntry.findOne({
      where: {
        id: entryId,
        userId,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'Diary entry not found.' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error('Error fetching diary entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update a diary entry
router.put('/:userId/:entryId', async (req, res) => {
  const { userId, entryId } = req.params;
  const { date, title, content } = req.body;

  try {
    const entry = await DiaryEntry.findOne({
      where: {
        id: entryId,
        userId,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'Diary entry not found.' });
    }

    entry.date = date || entry.date;
    entry.title = title || entry.title;
    entry.content = content || entry.content;

    await entry.save();

    res.status(200).json({ message: 'Diary entry updated successfully.', entry });
  } catch (error) {
    console.error('Error updating diary entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a diary entry
router.delete('/:userId/:entryId', async (req, res) => {
  const { userId, entryId } = req.params;

  try {
    const entry = await DiaryEntry.findOne({
      where: {
        id: entryId,
        userId,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: 'Diary entry not found.' });
    }

    await entry.destroy();

    res.status(200).json({ message: 'Diary entry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Search diary entries by title or content
router.get('/:userId/search', async (req, res) => {
  const { userId } = req.params;
  const { query } = req.query;

  try {
    const entries = await DiaryEntry.findAll({
      where: {
        userId,
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ],
      },
      order: [['date', 'DESC']],
    });

    if (entries.length === 0) {
      return res.status(404).json({ message: 'No matching diary entries found.' });
    }

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error searching diary entries:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
