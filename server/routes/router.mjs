import express from 'express'
import { getAllBooks, getDashboardData } from '../controllers/dashboardController.mjs'

const router = express.Router()

router.get('/dashboard',getDashboardData)
router.get('/books',getAllBooks)

export default router