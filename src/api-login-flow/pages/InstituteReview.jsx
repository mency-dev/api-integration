import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../api/api";

export default function InstituteReview({ instituteId }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const bottomRef = useRef(null);
  console.log(instituteId);
  const [loadedPages, setLoadedPages] = useState(new Set());
  const isFetchingRef = useRef(false);

  const fetchReviews = async (pageNumber) => {
    if (
      isFetchingRef.current ||
      pageNumber > lastPage ||
      loadedPages.has(pageNumber)
    )
      return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const res = await apiFetch(
        `institute-reviews?id=${instituteId}&page=${pageNumber}&limit=6`,
      );
      const data = await res.json();

      const reviewData = data.data?.reviews;

      setReviews((prev) => [...prev, ...(reviewData?.data || [])]);
      setLastPage(reviewData?.last_page || 1);
      setLoadedPages((prev) => new Set(prev).add(pageNumber));
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < lastPage) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [page, lastPage]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Reviews</h3>

      <div className="">
        {reviews.map((rev, index) => (
          <div
            key={rev.id || index}
            className="rounded-lg p-4 bg-white border border-gray-200 hover:shadow-xl transition"
          >
            <p className="font-bold">
              {rev.name} {rev.role && `(${rev.role})`}
            </p>
            <p className="text-sm mt-2">Review: {rev.description}</p>
            <p className="mt-1">⭐ {rev.rating}</p>
          </div>
        ))}
      </div>

      <div ref={bottomRef} className="h-10" />

      {loading && (
        <p className="text-center mt-4 text-gray-500">
          Loading more reviews...
        </p>
      )}

      {page === lastPage && !loading && (
        <p className="text-center mt-4 text-gray-400">No more reviews</p>
      )}
    </div>
  );
}
