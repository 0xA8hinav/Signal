import { db } from './db/index.js';
import { trackers } from './db/schema.js';
import { eq } from 'drizzle-orm';

async function resetMonitors() {
  try {
    const result = await db.update(trackers)
      .set({ status: 'active' })
      .where(eq(trackers.status, 'error'))
      .returning();
      
    console.log(`Reset ${result.length} monitors from 'error' to 'active'.`);
  } catch (err) {
    console.error('Failed to reset monitors:', err);
  } finally {
    process.exit(0);
  }
}

resetMonitors();
