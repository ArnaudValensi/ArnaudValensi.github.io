const { Client } = require("@notionhq/client")
const slugify = require("slugify")
const path = require("path")
const rimraf = require("rimraf")
const fs = require("fs")
const fetch = require("node-fetch")
const crypto = require("crypto")

const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_ROOT_PAGE_ID = process.env.NOTION_ROOT_PAGE_ID

console.log(
  "NOTION_ROOT_PAGE_ID: ",
  JSON.stringify(NOTION_ROOT_PAGE_ID, null, 2)
)

const markdownPages = {}

// Initializing a client
const notion = new Client({
  auth: NOTION_TOKEN,
})

const regexMeta = /^== *(\w+) *:* (.+) *$/

const destPath = path.normalize(path.join(__dirname, "..", "content", "blog"))

async function downloadFile(url, destinationFolder) {
  console.log(`-> Downloading ${url}`)

  const response = await fetch(url)
  const contentType = response.headers.get("content-type").split("/")
  const ext = contentType[contentType.length - 1]
  const buffer = await response.buffer()
  const hash = crypto.createHash("sha1").update(buffer).digest("hex")
  const fileName = `${hash}.${ext}`
  const filePath = path.join(destinationFolder, fileName)
  await fs.promises.writeFile(filePath, buffer)

  return fileName
}

function toTextString(text) {
  return text.reduce((result, textItem) => {
    if (textItem.type !== "text") {
      console.log(`=================> not a 'text' type: ${textItem.type}`)
      process.exit(1)
    }

    if (textItem.text.link !== null) {
      return `${result}[${textItem.text.content}](${textItem.text.link.url})`
    }

    if (textItem.annotations.code === true) {
      return `${result}\`${textItem.text.content}\``
    }

    return `${result}${textItem.text.content}`
  }, "")
}

async function processBlocks(pageContent, textPrefix = "") {
  let text = ""
  const metas = []
  let wasBulletedList = false

  for (const block of pageContent.results) {
    if (wasBulletedList === true && block.type !== "bulleted_list_item") {
      wasBulletedList = false
      text = `${text}\n`
    }

    if (block.object !== "block") {
      return
    }

    if (block.type === "child_page") {
      const subpageSlug = await toMarkdown(block.id, false)
      text = text + `[${block.child_page.title}](/blog/${subpageSlug})\n\n`
    } else if (block.type === "paragraph") {
      // Empty block.
      if (block.paragraph.text.length === 0) {
        text = text + "\n\n"
        continue
      }

      // Meta.
      const match = block.paragraph.text[0].text.content.match(regexMeta)
      if (match !== null) {
        metas.push(`${match[1]}: '${match[2]}'`)
        continue
      }

      // Simple text.
      text = `${text}${textPrefix}${toTextString(block.paragraph.text)}\n\n`
    } else if (
      block.type === "heading_2" &&
      block.heading_2.text.length !== 0
    ) {
      text = `${text}${textPrefix}## ${toTextString(block.heading_2.text)}\n\n`
    } else if (
      block.type === "heading_3" &&
      block.heading_3.text.length !== 0
    ) {
      text = `${text}${textPrefix}### ${toTextString(block.heading_3.text)}\n\n`
    } else if (block.type === "bulleted_list_item") {
      wasBulletedList = true
      text = `${text}${textPrefix}* ${toTextString(
        block.bulleted_list_item.text
      )}\n`
    } else if (block.type === "code") {
      text = `${text}${textPrefix}\`\`\`${block.code.language}\n${toTextString(
        block.code.text
      )}\n\`\`\`\n\n`
    } else if (block.type === "video") {
      text = `${text}\`video: ${block.video.external.url}\`\n\n`
    } else if (block.type === "image") {
      image_name = await downloadFile(block.image.external.url, destPath)
      text = `${text}${textPrefix}![${image_name}](${image_name})\n\n`
    } else if (block.type === "divider") {
      text = `${text}---\n`
    } else {
      console.log("=====> Unhandled block: ", JSON.stringify(block, null, 2))
    }
  }

  return [text, metas]
}

async function toMarkdown(pageId, ignore) {
  const pageProps = await notion.pages.retrieve({
    page_id: pageId,
  })
  const pageContent = await notion.blocks.children.list({
    block_id: pageId,
  })

  const pageTitle = pageProps.properties.title.title[0].plain_text
  const slug = slugify(pageTitle, { lower: true, remove: /[*+~.,()'"!:@]/g })
  let text = ""
  const metas = []

  // Handle Frontmatter.
  metas.push(`title: '${pageTitle}'`)

  // Download the cover and add it to the frontmatter.
  if (pageProps.cover !== null && pageProps.cover.type === "external") {
    const pageCoverUrl = pageProps.cover.external.url
    const coverImageName = await downloadFile(pageCoverUrl, destPath)
    metas.push(`featured: '${coverImageName}'`)
  }

  const [contentText, childMetas] = await processBlocks(pageContent)

  metas.push(...childMetas)
  metaText = "---\n" + metas.join("\n") + "\n---\n"
  text = metaText + contentText

  // Save the page data if it is not the root page.
  if (!ignore) {
    markdownPages[slug] = text
    console.log(`=> Imported "${pageTitle}"`)
  }

  return slug
}

;(async () => {
  console.log(`-> Cleaning the '${destPath}' folder`)
  rimraf.sync(destPath)
  fs.mkdirSync(destPath, { recursive: true })

  await toMarkdown(NOTION_ROOT_PAGE_ID, true)

  await Promise.all(
    Object.entries(markdownPages).map(async ([slug, markdown]) => {
      const filename = `${slug}.md`
      const filepath = path.join(destPath, filename)
      await fs.promises.writeFile(filepath, markdown)
    })
  )

  console.log(`Done: imported ${Object.entries(markdownPages).length} pages.`)
})().catch(console.error)
