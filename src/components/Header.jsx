import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <div className="container ">
        <Link className="navbar-brand text-white" to="/">
          URL Shortener
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav  p-3 ms-auto">
            {user ? (
              <li className="nav-item">
                <button className="btn btn-outline-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item ">
                  <Link className="btn btn-outline-primary mr-2 mx-5 px-4 " to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
