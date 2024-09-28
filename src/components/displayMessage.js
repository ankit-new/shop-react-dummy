
import { Link } from 'react-router-dom';

const DisplayMessage = ({ message, redirectPath }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">{message}</h2>
      <Link to={redirectPath} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Go to Login
      </Link>
    </div>
  );
};

export default DisplayMessage;
