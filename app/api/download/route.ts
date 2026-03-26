import { ServiceSPU } from "@/lib/service-spu";
import { createWriteStream, readFileSync } from "fs";
import { mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { pipeline } from 'stream/promises'

export async function GET(req: NextRequest) {
    
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id') ?? ''
    const processo = searchParams.get('processo') ?? ''

    const service = ServiceSPU.factory(processo)
    await service.data()

    const stream = await service.download(id)

    const filePath = `data/${processo}/${id}.pdf`

    await mkdir(path.dirname(filePath), {
        recursive: true
    })

    await pipeline(stream, createWriteStream(filePath))

    return new Response(readFileSync(filePath), {
        headers: {

        }
    })
}