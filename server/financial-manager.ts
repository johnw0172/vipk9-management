import { db } from "./db";
import { estimates, invoices, bookings } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export class FinancialManager {
  /**
   * Completely remove a booking and all associated financial records
   */
  async cancelBookingCompletely(bookingId: number): Promise<boolean> {
    console.log(`💰 FinancialManager: Starting complete cancellation for booking ${bookingId}`);
    
    try {
      // Step 1: Find and delete all estimates for this booking
      const relatedEstimates = await db
        .select()
        .from(estimates)
        .where(eq(estimates.bookingId, bookingId));
      
      console.log(`💰 Found ${relatedEstimates.length} estimates to delete`);
      
      for (const estimate of relatedEstimates) {
        await db.delete(estimates).where(eq(estimates.id, estimate.id));
        console.log(`💰 Deleted estimate ${estimate.id}`);
      }
      
      // Step 2: Find and delete all invoices for this booking
      const relatedInvoices = await db
        .select()
        .from(invoices)
        .where(eq(invoices.bookingId, bookingId));
      
      console.log(`💰 Found ${relatedInvoices.length} invoices to delete`);
      
      for (const invoice of relatedInvoices) {
        await db.delete(invoices).where(eq(invoices.id, invoice.id));
        console.log(`💰 Deleted invoice ${invoice.id}`);
      }
      
      // Step 3: Delete the booking itself
      const bookingResult = await db.delete(bookings).where(eq(bookings.id, bookingId));
      console.log(`💰 Deleted booking ${bookingId}:`, bookingResult);
      
      // Step 4: Verify everything is gone
      const remainingEstimates = await db
        .select()
        .from(estimates)
        .where(eq(estimates.bookingId, bookingId));
      
      const remainingInvoices = await db
        .select()
        .from(invoices)
        .where(eq(invoices.bookingId, bookingId));
      
      const remainingBooking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, bookingId));
      
      const success = remainingEstimates.length === 0 && 
                     remainingInvoices.length === 0 && 
                     remainingBooking.length === 0;
      
      console.log(`💰 Cancellation complete. Success: ${success}`);
      console.log(`💰 Remaining estimates: ${remainingEstimates.length}`);
      console.log(`💰 Remaining invoices: ${remainingInvoices.length}`);
      console.log(`💰 Remaining booking: ${remainingBooking.length}`);
      
      return success;
      
    } catch (error) {
      console.error(`💰 Error during cancellation:`, error);
      return false;
    }
  }
  
  /**
   * Delete a single estimate and clean up orphaned data
   */
  async deleteEstimate(estimateId: number): Promise<boolean> {
    console.log(`💰 FinancialManager: Deleting estimate ${estimateId}`);
    
    try {
      // Get the estimate details first
      const [estimate] = await db
        .select()
        .from(estimates)
        .where(eq(estimates.id, estimateId));
      
      if (!estimate) {
        console.log(`💰 Estimate ${estimateId} not found`);
        return false;
      }
      
      // Delete the estimate
      await db.delete(estimates).where(eq(estimates.id, estimateId));
      
      // If this estimate had a booking, delete the booking too
      if (estimate.bookingId) {
        await this.cancelBookingCompletely(estimate.bookingId);
      }
      
      // Verify deletion
      const [remaining] = await db
        .select()
        .from(estimates)
        .where(eq(estimates.id, estimateId));
      
      const success = !remaining;
      console.log(`💰 Estimate deletion success: ${success}`);
      
      return success;
      
    } catch (error) {
      console.error(`💰 Error deleting estimate:`, error);
      return false;
    }
  }
}

export const financialManager = new FinancialManager();