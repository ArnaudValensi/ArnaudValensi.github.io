import React from "react"

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div {...delegated}></div>
  }

  return <div {...delegated}>{children}</div>
}
