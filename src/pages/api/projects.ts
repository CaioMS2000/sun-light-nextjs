import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const limit = 10

type ResultType = {
    previous: {page: number},
    next: {page: number},
    data: any[]
}

const chunkArray = (array: [], chunkSize: number) => {
    const result = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    
    return result
}

const chunkArray2 = (array: any[], chunkSize: number) => {
    const result = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize).map(el => el.meta.displayName);
        result.push(chunk);
    }
    
    return result
}

const ROOT = path.join(process.cwd())
const data: [] = JSON.parse(fs.readFileSync(`${ROOT}/data.json`, 'utf-8'));

interface GETParams {
    page?: string | number
}

async function GET(req: NextApiRequest, res: NextApiResponse){
    const { query } = req
    console.log(query)
    let { page }: GETParams = query;
    
    if(!page)
        page = 1
    
    page = +page
    
    const start = (page -1) * limit
    const end = page * limit
    const results: ResultType = {} as ResultType

    if(start > 0){
        results['previous'] = {
            page: page - 1,
        }
    }

    if(end < data.length){
        results['next'] = {
            page: page + 1,
        }
    }

    // results['data'] = data.slice(start, end)
    results['data'] = data.slice(0, end)

    return res.json(results);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            return await GET(req, res)
            break;
    
        default:
            break;
    }
}