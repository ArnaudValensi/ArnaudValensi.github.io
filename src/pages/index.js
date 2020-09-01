import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="About Me" description="About Arnaud Valensi" />
      <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
      <p>
        What do I like to do? Lots of course but definitely enjoy building
        websites.
      </p>
    </Layout>
  )
}
