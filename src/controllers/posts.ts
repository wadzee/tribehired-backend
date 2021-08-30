import { Request, Response } from 'express'
import { API_URL } from 'src/common'
import axios from 'axios'

interface PostProps {}

export async function getPosts(_req: Request, res: Response) {
  try {
    const result = await axios.get(`${API_URL}/posts`)
    res.status(200).send(result.data)
  } catch (err) {
    console.log('err', err)
    res.status(400)
  }
}

export async function getPostById(
  req: Request<{ id: number }, unknown, never, unknown>,
  res: Response
) {
  try {
    const result = await axios.get(`${API_URL}/posts/${req.params.id}`)
    res.status(200).send(result.data)
  } catch (err) {
    console.log('err', err)
    res.status(400)
  }
}
