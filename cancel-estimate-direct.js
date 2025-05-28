// Direct database cancellation script
// Run this to manually cancel estimate ID 1 and its associated booking

import { Pool } from '@neondatabase/serverless';

async function cancelEstimateDirectly() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('🗑️ Direct cancellation starting...');
    
    // Get estimate details first
    const estimateResult = await pool.query('SELECT * FROM estimates WHERE id = $1', [1]);
    if (estimateResult.rows.length === 0) {
      console.log('❌ Estimate not found');
      return;
    }
    
    const estimate = estimateResult.rows[0];
    console.log('📋 Found estimate:', estimate);
    
    // Delete the estimate
    await pool.query('DELETE FROM estimates WHERE id = $1', [1]);
    console.log('✅ Deleted estimate');
    
    // Delete associated booking if it exists
    if (estimate.booking_id) {
      await pool.query('DELETE FROM bookings WHERE id = $1', [estimate.booking_id]);
      console.log('✅ Deleted booking', estimate.booking_id);
    }
    
    // Verify deletion
    const checkEstimate = await pool.query('SELECT * FROM estimates WHERE id = $1', [1]);
    const checkBooking = estimate.booking_id ? 
      await pool.query('SELECT * FROM bookings WHERE id = $1', [estimate.booking_id]) : 
      { rows: [] };
    
    console.log('🔍 Verification:');
    console.log('Estimate exists:', checkEstimate.rows.length > 0);
    console.log('Booking exists:', checkBooking.rows.length > 0);
    
    if (checkEstimate.rows.length === 0 && checkBooking.rows.length === 0) {
      console.log('🎉 SUCCESS: Estimate and booking completely removed!');
    } else {
      console.log('❌ FAILED: Some records still exist');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

cancelEstimateDirectly();