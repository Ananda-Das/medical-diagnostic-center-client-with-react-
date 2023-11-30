import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaInfoCircle, FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [userInfo, setUserInfo] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
    // console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      //   console.log(res.data);
      if (res.data.modifiedCout > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleUserInfo = (user) => {
    axiosSecure.get(`/single/user/${user._id}`).then((res) => {
      setUserInfo(res.data);
    });
  };

  // const [userStatus, setUserStatus] = useState("Active");


  const handleToggleActive = async (user) => {
    try {

      // Update the isActive status on the server
      await axiosSecure.patch(`/change/user/${user._id}`, {
        status: !user.status,
      });


      // After the update, refetch the data to get the updated state
      refetch();
    } catch (error) {
      console.error("Error toggling isActive:", error);
    }
  };

  // const handleUserStatus = (user) => {
  //   axiosSecure.patch(`/user/toggle/${user._id}/${userStatus}`).then((res) => {
  //       console.log(res.data.status);
  //     //   console.log(res.data.status === 'active' ? 'blocked' : 'active');
  //     //   setUserStatus(res.data.status === 'active' ? 'blocked' : 'active');
  //   //   let prevStatus = res.data.status;
  //   //   setUserStatus(res.data.status=> (res.data.status === "active" ? "blocked" : "active"));

  //       setUserStatus((prevStatus) => (prevStatus === 'Active' ? 'blocked' : 'Active'));
  //     //   setStatus((prevStatus) => (prevStatus === 'Active' ? 'Blocked' : 'Active'));
  //   });
  // };

  //   user.id === userId
  //           ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
  //           : user

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-orange-500">
                      <FaUsers className="text-white text-2xl"></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  {/* <button onClick={() => handleUserStatus(user)}>{userStatus}</button> */}
                  <button className="btn btn-primary btn-sm" onClick={() => handleToggleActive(user)}>{user.status ? "Active" : "Block"}</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      document.getElementById("my_modal_2").showModal();
                      handleUserInfo(user);
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaInfoCircle className="text-green-600"></FaInfoCircle>
                  </button>

                  {/* modal start */}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}

                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-center">{userInfo.name} Info</h3>

                      {/* user Info table start */}
                      <div className="overflow-x-auto">
                        <table className="table table-zebra">
                          {/* head */}
                          <tbody>
                            {/* row 1 */}
                            <tr>
                              <td>Name</td>
                              <td>{userInfo?.name}</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                              <th>Email</th>
                              <td>{userInfo?.email}</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                              <th>Blood Group</th>
                              <th>{userInfo?.bloodgrp}</th>
                            </tr>
                            <tr>
                              <th>Upazila</th>
                              <th>{userInfo?.upazila}</th>
                            </tr>
                            <tr>
                              <th>District</th>
                              <th>{userInfo?.district}</th>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <th>{userInfo?.status == true ? 'Active': 'Block'}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* user Info table end */}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                  {/* modal end */}

                  <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-sm">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
