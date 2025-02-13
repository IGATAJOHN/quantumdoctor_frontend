const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';

async function testLabEndpoints() {
  try {
    // 1. Login as a doctor
    console.log('\nTesting Doctor Login...');
    const loginResponse = await fetch(`${BASE_URL}/auth/doctor-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'doctor@test.com',
        password: 'doctor123'
      })
    });
    const loginData = await loginResponse.json();
    authToken = loginData.access_token;
    console.log('Login Response:', loginData);

    // 2. Request a test
    console.log('\nTesting Request Test...');
    const form = new FormData();
    form.append('consultation_id', 'test-consultation-123');
    form.append('test_name', 'Blood Test');
    form.append('instructions', 'Please fast for 12 hours before the test');

    const requestTestResponse = await fetch(`${BASE_URL}/lab-tests/request_test`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: form
    });
    console.log('Request Test Response:', await requestTestResponse.json());

    // 3. Upload test result
    console.log('\nTesting Upload Test Result...');
    const uploadForm = new FormData();
    uploadForm.append('consultation_id', 'test-consultation-123');
    // Create a test file
    const testFilePath = path.join(__dirname, 'test-result.pdf');
    fs.writeFileSync(testFilePath, 'Test result content');
    uploadForm.append('file', fs.createReadStream(testFilePath));

    const uploadResponse = await fetch(`${BASE_URL}/lab-tests/upload_test_result`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: uploadForm
    });
    console.log('Upload Test Result Response:', await uploadResponse.json());
    fs.unlinkSync(testFilePath); // Clean up test file

    // 4. View test results
    console.log('\nTesting View Test Results...');
    const viewResponse = await fetch(
      `${BASE_URL}/lab-tests/view_test_results/test-consultation-123`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    console.log('View Test Results Response:', await viewResponse.json());

    // 5. View all test results
    console.log('\nTesting View All Test Results...');
    const viewAllResponse = await fetch(
      `${BASE_URL}/lab-tests/view_all_test_results`,
      {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
    );
    console.log('View All Test Results Response:', await viewAllResponse.json());

    // 6. Test payment endpoints
    console.log('\nTesting Make Payment...');
    const paymentResponse = await fetch(`${BASE_URL}/payments/make_payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        doctor_id: 'test-doctor-123'
      })
    });
    console.log('Make Payment Response:', await paymentResponse.json());

  } catch (error) {
    console.error('Test Error:', error);
  }
}

testLabEndpoints();
