/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { embeddedBlogEntry } from "./renderEmbeddedEntry"

function RelatedPost({ blogEntry }: any) {
  return (
    embeddedBlogEntry({ nodeType: "document", content: blogEntry })
  )
}
export default RelatedPost
