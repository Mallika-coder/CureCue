import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
    const uri = process.env.MONGODB_URI;

    // Check if URI exists at all
    if (!uri) {
        return NextResponse.json(
            {
                status: 'error',
                db: 'disconnected',
                message: 'MONGODB_URI is not set in environment variables',
                hint: 'Add MONGODB_URI to Vercel Environment Variables and redeploy'
            },
            { status: 500 }
        );
    }

    // Mask URI for safe display (show only host part)
    const uriMasked = uri.replace(/:([^@]+)@/, ':***@');

    try {
        await dbConnect();
        return NextResponse.json(
            {
                status: 'ok',
                db: 'connected',
                uri_configured: uriMasked,
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                db: 'disconnected',
                uri_configured: uriMasked,
                message: error.message,
                hint: 'Check MongoDB Atlas IP Access List — add 0.0.0.0/0 to allow all IPs'
            },
            { status: 500 }
        );
    }
}
