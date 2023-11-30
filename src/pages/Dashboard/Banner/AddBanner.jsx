import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {

    const axiosSecure= useAxiosSecure();
    const axiosPublic = useAxiosPublic();

     //for hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //image uploda to imagebb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      console.log("success");
    }

    //send in the server
    const bannerInfo ={
        name: data.name,
        title: data.title,
        image: res.data.data.display_url,
        description: data.description,
        couponCodeName: data.ccname,
        couponRate: data.couponRate,
        isActive: false,  
    }

    axiosSecure.post("/add/banner", bannerInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
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
            <h1 className="text-5xl font-bold text-center">Add Banner</h1>
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
              placeholder="Name"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.name && <span className="text-red-500">Name field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.title && <span className="text-red-500">Title field is required</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            {/* <input type="text" name="name" placeholder="Name" className="input input-bordered bg-[#F2F2F2]" required /> */}
            <input
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {errors.image && <span className="text-red-500">Image field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              name="description"
              placeholder="Description"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.description && <span className="text-red-500">Description field is required</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Coupon Code Name</span>
            </label>
            <input
              {...register("ccname", { required: true })}
              type="text"
              name="ccname"
              placeholder="Coupon Code Name"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.ccname && <span className="text-red-500">Coupon Code Name field is required</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Coupon Rate</span>
            </label>
            <input
              {...register("couponRate", { required: true })}
              type="text"
              name="couponRate"
              placeholder="Coupon Rate"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.couponRate && <span className="text-red-500">Coupon Rate field is required</span>}
          </div>
          
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#065af7] text-white font-bold text-xl">ADD</button>
        </div>
      </form>
            
        </div>
    );
};

export default AddBanner;