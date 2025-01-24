import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export async function FirebaseUpload(imageblob: File): Promise<string | null> {
    if (!imageblob) {
        console.error("No image provided");
        return null;
    }

    // Generate a unique file name
    const fileName = imageblob instanceof File ? imageblob.name : "blob";
    const uniqueFileName = `${fileName}-${v4()}`;
    const imageRef = ref(storage, `cropsell/${uniqueFileName}/`);

    try {
        // Upload the image blob to Firebase Storage
        await uploadBytes(imageRef, imageblob);
        console.log("Image uploaded successfully!");

        // Get the download URL for the uploaded file
        const url = await getDownloadURL(imageRef);
        console.log("Download URL:", url);
        return url; // Return the download URL
    } catch (error) {
        console.error("Error uploading file:", error);
        return null; // Handle errors gracefully
    }
}
