import { useState } from "react";
import InputImage from "../../InputImage";
import MySellComponent from "./mySellComponent";
import axios from "axios";

const SellComp: React.FC = () => {
  const [productName, setProductName] = useState<string | null>(null);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productMin, setProductMin] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  

  const handleSubmitSell = async () => {
    // Validate fields
    if (!productName) {
      alert("Please provide a product name.");
      return;
    }
    if (!productPrice || productPrice <= 0) {
      alert("Please provide a valid product price.");
      return;
    }
    if (!productMin || productMin <= 0) {
      alert("Please provide a valid minimum order quantity.");
      return;
    }
    if (imageUrl == "") {
      alert("Please upload an image.");
      return;
    }

    // Handle database operation (e.g., API call to add item)
    console.log("Adding to database:", {
      productName,
      productPrice,
      productMin,
      imageUrl,
    });
    const dataproduct = {
        name : productName,
        min_order : productMin,
        price : productPrice ,
        Image : imageUrl,
    }
    const dataresponse = await axios.post("http://localhost:3000/api/v1/marketplace/product" , dataproduct)
    console.log(dataresponse , "helaaae")
    // Reset form (optional)
    setProductName(null);
    setProductPrice(null);
    setProductMin(null);
    setImageUrl("");
  };

  return (
    <>
      <h1 className="text-3xl p-10">SELL</h1>
      <div className="flex flex-col gap-3">
        {/* Product Name Input */}
        <input
          className="bg-slate-200 p-3"
          value={productName ?? ""}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product name"
        />

        {/* Product Price Input */}
        <input
          className="bg-slate-200 p-3"
          value={productPrice ?? ""}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          type="number"
          min={1}
          placeholder="Price"
        />

        {/* Minimum Order Input */}
        <input
          className="bg-slate-200 p-3"
          value={productMin ?? ""}
          onChange={(e) => setProductMin(Number(e.target.value))}
          type="number"
          min={1}
          placeholder="Min order"
        />

        {/* Image Upload */}
        <InputImage setImageUrl={setImageUrl} />

        {/* Submit Button */}
        <button
          onClick={handleSubmitSell}
          className="bg-blue-300 rounded-xl mt-3 p-3"
        >
          Add Item
        </button>
      </div>
      <MySellComponent/>  
    </>
  );
};

export default SellComp;
