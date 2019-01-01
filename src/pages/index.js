import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Welcome to the Gatsby demo</h1>
    <h3>There are {data.allWordpressPost.totalCount} posts</h3>
    {data.allWordpressPost.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={node.slug}>
          <h4><span dangerouslySetInnerHTML={{ __html: node.title}} /> - {node.date}</h4>
        </Link>
        
        <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </div>
    ))}
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "Do MMMM")
        }
      }
    }
  }
`
