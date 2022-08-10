const express = require('express');
const puzzleTrackerController = require('./puzzleTrackerController');
const router = express.Router();

router.get('/',
  puzzleTrackerController.getPuzzle,
  (req, res) => res.status(200).json()
);

router.post('/',
  puzzleTrackerController.postPuzzle,
  (req, res) => res.status(200).json()
);

router.put('/',
  puzzleTrackerController.putPuzzle,
  (req, res) => res.status(200).json()
);

router.delete('/',
  puzzleTrackerController.deletePuzzle,
  (req, res) => res.status(200).json()
);

module.exports = router;