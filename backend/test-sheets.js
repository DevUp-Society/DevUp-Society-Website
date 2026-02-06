import { initializeSpreadsheet, isConfigured } from './googleSheets.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Google Sheets Configuration...\n');

console.log('Environment Variables:');
console.log('- SPREADSHEET_ID:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID ? '✓ Set' : '✗ Missing');
console.log('- SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✓ Set' : '✗ Missing');
console.log('- PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? '✓ Set' : '✗ Missing');
console.log();

console.log('Google Sheets Client:', isConfigured() ? '✓ Configured' : '✗ Not Configured');
console.log();

if (isConfigured()) {
  console.log('Initializing spreadsheet headers...');
  initializeSpreadsheet()
    .then(result => {
      if (result.success) {
        console.log('✓ Spreadsheet headers initialized successfully!');
        console.log('\nYou can now:');
        console.log('1. Register a new team to test auto-sync');
        console.log('2. Use the "Sync to Sheets" button in admin panel');
      } else {
        console.error('✗ Failed to initialize spreadsheet:', result.error);
      }
      process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
      console.error('✗ Error:', err.message);
      process.exit(1);
    });
} else {
  console.log('Cannot test - Google Sheets not configured');
  process.exit(1);
}
