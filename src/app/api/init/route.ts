import { NextResponse } from 'next/server';
import { initializeLabs } from '@/lib/services';

export async function POST() {
  try {
    // Initialize labs data
    await initializeLabs();
    
    return NextResponse.json({ 
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
