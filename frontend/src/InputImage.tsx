import { useState } from "react";
import { FirebaseUpload } from "./hooks/firebase";

function InputImage() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    async function useUploadImage() {
        if (!imageUpload) {
            console.log("Image is null");
            return;
        }

        console.log("Uploading image:", imageUpload);
        
        // Call FirebaseUpload and wait for the URL
        const url = await FirebaseUpload(imageUpload);
        
        if (url) {
            console.log("Image URL:", url);
        } else {
            console.log("Failed to upload image");
        }
    }

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setImageUpload(e.target?.files?.[0] || null)}
            />
            <button className="p-3 bg-blue-300 rounded-md" onClick={useUploadImage}>
                Upload Image
            </button>
        </div>
    );
}

export default InputImage;
