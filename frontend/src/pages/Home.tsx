import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Join to Our Community with all time access and free</h1>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
          <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            <Link to={'/signup'}>Sign Up</Link>
          </button>
        </div>
        <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
          <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            <Link to={'/signin'}>Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home