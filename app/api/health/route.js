import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json(
            { status: 'ok', db: 'connected', timestamp: new Date().toISOString() },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { status: 'error', db: 'disconnected', message: error.message },
            { status: 500 }
        );
    }
}
