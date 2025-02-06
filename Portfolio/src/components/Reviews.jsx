import React, { useState } from "react";
import { useNavigate } from "react-router";
const Reviews = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://my-portfolio-vvxz.onrender.com/api/create-project/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, review }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setName("");
      setReview("");

      setMessage("Thank you for your review!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage(
        "There was an error submitting your review. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-inherit">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black  p-2 rounded hover:bg-slate-200 w-full"
            >
              Submit Review
            </button>
          </form>
          {message && (
            <div className="toast toast-center toast-middle">
              <div className="alert alert-info">
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
