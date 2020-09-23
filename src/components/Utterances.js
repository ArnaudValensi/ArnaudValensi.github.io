/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react"
import { css } from "@emotion/core"

export default ({
  repo,
  issueTerm = "pathname",
  label = "",
  theme = "github-light",
  crossorigin = "anonymous",
  async = true,
  style = "",
}) => {
  const rootElm = React.createRef()

  useEffect(() => {
    const utterances = document.createElement("script")

    // set config to of script element
    Object.entries({
      src: "https://utteranc.es/client.js",
      repo,
      "issue-term": issueTerm,
      label,
      theme,
      crossorigin,
      async,
    }).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    // attach script element
    rootElm.current.appendChild(utterances)
  }, [])

  return (
    <div
      id="utterances_container"
      ref={rootElm}
      className={css`
        ${style}
      `}
    />
  )
}
