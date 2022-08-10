const express = require('express');
const puzzleTrackerController = require('./puzzleTrackerController');
const router = express.Router();

router.get('/',
  puzzleTrackerController.getPuzzles,
  (req, res) => res.status(200).json(res.locals.puzzles)
);

router.post('/',
  puzzleTrackerController.postPuzzle,
  (req, res) => res.status(200).send(res.locals.doc)
);

router.patch('/',
  puzzleTrackerController.patchPuzzle,
  (req, res) => res.status(200).send(req.body.name + ' update successful')
);

router.delete('/',
  puzzleTrackerController.deletePuzzle,
  (req, res) => res.status(200).send(req.body.name + ' deletion successful')
);

module.exports = router;