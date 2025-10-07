import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="flex gap-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      {/* TODO: Add landing page content */}
    </div>
  );
};

export default Home;