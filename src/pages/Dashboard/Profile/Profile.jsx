import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const userEmail = user.email;

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  console.log(userEmail);

  console.log(users);

  const singleUserDetails = users.find((users) => users.email === userEmail);

  console.log(singleUserDetails);

  const { name, email, bloodgrp, district, upazila, role, status } = singleUserDetails;

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
                <td>{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
        <button className="btn btn-warning">Update Info</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
