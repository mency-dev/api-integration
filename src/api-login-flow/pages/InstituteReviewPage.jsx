import { useParams } from "react-router-dom";
import InstituteReview from "./InstituteReview";

export default function InstituteReviewPage() {
  const { id } = useParams(); 
  return <InstituteReview instituteId={id} />;
}
