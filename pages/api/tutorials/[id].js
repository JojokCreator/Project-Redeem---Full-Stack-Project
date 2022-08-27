import mongoose from 'mongoose'
import tutorialsSchema from '../../../models/postTutorial.js'
import dbConnect from '../../../utils/connectMongo.js'

export default async function handler(req, res) {

  await dbConnect();
    console.log(req.query)
    const { id } = req.query
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No tutorial with id ${id} found`)
    }
    try {
      const tutorial = await tutorialsSchema.findById(id)
      res.status(200).json(tutorial)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }