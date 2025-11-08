/**
 * Script test cho Profile API endpoints
 * 
 * Để chạy file này:
 * 1. Đảm bảo server đang chạy (npm start)
 * 2. Chạy: node test-profile-api.js
 * 
 * Hoặc cài đặt axios nếu chưa có:
 * npm install axios
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

// Helper function để log kết quả
const logResult = (title, data) => {
  console.log('\n' + '='.repeat(50));
  console.log(title);
  console.log('='.repeat(50));
  console.log(JSON.stringify(data, null, 2));
};

// Test 1: Đăng ký user mới
async function testSignup() {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      name: 'Test User Profile',
      email: `testprofile${Date.now()}@example.com`,
      password: 'password123'
    });
    logResult('✅ TEST 1: SIGNUP', response.data);
    return true;
  } catch (error) {
    console.error('❌ SIGNUP ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 2: Đăng nhập để lấy token
async function testLogin() {
  try {
    // Tạo email mới cho test
    const testEmail = `testprofile${Date.now()}@example.com`;
    
    // Đăng ký trước
    await axios.post(`${BASE_URL}/signup`, {
      name: 'Test User Profile',
      email: testEmail,
      password: 'password123'
    });

    // Đăng nhập
    const response = await axios.post(`${BASE_URL}/login`, {
      email: testEmail,
      password: 'password123'
    });
    
    authToken = response.data.token;
    logResult('✅ TEST 2: LOGIN', response.data);
    return true;
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 3: GET /profile - Lấy thông tin profile
async function testGetProfile() {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    logResult('✅ TEST 3: GET PROFILE', response.data);
    return true;
  } catch (error) {
    console.error('❌ GET PROFILE ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 4: PUT /profile - Update name
async function testUpdateName() {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, 
      {
        name: 'Updated Name Test'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    logResult('✅ TEST 4: UPDATE NAME', response.data);
    return true;
  } catch (error) {
    console.error('❌ UPDATE NAME ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 5: PUT /profile - Update email
async function testUpdateEmail() {
  try {
    const newEmail = `updated${Date.now()}@example.com`;
    const response = await axios.put(`${BASE_URL}/profile`, 
      {
        email: newEmail
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    logResult('✅ TEST 5: UPDATE EMAIL', response.data);
    return true;
  } catch (error) {
    console.error('❌ UPDATE EMAIL ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 6: PUT /profile - Update avatar
async function testUpdateAvatar() {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, 
      {
        avatar: 'https://example.com/avatar.jpg'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    logResult('✅ TEST 6: UPDATE AVATAR', response.data);
    return true;
  } catch (error) {
    console.error('❌ UPDATE AVATAR ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 7: PUT /profile - Update password (success)
async function testUpdatePassword() {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, 
      {
        currentPassword: 'password123',
        newPassword: 'newPassword123'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    logResult('✅ TEST 7: UPDATE PASSWORD', response.data);
    return true;
  } catch (error) {
    console.error('❌ UPDATE PASSWORD ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Test 8: PUT /profile - Update với invalid email
async function testInvalidEmail() {
  try {
    await axios.put(`${BASE_URL}/profile`, 
      {
        email: 'invalid-email'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.error('❌ TEST 8: INVALID EMAIL - Should have failed!');
    return false;
  } catch (error) {
    logResult('✅ TEST 8: INVALID EMAIL (Expected Error)', error.response?.data);
    return true;
  }
}

// Test 9: PUT /profile - Update password với sai current password
async function testWrongCurrentPassword() {
  try {
    await axios.put(`${BASE_URL}/profile`, 
      {
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword456'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.error('❌ TEST 9: WRONG PASSWORD - Should have failed!');
    return false;
  } catch (error) {
    logResult('✅ TEST 9: WRONG CURRENT PASSWORD (Expected Error)', error.response?.data);
    return true;
  }
}

// Test 10: GET /profile - Không có token
async function testNoToken() {
  try {
    await axios.get(`${BASE_URL}/profile`);
    console.error('❌ TEST 10: NO TOKEN - Should have failed!');
    return false;
  } catch (error) {
    logResult('✅ TEST 10: NO TOKEN (Expected Error)', error.response?.data);
    return true;
  }
}

// Test 11: PUT /profile - Update multiple fields cùng lúc
async function testUpdateMultipleFields() {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, 
      {
        name: 'Multi Update Test',
        avatar: 'https://example.com/multi-avatar.jpg'
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    logResult('✅ TEST 11: UPDATE MULTIPLE FIELDS', response.data);
    return true;
  } catch (error) {
    console.error('❌ UPDATE MULTIPLE FIELDS ERROR:', error.response?.data || error.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('\n🚀 STARTING PROFILE API TESTS...\n');
  
  const tests = [
    { name: 'Signup', fn: testSignup },
    { name: 'Login', fn: testLogin },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Update Name', fn: testUpdateName },
    { name: 'Update Email', fn: testUpdateEmail },
    { name: 'Update Avatar', fn: testUpdateAvatar },
    { name: 'Update Password', fn: testUpdatePassword },
    { name: 'Invalid Email', fn: testInvalidEmail },
    { name: 'Wrong Current Password', fn: testWrongCurrentPassword },
    { name: 'No Token', fn: testNoToken },
    { name: 'Update Multiple Fields', fn: testUpdateMultipleFields },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ ${test.name} crashed:`, error.message);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${tests.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(50));
}

// Run tests
runAllTests().catch(console.error);
