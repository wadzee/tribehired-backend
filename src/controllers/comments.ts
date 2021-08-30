import { Request, Response } from 'express'
import axios from 'axios'
import { CommentBodyProps, CommentProps, CommentDataProps } from 'src/types'
import { API_URL } from 'src/common'

export async function getComments(
  { body }: Request<never, unknown, CommentBodyProps, never>,
  res: Response
) {
  if (body.fields && body.value) {
    try {
      if (body.fields === 'id') {
        const { data }: { data: CommentDataProps } = await axios.get(
          `${API_URL}/comments/${body.value}`
        )
        res.status(200).send(data)
      }

      const { data }: CommentProps = await axios.get(`${API_URL}/comments`)
      const result = data.filter((d) => d[body.fields] === body.value)
      res.status(200).send(result)
    } catch (err) {
      console.log('err', err)
      res.status(400)
    }
  } else {
    res.status(400).send('Field and Value param is empty')
  }
}
