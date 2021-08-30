import express from 'express'
import { getComments } from 'src/controllers/comments'
import { getPosts, getPostById } from 'src/controllers/posts'

export const init = (app: express.Application) => {
  app.post('/comments', getComments)
  app.get('/posts', getPosts)
  app.get('/posts/:id', getPostById)
}
