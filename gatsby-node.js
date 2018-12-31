const path = require('path')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const createWpPosts = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allWordpressPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `)

    query.then(result => {
      if (result.errors) {
        console.error(results.errors)
        reject(result.error)
      }

      const postEdges = result.data.allWordpressPost.edges

      postEdges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            id: edge.node.id,
          },
        })
      })

      resolve()
    }) // query.then
  }) // createWpPosts

  return Promise.all([createWpPosts])
} // createPages
