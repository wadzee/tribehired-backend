import { Request, Response } from 'express'
import { API_URL } from 'src/common'
import axios from 'axios'

export async function getComments(req: Request, res: Response) {
  try {
    const result = await axios.get(`${API_URL}/comments`)
    res.status(200).send(result.data)
  } catch (err) {
    console.log('err', err)
    res.status(400)
  }
}
