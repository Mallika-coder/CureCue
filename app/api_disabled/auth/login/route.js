import { NextResponse } from 'next/server';
import connectToDb from '../../../../lib/mongodb.js';
import User from '../../../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    console.log('Login attempt for:', trimmedEmail);
    if (!trimmedEmail || !trimmedPassword) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDb();

    const user = await User.findOne({ email: trimmedEmail });
    console.log('User found:', user ? user.email : 'No user');
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const match = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password match:', match);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );

    return NextResponse.json({ message: 'Logged in', token }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
