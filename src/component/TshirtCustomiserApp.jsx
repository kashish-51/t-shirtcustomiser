import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const themes = [
  {
    name: "Dark Minimal",
    classes: {
      container: "bg-gray-950 text-white font-mono",
      input: "bg-black border-gray-600 text-white rounded-md p-2 border",
      label: "text-gray-400",
      button: "bg-green-600 hover:bg-green-500 text-black px-4 py-2 rounded transition",
    },
  },
  {
    name: "Clean Light",
    classes: {
      container: "bg-white text-black font-sans",
      input: "bg-gray-100 border-gray-300 text-black rounded-none p-2 border border-b-2",
      label: "text-gray-800 font-semibold",
      button: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-blue-600",
    },
  },
  {
    name: "Playful Neon",
    classes: {
      container: "bg-indigo-900 text-yellow-300 font-bold",
      input: "bg-indigo-600 border-yellow-400 text-white rounded-full p-3 border-2 shadow-lg",
      label: "text-yellow-100 text-lg",
      button: "bg-pink-500 hover:bg-pink-400 text-white px-6 py-3 rounded-full animate-pulse",
    },
  },
];

export default function TshirtCustomizerApp() {
  const [image, setImage] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);

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
    console.log("Submitted:", data);
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

  return (
    <div className={`min-h-screen p-6 ${currentTheme.classes.container} transition-colors duration-300`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row items-start justify-center gap-10"
      >
        {/* Left Column: Image Upload */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          {/* Big Image */}
          <div className="mb-4 w-full flex justify-center">
            <img
              src={
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3L0sNNa9PE2r7icSRoPNTSito1MSV1eqx5w&s"
              }
              alt="T-Shirt Preview"
              className="object-cover"
              style={{
                width: "300px",
                height: "500px",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Upload Area */}
          <div className={`w-full border-2 border-dashed p-4 text-center ${currentTheme.classes.input}`}>
            {image ? (
              <img
                src={image}
                alt="Preview Small"
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
            <label className="cursor-pointer inline-block mt-2">
              <span className="underline">Upload Image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Right Column: Form Inputs */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>Height (cm)</label>
            <input
              {...register("height", { required: true })}
              className={`w-full p-2 border ${currentTheme.classes.input}`}
              type="number"
            />
          </div>

          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>Weight (kg)</label>
            <input
              {...register("weight", { required: true })}
              className={`w-full p-2 border ${currentTheme.classes.input}`}
              type="number"
            />
          </div>

          <div>
            <label className={`block mb-1 ${currentTheme.classes.label}`}>Build</label>
            <select
              {...register("build", { required: true })}
              className={`w-full p-2 border ${currentTheme.classes.input}`}
            >
              <option value="lean">Lean</option>
              <option value="reg">Regular</option>
              <option value="athletic">Athletic</option>
              <option value="big">Big</option>
            </select>
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
