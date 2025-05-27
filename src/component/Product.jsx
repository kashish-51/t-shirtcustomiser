import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import StyleDropdown from "./StyleDropdown";
import Menu from "./Menu";

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
    <div className="min-h-screen bg-white text-black font-sans space-y-6 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Section: Dropzone and Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="md:col-span-2 border-2 border-dashed border-gray-400 rounded p-8 text-center cursor-pointer h-full bg-white shadow flex items-center justify-center min-h-[200px]"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the image here...</p>
            ) : (
              <p className="text-gray-600">Drag & drop an image here, or click to select</p>
            )}
          </div>

          {/* Inputs */}
          <div className="p-4 rounded space-y-4">
<div className="w-[var(--width)] max-w-[90vw] mb-4">
  <label className="block font-semibold mb-1">Height</label>
  <input
    type="number"
    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-transparent"
    value={height}
    onChange={(e) => setHeight(e.target.value)}
    placeholder="e.g. 180cm"
    min="0"
    step="1"
  />
</div>

<div className="w-[var(--width)] max-w-[90vw] mb-4">
  <label className="block font-semibold mb-1">Weight</label>
  <input
    type="number"
    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-transparent"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    placeholder="e.g. 80kg"
    min="0"
    step="1"
  />
</div>



            <div>
              <label className="block font-semibold mb-1">Build</label>
              {/* Assuming StyleDropdown handles full width internally; otherwise wrap with w-full */}
              <StyleDropdown layout={0} />
            </div>
          </div>
        </div>

        {/* Product Selector */}
        <div>
          <label className="block font-semibold mb-2">Select Product</label>
          <Menu />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <img
                src={image}
                alt="Large preview"
                className="w-full rounded shadow max-h-[400px] object-contain"
              />
            </div>

            <div className="relative w-full max-w-xs mx-auto">
              <img
                src={`/products/${productType}.png`}
                alt={productType}
                className="w-full object-contain"
              />
              <img
                src={image}
                alt="Small preview"
                className="absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 object-contain rounded-full border-2 border-white shadow"
              />
            </div>
          </div>
        )}

        {/* Text Area */}
        <textarea
          className="w-full border border-gray-300 rounded p-3 h-32 resize-none bg-white shadow"
          maxLength={200}
          placeholder="Type text to print (max 3 lines)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
