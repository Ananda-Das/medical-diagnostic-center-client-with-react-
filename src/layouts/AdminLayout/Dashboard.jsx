import { FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { CgProfile } from "react-icons/cg";
import { LuTestTube2 } from "react-icons/lu";

const Dashboard = () => {
  //TODO: get is Admin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addBanners">
                  <FaUtensils></FaUtensils> Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanners">
                  <FaUtensils></FaUtensils> All Banners
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allTest">
                  <FaList></FaList> All test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add/test">
                  <FaBook></FaBook> Add Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers> All users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <CgProfile></CgProfile> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/appointments">
                  <FaList></FaList>My Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <LuTestTube2></LuTestTube2> Test Result
                </NavLink>
              </li>
            </>
          )}
          {/* shared Nav Link */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              <FaSearch></FaSearch> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
