import { Request, Response } from 'express'
import { API_URL } from 'src/common'
import axios from 'axios'

interface PostProps {
  data: {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

interface CommentProps {
  data: {
    postId: number
    id: number
    name: string
    email: string
    body: string
  }[]
}
interface GetPostsResBodyProps {
  post_id: number
  post_title: string
  post_body: string
  total_number_of_comments: number
}

export async function getPosts(
  _req: Request,
  res: Response<GetPostsResBodyProps[]>
) {
  try {
    const posts: PostProps = await axios.get(`${API_URL}/posts`)
    const comments: CommentProps = await axios.get(`${API_URL}/comments`)

    const result = posts.data.reduce((initial, current) => {
      const noOfComments = comments.data.filter(
        (comment) => comment.postId === current.id
      )

      initial.push({
        post_id: current.id,
        post_title: current.title,
        post_body: current.body,
        total_number_of_comments: noOfComments.length
      })

      return initial
    }, [])

    res.status(200).send(result)
  } catch (err) {
    console.log('err', err)
    res.status(400)
  }
}

export async function getPostById(
  req: Request<{ id: number }, unknown, unknown, never>,
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
