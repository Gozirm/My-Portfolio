import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    path: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/");
    }
  }, [history]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    if (type === "file") {
      const file = files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("description", formData.description);
    dataToSend.append("image", formData.image);
    dataToSend.append("path", formData.path);

    try {
      const response = await axios.post(
        "https://my-portfolio-vvxz.onrender.com//api/create-project/create",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project created:", response.data.project);
      setFormData({ name: "", description: "", image: null, path: "" });
      setImagePreview(null);
      history("/project");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen main">
        <h1 className="text-white uppercase text-3xl text-center mb-8">
          Create Projects
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full max-w-md p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4 w-full">
            <label className="block text-white mb-1">Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-600 bg-transparent outline-none text-white"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-white mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              
              rows="2" // Limit to 2 lines
              style={{ resize: "vertical" }} // Allow vertical resizing only
              className="w-full p-2 rounded border border-gray-600 bg-transparent outline-none text-white"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-white mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-600 bg-transparent outline-none text-white"
            />
          </div>
          {imagePreview && (
            <div className="mb-4 w-52">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded border border-gray-600"
              />
            </div>
          )}
          <div className="mb-4 w-full">
            <label className="block text-white mb-1">Project Path</label>
            <input
              type="text"
              name="path"
              value={formData.path}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-transparent outline-none text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"
            } transition duration-300 ease-in-out transform hover:scale-105 text-white font-bold py-2 rounded`}
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </form>
      </main>
    </>
  );
};

export default Admin;
