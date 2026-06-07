// /app/api/potions/route.js
import { NextResponse } from 'next/server';
import connectToDb from '../../../lib/mongodb.js';
import Potion from '../../../models/Potion.js';
import jwt from 'jsonwebtoken';

function getUserIdFromToken(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return decoded.id;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export async function GET(request) {
  try {
    const userId = getUserIdFromToken(request);
    await connectToDb();
    const potions = await Potion.find({ user: userId });
    return NextResponse.json(potions);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const userId = getUserIdFromToken(request);
    await connectToDb();
    const body = await request.json();
    const newPotion = new Potion({
      ...body,
      user: userId,
    });
    await newPotion.save();
    return NextResponse.json(newPotion, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}