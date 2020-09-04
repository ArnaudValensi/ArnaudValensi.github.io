import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"

export default function Contact() {
  return (
    <Layout>
      <SEO title="Contact Me" description="Arnaud Valensi's contact details" />
      <div
        css={css`
          text-align: center;
        `}
      >
        <p>
          <a href="mailto:me@example.com">Email</a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/arnaud-valensi-04080084/">
            LinkedIn
          </a>
        </p>
        <p>
          <a href="https://twitter.com/ArnaudValensi">Twitter</a>
        </p>
      </div>
    </Layout>
  )
}
