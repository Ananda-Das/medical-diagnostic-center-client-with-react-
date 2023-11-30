import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: singleUser = {} } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  console.log(singleUser);

  const { name, email, bloodgrp, district, upazila, role, status, _id } = singleUser;

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">{name} Profile</h1>
      <div>
        <div className="overflow-x-auto my-12">
          <table className="table table-zebra">
            {/* head */}

            <tbody>
              {/* row 1 */}
              <tr>
                <th>Name</th>
                <td>{name}</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>Email</th>
                <td>{email}</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>Blood Group</th>
                <td>{bloodgrp}</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>District</th>
                <td>{district}</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>Upazila</th>
                <td>{upazila}</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>Role</th>
                <td>{role}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{status==true ? 'Active': 'Block'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Link to={`/dashboard/updateProfile/${_id}`}>
            <button className="btn btn-warning">Update Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
