import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="text-center mt-40">
      <h1 className="text-2xl font-bold mb-7">Oops!!</h1>
      {error.status === 404 && (
        <div>
          <h3 className="text-3xl font-bold mb-7">Page not found</h3>
          <Link to="/">
            <button className="p-4 bg-gray-300 rounded-xl text-xl font-bold">
              Go back
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
