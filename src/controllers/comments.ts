import { Request, Response } from 'express'
import { API_URL } from 'src/common'
import axios from 'axios'

interface CommentBodyProps {
  fields: keyof CommentPropsData
  value: string
}
interface CommentProps {
  data: CommentPropsData[]
}

interface CommentPropsData {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export async function getComments(
  { body }: Request<never, unknown, CommentBodyProps, never>,
  res: Response
) {
  if (body.fields && body.value) {
    try {
      if (body.fields === 'id') {
        const { data }: { data: CommentPropsData } = await axios.get(
          `${API_URL}/comments/${body.value}`
        )
        res.status(200).send(data)
      }

      const { data }: CommentProps = await axios.get(`${API_URL}/comments`)
      const result = data.filter((d) =>
        d[body.fields].toString().includes(body.value)
      )
      res.status(200).send(result)
    } catch (err) {
      console.log('err', err)
      res.status(400)
    }
  } else {
    throw new Error('Field and Value is empty')
  }
}
