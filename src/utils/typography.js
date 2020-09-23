import Typography from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

const customTheme = {
  title: "Kirkham",
  baseFontSize: "18px",
  baseLineHeight: 1.44,
  scaleRatio: 2.15,
  blockMarginBottom: 1,
  headerFontFamily: ["Patua One", "sans-serif"],
  bodyFontFamily: ["Fira Sans", "sans-serif"],
  headerColor: "hsla(0,0%,0%,1)",
  bodyColor: "hsla(0,0%,0%,0.8)",
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    "h1, h2, h3, h4, h5, h6": {
      color: "var(--textTitle)",
    },
    a: {
      color: "var(--textLink)",
      textDecoration: "none",
    },
    "a:hover": {
      textDecoration: "underline",
      textDecorationColor: "var(--textLink)",
    },
    blockquote: {
      ...scale(1 / 5),
      color: "inherit",
      opacity: "0.8",
      fontStyle: "italic",
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid`,
      borderLeftColor: "inherit",
    },
    "blockquote > :last-child": {
      marginBottom: 0,
    },
    "blockquote cite": {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    "blockquote cite:before": {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
}

const typography = new Typography(customTheme)

export default typography
export const rhythm = typography.rhythm
