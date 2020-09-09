import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default function Home() {
  return (
    <Layout>
      <SEO title="About Me" description="About Arnaud Valensi" />
      <p>What do I like to do?</p>
    </Layout>
  )
}
