import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

export default function Home({ data, location }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        title="About Me"
        description="Arnaud Valensi's blog and portfolio"
        keywords={[`blog`, `portfolio`, `Arnaud Valensi`]}
        pathname={location.pathname}
      />
      <main>
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/about-me/" } }) {
      html
    }
  }
`
