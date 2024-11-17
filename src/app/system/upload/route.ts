import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import multiparty from 'multiparty'
import { Readable } from 'node:stream'
import { IncomingMessage } from 'node:http'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Converter um ReadableStream da Web API para um Node.js Readable
const toNodeReadable = (
  readableStream: ReadableStream<Uint8Array>
): Readable => {
  const reader = readableStream.getReader()
  return new Readable({
    async read() {
      const { done, value } = await reader.read()
      if (done) {
        this.push(null)
      } else {
        this.push(Buffer.from(value))
      }
    },
  })
}

// Criar um objeto IncomingMessage compatível
const toNodeRequest = (req: NextRequest): IncomingMessage => {
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  const bodyStream = toNodeReadable(req.body as ReadableStream<Uint8Array>)
  const nodeRequest = Object.assign(bodyStream, {
    headers,
    method: req.method,
    url: req.url,
  }) as IncomingMessage

  return nodeRequest
}

const parseForm = (req: NextRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form()
    form.parse(toNodeRequest(req), (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export async function POST(req: NextRequest) {
  try {
    const { files } = await parseForm(req)

    if (!files || files.files?.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'uploads')
    console.log(uploadDir)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }

    files.files.forEach((file: any) => {
      const filePath = path.join(uploadDir, file.originalFilename)
      fs.renameSync(file.path, filePath)
    })

    return NextResponse.json(
      { message: 'Files uploaded successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}
