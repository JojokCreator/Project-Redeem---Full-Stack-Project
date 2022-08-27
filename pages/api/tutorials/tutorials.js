import mongoose from 'mongoose'
import tutorialsSchema from '../../../models/postTutorial.js'
import dbConnect from '../../../utils/connectMongo.js'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tutorials = await tutorialsSchema.find()
        res.status(200).json(tutorials)
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
      break
    case 'POST':
      try {
        const tutorials = req.body //Whole
        const newTutorials = tutorialsSchema({
          ...tutorials,
          creatdAt: new Date().toISOString(),
          materials: tutorials.materials.split(','),
        })
        await newTutorials.save()
        res.status(201).json(newTutorials)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).send(`No tutorial with id ${id} found`)
        }
        await tutorialsSchema.findByIdAndRemove(id)
        res.status(200).json({ message: `Post with ${id} deleted` })
      } catch (error) {
        res.status(404).json({ message: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
