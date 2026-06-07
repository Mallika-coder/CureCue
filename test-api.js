// test-api.js - Simple test script to verify API functionality
const fetch = require('node-fetch');

async function testAPIs() {
  console.log('🧪 Testing CureCue APIs...\n');

  try {
    // Test 1: Register a new user
    console.log('1. Testing user registration...');
    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    console.log('   Status:', registerResponse.status);
    console.log('   Response:', registerData);

    if (registerResponse.status === 409) {
      console.log('   ✓ User already exists (expected)');
    } else if (registerResponse.status === 201) {
      console.log('   ✓ User registered successfully');
    }

    // Test 2: Login
    console.log('\n2. Testing user login...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Response:', loginData);

    if (loginResponse.status === 200 && loginData.token) {
      console.log('   ✓ Login successful, token received');
      const token = loginData.token;

      // Test 3: Add a potion
      console.log('\n3. Testing potion creation...');
      const potionResponse = await fetch('http://localhost:3000/api/potions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: 'Test Elixir',
          dosage: '2 drops',
          time: '09:00'
        })
      });
      const potionData = await potionResponse.json();
      console.log('   Status:', potionResponse.status);
      console.log('   Response:', potionData);

      if (potionResponse.status === 201) {
        console.log('   ✓ Potion created successfully');
      }

      // Test 4: Get potions
      console.log('\n4. Testing potion retrieval...');
      const getPotionsResponse = await fetch('http://localhost:3000/api/potions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const potionsData = await getPotionsResponse.json();
      console.log('   Status:', getPotionsResponse.status);
      console.log('   Potions count:', Array.isArray(potionsData) ? potionsData.length : 'N/A');

      if (getPotionsResponse.status === 200 && Array.isArray(potionsData)) {
        console.log('   ✓ Potions retrieved successfully');
      }

    } else {
      console.log('   ✗ Login failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎉 API testing completed!');
}

// Only run if this file is executed directly
if (require.main === module) {
  testAPIs();
}

module.exports = { testAPIs };