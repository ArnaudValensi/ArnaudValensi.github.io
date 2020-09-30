import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { css } from "@emotion/core"

export default function Contact({ location }) {
  return (
    <Layout>
      <SEO
        title="Social information"
        description="Arnaud Valensi's social networks details"
        pathname={location.pathname}
      />
      <main
        css={css`
          text-align: center;
        `}
      >
        <p>
          <a
            href="mailto:arnaud.valensi@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
        </p>
        <p>
          <a
            href="https://github.com/ArnaudValensi"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/arnaud-valensi-04080084/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
        <p>
          <a
            href="https://twitter.com/ArnaudValensi"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>
      </main>
    </Layout>
  )
}
