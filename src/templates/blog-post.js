import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"

export default function BlogPost({ data, pageContext }) {
  const { previousPost, nextPost } = pageContext

  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <main
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Link
          to="/blog/"
          css={css`
            margin-bottom: ${rhythm(1)};
          `}
        >
          ← Back
        </Link>
        <article>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <nav
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: ${rhythm(3)};
        `}
      >
        <div>
          {previousPost && (
            <Link
              to={`/blog${previousPost.slug}`}
              rel="prev"
              style={{ marginRight: 20 }}
            >
              ← {previousPost.title}
            </Link>
          )}
        </div>
        <div>
          {nextPost && (
            <Link to={`/blog${nextPost.slug}`} rel="next">
              {nextPost.title} →
            </Link>
          )}
        </div>
      </nav>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
