'use client';
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

export default function ImageUploadForm({selectedTheme}){
    const [slides,setSlides] = useState([]);

    const handleImageChange=(e,index) => {
        const file = e.target.files[0];
        const newSlides = [...slides];
        newSlides[index] = {...newSlides[index],file};
        setSlides(newSlides);
    };

    const handleDescChange= (e,index)=>{
        const newSlides = [...slides];
        newSlides[index]= {...newSlides[index],description:e.target.value};
        setSlides(newSlides);
    }
    const handleAddSlide= ()=>{
        if(slides.length < 30) setSlides([...slides, { file: null, description: '' }]);

    };
    const handleSubmit = async()=>{
        const journeyId= uuidv4();
        const journeyData={
            id:journeyId,
            theme:selectedTheme,
            slides:slides.map(({ file, description }) => ({
        filename: file.name, // You’ll save this properly with actual file upload
        description,
      })),
        };
        localStorage.setItem(journeyId,JSON.stringify(journeyData));
            alert(`Journey created! Shareable link: /view-journey/${journeyId}`);

    };

return (
    <div className="flex flex-col gap-4 items-center">
        {slides.map((slide,i) => (
<div key={i} className="flex gap-2 items-center">
    <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e,i)} />
    <textarea
            placeholder="Enter caption..."
            value={slide.description}
            onChange={(e) => handleDescChange(e, i)}
            className="p-2 border rounded"
          />
  </div>
       
       ))}
    </div>
  
);
}