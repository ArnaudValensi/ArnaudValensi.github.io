import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

const MenuLink = props => (
  <Link
    to={props.to}
    css={css`
      text-decoration: none;
      color: var(--menuLink);
      transition: opacity 0.2s ease-in-out;
      opacity: 60%;
      &:hover {
        opacity: 100%;
      }
      & + & {
        margin-top: ${rhythm(1)};
      }

      @media (min-width: 576px) {
        & + & {
          margin-top: 0;
          margin-left: ${rhythm(1)};
        }
      }
    `}
    activeStyle={{ opacity: 1 }}
  >
    {props.children}
  </Link>
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
        color: var(--textNormal);
        padding: ${rhythm(2)} ${rhythm(1)};
        margin: 0 auto;
        max-width: 680px;
        transition: "color 2s ease-out, background 2s ease-out, background-color 2s ease-out";
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: ${rhythm(2)};

          @media (min-width: 576px) {
            flex-direction: row;
          }
        `}
      >
        <Link
          to="/"
          css={css`
            width: 100%;
            margin-bottom: ${rhythm(2)};
            text-align: center;

            @media (min-width: 576px) {
              width: unset;
              margin-bottom: 0;
              text-align: unset;
            }
          `}
        >
          <h2
            css={css`
              display: inline-block;
              font-style: normal;
              margin-bottom: 0;
              color: var(--websiteTitle);
            `}
          >
            {data.site.siteMetadata.title}
          </h2>
        </Link>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-left: 0;
            align-items: center;

            @media (min-width: 576px) {
              margin-left: auto;
              flex-direction: row;
            }
          `}
        >
          <MenuLink to="/">About Me</MenuLink>
          <MenuLink to="/blog/">Blog</MenuLink>
          <MenuLink to="/contact/">Contact Me</MenuLink>
        </div>
      </div>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />{" "}
            Dark mode
          </label>
        )}
      </ThemeToggler>
      <div>{children}</div>
    </div>
  )
}
