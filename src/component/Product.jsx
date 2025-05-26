import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import StyleDropdown from "./StyleDropdown";

const PRODUCTS = ["tshirt", "hoodie", "sleevie", "cap"];
const BUILDS = ["lean", "reg", "athletic", "big"];

export default function Product() {
  const [productType, setProductType] = useState("tshirt");
  const [image, setImage] = useState(null);
  const [height, setHeight] = useState("180cm");
  const [weight, setWeight] = useState("80kg");
  const [build, setBuild] = useState("athletic");
  const [text, setText] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

return (
  <div className="max-w-5xl mx-auto p-4 font-sans space-y-6">
    
    {/* Top Section: Dropzone and Form Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 rounded p-8 text-center cursor-pointer h-full"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select</p>
        )}
      </div>

      {/* Height, Weight, Build Dropdown */}
      <div>
        <label className="block font-semibold mb-1">Height</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label className="block font-semibold mb-1">Weight</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <label className="block font-semibold mb-1">Build</label>
        <StyleDropdown />
      </div>
    </div>

    {/* Select Product Buttons - Full Width */}
    <div>
      <label className="block font-semibold mb-2">Select Product</label>
      <div className="flex flex-wrap gap-2">
        {PRODUCTS.map((item) => (
          <button
            key={item}
            onClick={() => setProductType(item)}
            className={`
              px-4 py-2 rounded 
              hover:bg-blue-100
              transition-colors duration-200
              relative
              ${productType === item
                ? "bg-white  border-gray-800 text-gray-900"
                : "bg-white  border-gray-300 text-gray-700"
              }
            `}
          >
            {item}
            {productType === item && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded" />
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Image Preview Section */}
    {image && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Uploaded Image */}
        <div>
          <img
            src={image}
            alt="Large preview"
            className="w-full rounded shadow"
          />
        </div>

        {/* Product Overlay Preview */}
        <div className="relative w-full max-w-xs mx-auto">
          <img
            src={`/products/${productType}.png`}
            alt={productType}
            className="w-full object-contain"
          />
          <img
            src={image}
            alt="Small preview"
            className="absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>
    )}

    {/* Text Area */}
    <textarea
      className="w-full border border-gray-300 rounded p-3 h-32 resize-none"
      rows={3}
      maxLength={200}
      placeholder="Type text to print (max 3 lines)"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  </div>
);


} 