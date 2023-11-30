import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";


const UpdateBooking = () => {

    const {_id} = useLoaderData();

    const { register, handleSubmit } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
    
        const paymentInfo = {
            testLink: data.testLink,
            status: 'deliverd'
        }
    
        axiosSecure.patch(`/payments/${_id}`, paymentInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Test Added successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log("success");
            }
          });
    
      };

    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-7">Update Test Result</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body text-center lg:w-1/2 md:h-3/4 mx-auto border-2 my-5 shadow-2xl rounded-xl">
        <div className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">PDF Link</span>
            </label>
            <input
              {...register("testLink", { required: true })}
              type="text"
              name="testLink"
              placeholder="Please Insert Test Result Pdf Link"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#065af7] text-white font-bold text-xl">Update</button>
        </div>
      </form>
            
        </div>
    );
};

export default UpdateBooking;