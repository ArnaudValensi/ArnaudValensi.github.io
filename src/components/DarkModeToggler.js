import React from "react"
import Toggle from "./Toggle"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import sun from "../images/sun.png"
import moon from "../images/moon.png"

export default function DarkModeToggler() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        return (
          <Toggle
            icons={{
              checked: (
                <img
                  src={moon}
                  alt="moon"
                  width="16"
                  height="16"
                  role="presentation"
                  style={{ pointerEvents: "none" }}
                />
              ),
              unchecked: (
                <img
                  src={sun}
                  alt="sun"
                  width="16"
                  height="16"
                  role="presentation"
                  style={{ pointerEvents: "none" }}
                />
              ),
            }}
            checked={theme === "dark"}
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
          />
        )
      }}
    </ThemeToggler>
  )
}
