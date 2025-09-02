import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-around items-center h-12 bg-gray-200">
      <Link to="/" className="text-blue-600 font-medium">Home</Link>
      <Link to="/login" className="text-blue-600 font-medium">Login</Link>
      <Link to="/profile" className="text-blue-600 font-medium">Profile</Link>
    </nav>
  );
}
