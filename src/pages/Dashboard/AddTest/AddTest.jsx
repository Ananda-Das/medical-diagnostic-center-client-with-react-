import { useForm } from "react-hook-form";


const AddTest = () => {

    //for hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data) => {
    console.log(data);

  };

    return (
        <div>
            <h1>Add a Test</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body text-center lg:w-1/2 md:h-3/4 mx-auto">
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.name && <span className="text-red-500">Name field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <input
              {...register("imagUrl", { required: true })}
              type="text"
              name="imagUrl"
              placeholder="Image Url"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.imagUrl && <span className="text-red-500">imagUrl field is required</span>}
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
              placeholder="Details"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.details && <span className="text-red-500">Details field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="text"
              name="price"
              placeholder="Price"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.price && <span className="text-red-500">Price field is required</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          
          
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          
          
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#065af7] text-white font-bold text-xl">Register</button>
        </div>
      </form>
        </div>
    );
};

export default AddTest;