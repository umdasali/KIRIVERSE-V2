/* eslint-disable @typescript-eslint/no-explicit-any */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { Download, FileText } from 'lucide-react'
import { getRelAttribute } from '@/util/helper'

// Helper function to generate heading IDs
const generateHeadingId = (children: any): string => {
    if (typeof children === 'string') {
        return children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }
    if (Array.isArray(children)) {
        return children.map(child =>
            typeof child === 'string' ? child : child?.props?.children || ''
        ).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    }
    return Math.random().toString(36).substr(2, 9)
}

// File type icon helper
const getFileIcon = (contentType?: string) => {
    if (!contentType) return <FileText className="w-4 h-4" />

    if (contentType.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />
    if (contentType.includes('image')) return <Download className="w-4 h-4 text-green-500" />
    if (contentType.includes('video')) return <Download className="w-4 h-4 text-blue-500" />
    if (contentType.includes('audio')) return <Download className="w-4 h-4 text-purple-500" />
    return <Download className="w-4 h-4" />
}

const richTextOptions = {
    renderMark: {
        [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
        [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
        [MARKS.UNDERLINE]: (text: any) => <u className="underline">{text}</u>,
        [MARKS.CODE]: (text: any) => (
            <code className="">{text}</code>
        ),
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
            <p className="article-paragraph">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h1 className="" id={id}>
                    {children}
                </h1>
            )
        },
        [BLOCKS.HEADING_2]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h2 className="" id={id}>
                    {children}
                </h2>
            )
        },
        [BLOCKS.HEADING_3]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h3 className="" id={id}>
                    {children}
                </h3>
            )
        },
        [BLOCKS.HEADING_4]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h4 className="" id={id}>
                    {children}
                </h4>
            )
        },
        [BLOCKS.HEADING_5]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h5 className="" id={id}>
                    {children}
                </h5>
            )
        },
        [BLOCKS.HEADING_6]: (node: any, children: any) => {
            const id = generateHeadingId(children)
            return (
                <h6 className="" id={id}>
                    {children}
                </h6>
            )
        },
        [BLOCKS.UL_LIST]: (node: any, children: any) => (
            <ul className="article-listing-ul">
                {children}
            </ul>
        ),
        [BLOCKS.OL_LIST]: (node: any, children: any) => (
            <ol className="article-listing-ul">
                {children}
            </ol>
        ),
        [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
            <li className="article-listing-li">
                <div className="inline">{children}</div>
            </li>
        ),
        [BLOCKS.QUOTE]: (node: any, children: any) => (
            <blockquote className="block-qoute">
                {children}
            </blockquote>
        ),
        [BLOCKS.HR]: () => <hr className="rich-text-hr" />,

        // Fixed table structure to prevent hydration errors
        [BLOCKS.TABLE]: (node: any, children: any) => {
            // Separate header rows from body rows
            const headerRows: any[] = []
            const bodyRows: any[] = []

            React.Children.forEach(children, (child) => {
                if (child?.props?.node?.nodeType === BLOCKS.TABLE_ROW) {
                    // Check if this row contains header cells
                    const hasHeaderCells = child.props.node.content?.some((cell: any) =>
                        cell.nodeType === BLOCKS.TABLE_HEADER_CELL
                    )

                    if (hasHeaderCells) {
                        headerRows.push(child)
                    } else {
                        bodyRows.push(child)
                    }
                } else {
                    // Fallback: treat as body row if we can't determine
                    bodyRows.push(child)
                }
            })

            return (
                <div className="my-8 overflow-x-auto">
                    <table className="article-table table-striped table-bordered">
                        {headerRows.length > 0 && (
                            <thead className="table-head">
                                {headerRows}
                            </thead>
                        )}
                        <tbody className="table-body">
                            {bodyRows}
                        </tbody>
                    </table>
                </div>
            )
        },

        [BLOCKS.TABLE_ROW]: (node: any, children: any) => (
            <tr className="table-row">
                {children}
            </tr>
        ),

        [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => (
            <th className="table-head-cell">
                {children}
            </th>
        ),

        [BLOCKS.TABLE_CELL]: (node: any, children: any) => (
            <td className="table-cell">
                {children}
            </td>
        ),

        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const asset = node.data.target
            if (!asset) return null

            const { file, title, description } = asset.fields
            if (!file?.url) return null

            const url = `https:${file.url}`
            const contentType = file.contentType || ''

            const isImage = contentType.startsWith('image/')
            const isVideo = contentType.startsWith('video/')
            const isAudio = contentType.startsWith('audio/')

                // Optional preview image (from Contentful metadata or custom logic)
    const previewImage =
        asset.fields?.thumbnail?.fields?.file?.url
            ? `https:${asset.fields?.thumbnail?.fields?.file?.url}`
            : file.details?.image?.thumb || undefined

            // 🎥 Handle video embeds
            if (isVideo) {
                return (
                    <figure className="my-8">
                        <video
                            controls
                            poster={previewImage}
                            preload="metadata"
                            className="w-full rounded-lg shadow-lg border border-border"
                        >
                            <source src={url} type={contentType} />
                            Your browser does not support the video tag.
                        </video>
                        {(title || description) && (
                            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                                {title || description}
                            </figcaption>
                        )}
                    </figure>
                )
            }

            // 🎧 Handle audio embeds (optional)
            if (isAudio) {
                return (
                    <figure className="my-8">
                        <audio
                            controls
                            className="w-full rounded-lg border border-border bg-muted/20 p-2"
                        >
                            <source src={url} type={contentType} />
                            Your browser does not support the audio element.
                        </audio>
                        {title && (
                            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                                {title}
                            </figcaption>
                        )}
                    </figure>
                )
            }

            // 🖼️ Handle image embeds
            if (isImage) {
                return (
                    <figure className="article-featured-image">
                        {/* <div className="relative w-fit rounded-lg overflow-hidden"> */}
                            <Image
                                src={url}
                                alt={title || 'Article image'}
                                width={file.details?.image?.width || 800}
                                height={file.details?.image?.height || 400}
                                // className="w-full h-auto"
                                loading="lazy"
                            />
                        {/* </div> */}
                        {title && (
                            <figcaption>
                                {title}
                            </figcaption>
                        )}
                    </figure>
                )
            }

            // 📄 Handle other file types
            return (
                <div className="my-6 p-4 border border-border rounded-lg bg-muted/20">
                    <a
                        href={url}
                        target="_blank"
                        rel={getRelAttribute(node.data.uri)}
                        className="article-hyper hover:underline flex items-center gap-2 font-medium"
                        aria-label={`Download ${title || file.fileName || 'file'}`}
                    >
                        {getFileIcon(contentType)} {title || file.fileName || 'Download file'}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                        Click to download or view
                    </p>
                </div>
            )
        },


        [INLINES.HYPERLINK]: (node: any, children: any) => (
            <a
                href={node.data.uri}
                target="_blank"
                rel={getRelAttribute(node.data.uri)}
                className="article-hyper hover:underline font-medium inline-flex items-center gap-1"
            >
                {children}
            </a>
        ),

        [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
            const entry = node.data.target
            if (entry && entry.fields.slug) {
                return (
                    <Link
                        href={`/articles/${entry.fields.slug}`}
                        className="article-hyper hover:underline font-medium"
                    >
                        {children}
                    </Link>
                )
            }
            return <span className="article-hyper font-medium">{children}</span>
        },

    },
}

// Export the render function for convenience
export const renderRichText = (document: any) => {
    const safeDoc = JSON.parse(JSON.stringify(document))
    return documentToReactComponents(safeDoc, richTextOptions)
}

export default richTextOptions
