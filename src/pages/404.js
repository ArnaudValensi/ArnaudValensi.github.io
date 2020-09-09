import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { css } from "@emotion/core"
import Img from "gatsby-image"

export default function Contact({ data }) {
  return (
    <Layout>
      <div
        css={css`
          text-align: center;
          padding-top: 45px;
        `}
      >
        <h2>Page not found</h2>
        <p>Oops! The page you are looking for has been removed or relocated.</p>
        <Img fluid={data.file.childImageSharp.fluid} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "error404.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 680) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
