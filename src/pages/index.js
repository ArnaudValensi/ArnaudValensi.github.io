import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO title="About Me" description="About Arnaud Valensi" />
      <p>What do I like to do?</p>
    </Layout>
  )
}
