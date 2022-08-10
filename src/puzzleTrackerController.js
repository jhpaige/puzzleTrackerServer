const Puzzle = require('./puzzleTrackerModel');

const puzzleTrackerController = {};

// Get puzzles
puzzleTrackerController.getPuzzles = (req, res, next) => {
  Puzzle.find({}).then((result) => {
    if (!result) throw 'Puzzles don\'t exist';
    else {
      res.locals.puzzles = result;
      return next();
    }
  }).catch((e) => 
    next({
      log: `Error in puzzleTrackerController.getPuzzles: ${e}`,
      status: 400,
      message: { err: 'Error occured when getting puzzles, check server for details' },
    })
  );
}

// Add puzzle
puzzleTrackerController.postPuzzle = async (req, res, next) => {
  try {
    console.log(req.body);
    const doc = await Puzzle.create(req.body);
    res.locals.doc = doc;
    return next();
  } catch (e) {
    next({
      log: `Error in puzzleTrackerController.getPuzzles: ${e}`,
      status: 400,
      message: { err: 'Error occured when creating new puzzle, check server for details' },
    });
  }
}

// Edits puzzle with request that has name, image, and times in body
puzzleTrackerController.patchPuzzle = async (req, res, next) => {
  try {
    const doc = await Puzzle.findOne({name: req.body.name});
    doc.name = req.body.name;
    doc.image = req.body.image;
    doc.times = req.body.times;
    res.locals.name = doc.name;
    doc.save();
    return next();
  } catch (e) {
    return next({
      log: `Error in puzzleTrackerController.patchPuzzle: ${e}`,
      status: 400,
      message: { err: 'Error occured when updating puzzle, check server for details' },
    });
  }
}

// Deletes puzzle with req that has name in body
puzzleTrackerController.deletePuzzle = async (req, res, next) => {
  try {
    await Puzzle.deleteOne({name: req.body.name});
    return next();
  } catch (e) {
    return next({
      log: `Error in puzzleTrackerController.deletePuzzle: ${e}`,
      status: 400,
      message: { err: 'Error occured when deleting puzzle, check server for details' },
    });
  }
}

module.exports = puzzleTrackerController;