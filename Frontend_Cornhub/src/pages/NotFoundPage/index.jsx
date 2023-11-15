import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://cdn.dribbble.com/users/7813810/screenshots/18154037/media/07fdbbd1e6c3e7440bc45a6b2477219d.gif"
        alt="404 Not Found"
        style={{ width: "300px" }}
      />
      <h2 className="mb-2 text-4xl text-center">
        Oops! Page Not Found
      </h2>
      <p className="mb-2 text-base text-center">
        The page you are looking for does not exist.
      </p>
      <Button
        label="Go back to home"
        onClick={() => navigate("/")}
        size="large"
        type="submit"
        className="mt-5"
      />
    </div>
  );
}

export default NotFoundPage;