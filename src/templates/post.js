import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const post = data.wordpressPost
  return (
    <Layout>
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <h3>
          date: {post.date} tags: {extractTags(post)}{' '}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}

const extractTags = post =>
  post.tags ? post.tags.map(x => x.name).join(', ') : 'none'

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      tags {
        name
      }
      date(formatString: "Do MMMM YYYY")
      content
    }
  }
`
