
import { getServerSession } from 'next-auth';
import {authOptions} from "../../auth/[...nextauth]/route";
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const session = await getServerSession(authOptions);
        if (!session) return new Response("Unauthorized", { status: 401 });
        const client = await clientPromise;
        const db = client.db('memorylane');
        const journeys = await db
            .collection('journeys')
            .find({ userId: session.user.email })
            .toArray();
            console.log(journeys);
                return NextResponse.json(journeys,{
            status:200,
            headers:{'Content-type':'application/json'},
        });
   

    }catch(error){
        return new Response(JSON.stringify({ error: 'Failed to read journeys folder' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
    }
}