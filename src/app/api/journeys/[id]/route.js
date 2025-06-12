import clientPromise from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request,context) {
  const { id } = await context.params;
  const client = await clientPromise;
  const db = client.db('memorylane');

  const journey = await db
    .collection('journeys')
    .findOne({ id:id });
    if (!journey) return new Response("Not Found", { status: 404 });

    return NextResponse.json(journey);
  } 