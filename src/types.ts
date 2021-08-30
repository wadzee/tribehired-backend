export interface CommentBodyProps {
  fields: keyof CommentDataProps
  value: string | number
}

export interface CommentProps {
  data: CommentDataProps[]
}

export interface CommentDataProps {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface PostProps {
  data: {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

export interface PostResBodyProps {
  post_id: number
  post_title: string
  post_body: string
  total_number_of_comments: number
}
