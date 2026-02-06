// Quick test of backend API
const BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('Testing Backend API...\n');
  
  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(BASE_URL);
    const healthData = await healthResponse.json();
    console.log('   ✓ Response:', JSON.stringify(healthData));
    
    // Test get team number
    console.log('\n2. Testing get team number...');
    const teamResponse = await fetch(`${BASE_URL}/api/get-team-number?slug=devthon-2026`);
    const teamData = await teamResponse.json();
    console.log('   ✓ Response:', JSON.stringify(teamData));
    
    console.log('\n✓ Backend is running successfully!');
    console.log('\nNext steps:');
    console.log('1. Test registration form to see auto-sync to Google Sheets');
    console.log('2. Use "Sync to Sheets" button in admin panel for full backup');
    
  } catch (error) {
    console.error('✗ Error testing backend:', error.message);
    process.exit(1);
  }
}

testBackend();
