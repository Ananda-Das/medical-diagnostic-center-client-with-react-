import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";

const Test = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  const handleDeleteTest = (test) => {
    // console.log(user);
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
        axiosSecure.delete(`/test/${test._id}`).then((res) => {
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
      <h1 className="text-5xl font-bold text-center mb-7">All Test: {tests.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={test._id}>
                <th>{index + 1}</th>
                <td>{test?.name}</td>
                <td className="w-20 h-20">
                  <img src={test?.imageUrl} alt="" />
                </td>
                <td>{test?.price}</td>
                <td>{test?.date}</td>
                <td>{test?.slot}</td>
                <td>
                  <Link to={`/dashboard/updateTest/${test._id}`}>
                    <button className="btn btn-ghost  btn-sm">
                      <GrUpdate></GrUpdate>
                    </button>
                  </Link>
                  <button onClick={() => handleDeleteTest(test)} className="btn btn-ghost btn-sm">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                  <Link to={`/dashboard/bookedTest/${test._id}`}k>
                    <button className="btn btn-ghost btn-sm">
                      <TbBrandBooking />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;
