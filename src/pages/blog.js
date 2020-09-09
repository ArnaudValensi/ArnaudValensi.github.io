import React from "react"
import Layout from "../components/Layout"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { Link, graphql } from "gatsby"
import SEO from "../components/SEO"

export default function Blog({ data }) {
  return (
    <Layout>
      <SEO title="Blog" description="All the blog posts from Arnaud Valensi" />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={`/blog${node.fields.slug}`}
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #555;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.frontmatter.description}</p>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
