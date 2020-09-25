import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"
import Utterances from "../components/Utterances"

export default function BlogPost({ data, pageContext, location }) {
  const { previousPost, nextPost } = pageContext
  const post = data.markdownRemark
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={image}
        pathname={location.pathname}
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
        <div
          css={css`
            margin-top: ${rhythm(1)};
          `}
        >
          PS:{" "}
          <span role="img" aria-label="Wizard">
            🧙
          </span>
          <span role="img" aria-label="Scroll">
            📜
          </span>{" "}
          I'm looking for a freelance mission. <Link to="/">See here.</Link>
        </div>
      </main>
      <nav
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: ${rhythm(3)};
          margin-bottom: ${rhythm(3)};
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
      <Utterances
        repo="ArnaudValensi/arnaudvalensi-comments"
        issueTerm="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async={true}
      />
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
        image: featured {
          childImageSharp {
            resize(width: 1200, height: 630, jpegQuality: 100) {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`
