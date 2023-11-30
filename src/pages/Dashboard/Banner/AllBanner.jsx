import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  const handleDeleteTest = (banner) => {
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
        axiosSecure.delete(`/banner/${banner._id}`).then((res) => {
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

  const handleToggleActive = async (banner) => {
    try {

      // Update the isActive status on the server
      await axiosSecure.patch(`/banners/${banner._id}`, {
        isActive: !banner.isActive,
      });


      // After the update, refetch the data to get the updated state
      refetch();
    } catch (error) {
      console.error("Error toggling isActive:", error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-7">All Banners</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Title</th>
              <th>Coupon Code Name</th>
              <th>Coupon Rate</th>
              <th>Is Active?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id}>
                <th>{index + 1}</th>
                <td>{banner?.name}</td>
                <td>{banner?.title}</td>
                <td>{banner?.couponCodeName}</td>
                <td>{banner?.couponRate} %</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleToggleActive(banner)}>{banner.isActive ? "Deactivate" : "Activate"}</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteTest(banner)} className="btn btn-ghost btn-sm">
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

export default AllBanner;
