import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import { useUser } from "../context/UserContext";

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [institutes, setInstitutes] = useState([]);
  const { setUser } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/home/login");
      return;
    }

    const id = 56;
    apiFetch(`institutes/filter?institute_type_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstitutes(data.institutes);
        setUser(data.user)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  function handleClick(id) {
    navigate(`/home/institute/${id}`);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {institutes.map((institute) => (
          <div
            key={institute.id}
            className="rounded-lg p-4 bg-white border-1 border-gray-200 hover:shadow-2xl transition"
            onClick={() => handleClick(institute.id)}
          >
            <h2 className="font-bold text-lg mb-2">{institute.name}</h2>
            <div className="flex justify-center items-center gap-1">
              <FaLocationDot className="text-[14px] mt-1" />
              <p className="text-sm mt-1">{institute.address?.city}</p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <FaStar className="text-[14px] text-yellow-400 mt-1" />
              <p className="text-sm mt-1">
                {institute.is_show_review?.Avg_rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
