import { FaBookmark, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { CgProfile } from "react-icons/cg";
import { LuTestTube2 } from "react-icons/lu";
import { GiHypodermicTest } from "react-icons/gi";
import { GiVerticalBanner } from "react-icons/gi";
import { IoAddCircleSharp } from "react-icons/io5";

const Dashboard = () => {
  //TODO: get is Admin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-green-500">
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
                  <IoAddCircleSharp></IoAddCircleSharp> Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanners">
                  <GiVerticalBanner></GiVerticalBanner> All Banners
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add/test">
                  <IoAddCircleSharp></IoAddCircleSharp> Add Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allTest">
                  <FaList></FaList> All test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers> All users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allbookings">
                  <FaBookmark></FaBookmark> All Bookings
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
                <NavLink to="/dashboard/testResult">
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
            <NavLink to="/allTest">
              <GiHypodermicTest></GiHypodermicTest> All Test
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
