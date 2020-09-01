import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Contact() {
  return (
    <Layout>
      <SEO title="Contact Me" description="Arnaud Valensi's contact details" />
      <h1>I'd love to talk! Email me at the address below</h1>
      <p>
        <a href="mailto:me@example.com">me@example.com</a>
      </p>
    </Layout>
  )
}
