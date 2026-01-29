import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate
    ();
  const [params] = useSearchParams();
  const typeId = params.get("type");

  const [loading, setLoading] = useState(true);
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/home/login");
      return;
    }

    apiFetch("auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => {
        return apiFetch(
          `institutes/filter?institute_type_id=${typeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => res.json())
      .then((data) => {
        setInstitutes(data);
        setLoading(false);
        navigate(" institute-reviews?id=95")
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/home/login");
      });
  }, [typeId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Institutions</h1>
      {institutes.map((inst) => (
        <div key={inst.id}>{inst.name}</div>
      ))}
    </div>

  );
}
