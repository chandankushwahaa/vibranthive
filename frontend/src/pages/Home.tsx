import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Join Our Community for Free</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-md">
        <Link to="/signup" className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <button type="button" className="w-full bg-white text-sm text-gray-600 p-3 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            Sign Up
          </button>
        </Link>
        <Link to="/signin" className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-2">
          <button type="button" className="w-full bg-white text-sm text-gray-600 p-3 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            Sign In
          </button>
        </Link>
      </div>
      <p className="mt-8 text-gray-600 text-center">Please sign up to access our blogs.</p>
      <Link to="/blogs" className="mt-4">
        <button type="button" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300">
          View Blogs
        </button>
      </Link>
    </div>
  );
};

export default Home;
