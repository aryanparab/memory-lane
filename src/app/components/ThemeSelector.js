import {themes} from '@/data/themes';

export default function ThemeSelector({selected, setSelected}){

    return (
        <div className='flex justify-center gap-4 my-4'>
            {Object.keys(themes).map(theme=>(
                <button 
                key={theme}
                className={`px-4 py-2 rounded-full border ${selected === theme ? 'bg-black text-white' : 'bg-white'}`}
                onClick={()=>setSelected(theme)}
                >
                    {theme}
                </button>
            ))}
        </div>
    )
}