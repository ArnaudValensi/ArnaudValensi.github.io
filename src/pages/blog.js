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
      <main>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <article
            key={node.fields.slug}
            css={css`
              margin-bottom: ${rhythm(2)};
            `}
          >
            <header>
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
                </h3>
              </Link>
              <small>{node.frontmatter.date}</small>
            </header>
            <p>{node.frontmatter.description}</p>
          </article>
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
