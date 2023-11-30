import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateTest = () => {

    const {name, price, imageUrl,  date, slot, details, _id} = useLoaderData();

    const { register, handleSubmit } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
    
        const testItem = {
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            date: data.date,
            details: data.details,
            slot: data.slot,
        }
    
        axiosSecure.patch(`/test/${_id}`, testItem).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Test Added successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              // navigate("/");
              console.log("success");
            }
          });
    
      };

    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-7">Update: {name}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body text-center lg:w-1/2 md:h-3/4 mx-auto border-2 my-5 shadow-2xl rounded-xl">
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
                defaultValue={name}
              placeholder="Name"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <input
              {...register("imageUrl", { required: true })}
              type="text"
              defaultValue={imageUrl}
              name="imageUrl"
              placeholder="Image Url"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
        <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <input
              {...register("details", { required: true })}
              type="text"
              name="details"
              defaultValue={details}
              placeholder="Details"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="text"
              name="price"
              defaultValue={price}
              placeholder="Price"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
        <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              name="date"
              defaultValue={date}
              placeholder="Date"
              className="input input-bordered bg-[#F2F2F2]"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Slot</span>
            </label>
            <input
              {...register("slot", { required: true })}
              type="number"
              name="slot"
              defaultValue={slot}
              placeholder="Slot"
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

export default UpdateTest;