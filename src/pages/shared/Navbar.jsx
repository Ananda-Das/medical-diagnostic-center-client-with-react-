import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLink = (
    <>
      <li className="capitalize font-medium text-[#0F2239] text-base">
        <NavLink
          className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "text-[rgb(13,110,253)] underline font-bold" : "")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="capitalize font-medium text-[#0F2239] text-base">
        <NavLink
          className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "text-[rgb(13,110,253)] underline font-bold" : "")}
          to="/"
        >
          About
        </NavLink>
      </li>
      <li className="capitalize font-medium text-[#0F2239] text-base">
        <NavLink
          className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "text-[rgb(13,110,253)] underline font-bold" : "")}
          to="/allTest"
        >
          All Test
        </NavLink>
      </li>
      {/* check admin or not */}
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome">Dashboard</Link>
        </li>
      )}
      {
        user && !isAdmin && 
        <li>
        <Link to="/dashboard/userHome">Dashboard</Link>
      </li>
      }
      {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            Log Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">
              <a>Log In</a>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLink}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex navbar-end">
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
};

export default Navbar;
