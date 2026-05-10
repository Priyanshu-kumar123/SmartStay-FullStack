import express from 'express'
import { analyzeReview } from '../controllers/aiController.js'

const router = express.Router()
router.post('/analyze-review', analyzeReview)

export default router