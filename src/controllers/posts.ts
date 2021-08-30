import { Request, Response } from 'express'
import axios from 'axios'
import { API_URL } from 'src/common'
import { PostProps, CommentProps, PostResBodyProps } from 'src/types'

export async function getPosts(
  _req: Request,
  res: Response<PostResBodyProps[]>
) {
  try {
    const posts: PostProps = await axios.get(`${API_URL}/posts`)
    const comments: CommentProps = await axios.get(`${API_URL}/comments`)

    const result: PostResBodyProps[] = posts.data.reduce((initial, current) => {
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

    // test sorting by number of comments
    // result[result.length - 1].total_number_of_comments = 10

    const sorted = result.sort(
      (a, b) => b.total_number_of_comments - a.total_number_of_comments
    )

    res.status(200).send(sorted)
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
