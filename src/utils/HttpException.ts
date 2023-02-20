import { Response } from 'express'

export default class HttpException extends Error {
    status?: number | any
    message: string
    error: string | null

    constructor(message: string, status: number, error?: string | null) {
        super(message)
        this.status = status
        this.message = message
        this.error = error || null
    }
    public ResponseError(res: Response) {
        return res.status(this.status).json(this.message)
    }
}
