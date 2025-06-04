import {promises as fs} from 'fs';
import path from 'path';

export async function GET(){
    try{
        const journeyDir = path.join(process.cwd(),'public','journeys');
       
        const files = await fs.readdir(journeyDir);
        
        const jsonFiles = files.filter((file)=> file.endsWith('.json'));

        return new Response(JSON.stringify(jsonFiles),{
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