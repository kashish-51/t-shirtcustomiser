import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';

const themes = [
  {
    name: "Red Blaze",
    classes: {
      container: " bg-radial from-red-50 from-40% to-red-200 text-white font-sans min-h-screen p-6",
      input:
        "bg-white border border-red-600 text-red-900 rounded-md p-2 shadow-lg focus:ring-2 focus:ring-red-400",
      label: "text-red-400 font-semibold",
      button:
        "bg-linear-to-t from-red-900 to-red-500 hover:from-red-700 hover:to-red-500 text-white font-bold px-5 py-2 rounded shadow-lg transition",
    },
  },
  {
    name: "Classic Noir",
    classes: {
      container: "bg-white text-white font-serif min-h-screen p-6",
      input:
        "bg-white border border-gray-300 text-black rounded-md p-2 shadow-inner focus:ring-2 focus:ring-red-700",
      label: "text-black  font-semibold",
      button:
        " bg-radial-[at_50%_75%] from-black-200 via-red-400 to-red-900 to-90% bg-red-900 text-white font-semibold px-5 py-2 rounded shadow-md transition",
    },
  },
  {
    name: "Clean White Contrast",
    classes: {
      container: "bg-white text-black font-sans min-h-screen p-6",
      input:
        "border border-red-800 bg-white text-red-900 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-red-600",
      label: "text-red-900  font-semibold",
      button:
        "bg-radial-[at_25%_25%] from-red-300 to-red-800 to-75%  text-white font-bold px-5 py-2 rounded shadow-lg transition",
    },
  },
];

const productTypes = ["T-shirt", "Hoodie", "Sleeve", "Cap"];

export default function TshirtCustomizerApp() {
  const [image, setImage] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [productType, setProductType] = useState("T-shirt");
  const builds = ["Lean", "Regular", "Athletic", "Big"];
const [selectedBuild, setSelectedBuild] = useState("Athletic");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      height: "180",
      weight: "80",
      build: "athletic",
      tshirtText: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted:", { ...data, image, productType });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === "q") {
        setThemeIndex((prev) => (prev + 1) % themes.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const currentTheme = themes[themeIndex];

  // Determine layout direction based on theme
  // Classic Noir: image on right => flex-row-reverse
  // Others: image on left => flex-row
  const flexDirectionClass =
    currentTheme.name === "Classic Noir" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div
      className={`${currentTheme.classes.container} transition-colors duration-300`}
      aria-live="polite"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col ${flexDirectionClass} items-start justify-center gap-10`}
      >
        {/* Left or Right Column: Image Upload */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="mb-4 w-full flex justify-center">
            {/* Big Preview Image */}
            <img
              src={
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3L0sNNa9PE2r7icSRoPNTSito1MSV1eqx5w&s"
              }
              alt="Large Preview"
              className="object-cover"
              style={{
                width: "300px",
                height: "400px",
                borderRadius: "12px",
                border: "4px solid",
                borderColor:
                  themeIndex === 0
                    ? "#f87171" // red-400 for Red Blaze
                    : themeIndex === 1
                    ? "#dc2626" // red-600 for Classic Noir
                    : "#000000", // black for Clean White Contrast
              }}
            />
          </div>

          {/* Upload Area */}
          <div
            className={`w-full border-2 border-dashed p-4 text-center cursor-pointer ${currentTheme.classes.input}`}
          >
            {image ? (
              <img
                src={image}
                alt="Small Preview"
                className="h-24 mx-auto mb-2 object-contain"
              />
            ) : (
              <>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3L0sNNa9PE2r7icSRoPNTSito1MSV1eqx5w&s"
                  alt="T-Shirt Icon"
                  className="object-cover w-10 h-12 mx-auto"
                />
                <p className="mb-2">Drop or Select Image</p>
              </>
            )}
            <label className="cursor-pointer inline-block mt-2 underline">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Product Type Switcher */}
          <div className="mt-4 flex justify-center gap-3 flex-wrap">
            {productTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`px-4 py-2 rounded border-2 font-semibold transition ${
                  productType === type
                    ? "bg-red-600 border-black text-white shadow-lg"
                    : "bg-transparent border-gray-500 text-gray-400 hover:border-red-600 hover:text-red-600"
                }`}
                onClick={() => setProductType(type)}
                aria-pressed={productType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Right or Left Column: Inputs */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>
              Height (cm)
            </label>
            <input
              {...register("height", { required: true })}
              className={`w-full p-2 border ${currentTheme.classes.input}`}
              type="number"
              aria-invalid={errors.height ? "true" : "false"}
            />
          </div>

          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>
              Weight (kg)
            </label>
            <input
              {...register("weight", { required: true })}
              className={`w-full p-2 border ${currentTheme.classes.input}`}
              type="number"
              aria-invalid={errors.weight ? "true" : "false"}
            />
          </div>

          <div>
            
          <div>
  <label className={`block mb-1 ${currentTheme.classes.label}`}>
    Build
  </label>
  <Listbox value={selectedBuild} onChange={setSelectedBuild}>
    <div className="relative mt-1">
      {/* Dropdown Button */}
      <Listbox.Button
        className={`w-full p-2 text-left border rounded-md ${currentTheme.classes.input}`}
      >
        {selectedBuild}
      </Listbox.Button>

      {/* Dropdown Options */}
      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
        {builds.map((build) => (
          <Listbox.Option
            key={build}
            value={build}
            className={({ active }) =>
              `px-4 py-2 cursor-pointer text-left ${
                active ? 'bg-red-100 text-red-800' : 'text-black'
              }`
            }
          >
            {build}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </div>
  </Listbox>
</div>

          </div>

          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>
              T-Shirt Text (max 3 lines)
            </label>
            <textarea
              {...register("tshirtText", {
                maxLength: 200,
                validate: (value) => value.split("\n").length <= 3,
              })}
              rows={3}
              placeholder="Type text here..."
              className={`w-full p-2 border resize-none ${currentTheme.classes.input}`}
              aria-invalid={errors.tshirtText ? "true" : "false"}
            ></textarea>
            {errors.tshirtText && (
              <p className="text-red-500 text-sm mt-1">Max 3 lines allowed</p>
            )}
          </div>

          <button type="submit" className={`mt-4 ${currentTheme.classes.button}`}>
            Print Preview
          </button>
        </div>
      </form>
    </div>
  );
}
