import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: booked = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

 

  const handleDeleteTest = (payment) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you want to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/payments/${payment._id}`).then((res) => {
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

  return (
    <div>
      <h1>All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>User email</th>
              <th>Payment</th>
              <th>Transaction Id</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booked?.map((test, index) => (
              <tr key={test._id}>
                <th>{index + 1}</th>
                <td className="font-bold">{test?.email}</td>
                <td>{test.price}</td>
                <td>{test.transactionId}</td>
                <td>{test.status}</td>
                <td>
                  <Link to={`/dashboard/updatePayment/${test._id}`}>
                    <button className="btn btn-sm btn-accent">Update Result</button>
                  </Link>

                  <button onClick={() => handleDeleteTest(test)} className="btn btn-sm btn-warning ml-4">
                    Delete
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

export default AllBookings;
