const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node }, index) => {
    let previousPost = null
    if (index < posts.length - 1) {
      const postIndex = index + 1
      const previousNode = posts[postIndex].node

      previousPost = {
        title: previousNode.frontmatter.title,
        slug: previousNode.fields.slug,
      }
    }

    let nextPost = null
    if (index > 0) {
      const postIndex = index - 1
      const nextNode = posts[postIndex].node
      nextPost = {
        title: nextNode.frontmatter.title,
        slug: nextNode.fields.slug,
      }
    }

    createPage({
      path: `/blog${node.fields.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        previousPost,
        nextPost,
      },
    })
  })
}
