import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";

export default function Institute() {
  const { register, handleSubmit, getValues, reset } = useForm();
  const { id } = useParams();
  const [instituteDetails, setInstituteDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [openReview, setOpenReview] = useState(false);
  const [reviews, setReviews] = useState({ data: [] });
  const { user } = useUser();

  const tabs = [
    "Overview",
    "Courses & fees",
    "Admission",
    "Placement",
    "Review",
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    apiFetch(`institute/details?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstituteDetails(data);
        fetchReview();
      });
  }, []);

  function fetchReview() {
    apiFetch(`institute-reviews?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data?.reviews);
        setReviews(data.data?.reviews);
      });
  }

  function onSubmit(data) {
    const { name, rating, review } = data;
    const token = localStorage.getItem("token");
    apiFetch("institutes/52/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        description: review,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  const institute = instituteDetails.data?.institute;
  const address = instituteDetails.data?.address;
  return (
    <>
      <div>
        <div className="text-start p-10">
          <h1 className="text-4xl font-bold py-5">
            {institute?.institute_name?.en}
          </h1>
          <div className="flex items-center gap-10 pb-5">
            <div className="flex items-center gap-2">
              <CiLocationOn />
              <h1>
                {address?.city}, {address?.district}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className=" text-yellow-400" />
              <h1>{institute?.avg_rating?.average_rating}</h1>
            </div>
          </div>
          <div className="flex gap-3">
            {instituteDetails.data?.courses?.map((course) => (
              <div key={course.id} className="px-4 py-1 bg-gray-200">
                {course.course_name}
              </div>
            ))}
          </div>
          <div className="flex gap-6 py-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium transition
            ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            {activeTab === "Overview" && (
              <div>
                {instituteDetails.data?.overviews?.map((overview) => (
                  <div key={overview.id}>{overview?.value?.en}</div>
                ))}
              </div>
            )}
          </div>
          <div>
            {activeTab === "Review" && (
              <div className="text-center py-20">
                <button
                  className="bg-orange-500 rounded-full text-white py-2 px-7"
                  onClick={() => setOpenReview(true)}
                >
                  Write a Review
                </button>
                {openReview && (
                  <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
                      <button
                        onClick={() => setOpenReview(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                      >
                        ✕
                      </button>

                      <h2 className="text-xl font-bold mb-4">
                        Add Your Review
                      </h2>
                      <div className="text-start">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <p>Name</p>
                          <input
                            type="text"
                            {...register("name")}
                            className="border border-gray-300 w-full py-2 mb-3"
                            defaultValue={user?.full_name}
                          />
                          <p>Rating</p>
                          <input
                            type="text"
                            {...register("rating")}
                            className="border border-gray-300 w-full py-2 mb-3"
                          />
                          <p>Description</p>
                          <textarea
                            {...register("review", { required: true })}
                            className="w-full border rounded p-2"
                            rows={4}
                            placeholder="Write your review..."
                          />

                          <button
                            className="w-full bg-blue-600 text-white py-2 rounded"
                            type="submit"
                          >
                            Submit Review
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3>Reviews</h3>
                  <div className="grid grid-cols-3 gap-5">
                    {reviews.data.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-lg p-4 bg-white border-1 border-gray-200 hover:shadow-2xl transition"
                      >
                        <p className="font-bold">
                          {rev.name} ({rev.role})
                        </p>
                        <p>Review:{rev.description}</p>
                        <p>Rating: {rev.rating}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
