const router = require('express').Router();
//database connection
const { rmaService } = require('../services');

// Get RMA
exports.getAllRMA = async (req, res) => {
    try {
      const result = await rmaService.getAllRMA();
  
      if (!result)
        return res.status(404).json({
          error: 'No RMA requests Found!',
        });
  
      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  // Get RMA by RMA number
exports.getByRMANO = async (req, res) => {
    const { RMANo } = req.params;
  try{
    const rma = await rmaService.getByRMANO(RMANo);
    if (!post)
      return res.status(404).json({
        error: `RMA ${RMANO} Not Found!`,
      });
  
    return res.status(200).json({
      result,
    });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };

  // Create RMA
exports.create = async (req, res) => {
    try {
      const {  } = req.body;
    //   const creator_id = req.authUser.id;
  
      // Checking
  
      // Creating
      const result = await rmaService.insert({  });
      if (!result) {
        return res.status(400).json({
          error: 'RMA Not Created!',
        });
      }

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
      return res.status(500).send('Internal Server Error')
    }
  };

  module.exports.updateRmaAccepted = async (req, res) => {
    const rmaNo = req.params.id;
    try {
        const results = await rmaService.getByRMANO(rmaNo);
        if (results.length > 0) {
            await rmaService.updateRmaAccepted(rmaNo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

  module.exports.updateProductReceived = async (req, res) => {
    const rmaNo = req.params.id;
    try {
        const results = await rmaService.getByRMANO(rmaNo);
        if (results.length > 0) {
            await rmaService.updateProductReceived(rmaNo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

  module.exports.updateInstructions = async (req, res) => {
    const RMANo = req.params;
    try {
        const results = await rmaService.getByStatusID(RmaStatusID);
        if (results.length > 0) {
            await rmaService.updateInstructions(
                RMANo,
                Instructions
            );
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };
