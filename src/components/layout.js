import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      css={css`
        padding: ${rhythm(2)} ${rhythm(1)};
      `}
    >
      <div
        css={css`
          margin: 0 auto;
          max-width: 680px;
        `}
      >
        <Link to="/">
          <h2
            css={css`
              margin-bottom: ${rhythm(2)};
              display: inline-block;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h2>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/">About Me</ListLink>
          <ListLink to="/blog/">Blog</ListLink>
          <ListLink to="/contact/">Contact Me</ListLink>
        </ul>
        {children}
      </div>
    </div>
  )
}
