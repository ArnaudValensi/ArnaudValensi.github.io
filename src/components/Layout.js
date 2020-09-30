import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import DarkModeToggler from "./DarkModeToggler"
import ClientOnly from "./ClientOnly"

const isActive = propsIfActive => ({ isPartiallyCurrent, href, location }) => {
  if (isPartiallyCurrent) {
    if (href === "/" && location.pathname !== "/") {
      return null
    }

    return propsIfActive
  }

  return null
}

const MenuLink = props => (
  <Link
    to={props.to}
    css={css`
      text-decoration: none;
      color: var(--menuLink);
      transition: opacity 0.2s ease-out;
      opacity: 60%;
      &:hover {
        opacity: 100%;
        text-decoration: none;
      }
      & + & {
        margin-top: ${rhythm(1)};
      }

      @media (min-width: 650px) {
        & + & {
          margin-top: 0;
          margin-left: ${rhythm(1)};
        }
      }
    `}
    getProps={isActive({ style: { opacity: 1 } })}
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
        transition: "color 2s ease-out, background 2s ease-out";
      `}
    >
      <header>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: ${rhythm(2)};

            @media (min-width: 650px) {
              flex-direction: row;
              margin-bottom: ${rhythm(1 / 2)};
            }
          `}
        >
          <Link
            to="/"
            css={css`
              width: 100%;
              margin-bottom: ${rhythm(2)};
              text-align: center;

              @media (min-width: 650px) {
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
          <nav
            css={css`
              display: flex;
              flex-direction: column;
              margin-left: 0;
              align-items: center;

              @media (min-width: 650px) {
                margin-left: auto;
                flex-direction: row;
              }
            `}
          >
            <MenuLink to="/">About Me</MenuLink>
            <MenuLink to="/blog/">Blog</MenuLink>
            <MenuLink to="https://registry.jsonresume.org/ArnaudValensi">
              Resume
            </MenuLink>
            <MenuLink to="/contact/">Socials</MenuLink>
          </nav>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row-reverse;
            margin-bottom: ${rhythm(3)};
            justify-content: center;

            @media (min-width: 650px) {
              justify-content: unset;
            }
          `}
        >
          <ClientOnly
            css={css`
              height: 24px;
            `}
          >
            <DarkModeToggler />
          </ClientOnly>
        </div>
      </header>
      <div>{children}</div>
    </div>
  )
}
