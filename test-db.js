import 'dotenv/config';
import connectToDb from './lib/mongodb.js';
import User from './models/User.js';

async function deleteUser() {
  try {
    await connectToDb();
    console.log('MongoDB connected successfully');

    const result = await User.deleteOne({ email: 'vermamallika372@gmail.com' });
    console.log('User deleted:', result.deletedCount);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteUser();