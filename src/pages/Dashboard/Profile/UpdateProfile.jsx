import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";


const UpdateProfile = () => {
    const {name, email, bloodgrp, district, upazila:upazilla} = useLoaderData();
    console.log(name);

    const [dis, setDis] = useState();
  const [upazila, setUpazila] = useState();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[2]);
        setDis(data[2].data);
      });
  }, []);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazila(data[2].data);
      });
  }, []);
  //   console.log(dis);

  //for hook form
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

    return (
        <div>
            {/* {user._id} */}
            <h1 className="text-5xl font-bold text-center mb-7">Update Profile</h1>
            <form onSubmit={handleSubmit()} className="card-body text-center lg:w-1/2 md:h-3/4 mx-auto border-2 my-5 shadow-2xl rounded-xl">
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
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                name="email"
                defaultValue={email}
                readOnly
                placeholder="Email"
                className="input input-bordered bg-[#F2F2F2]"
              />
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select {...register("bloodgrp", { required: true })} defaultValue={bloodgrp} name="bloodgrp" className="select select-bordered w-full max-w-xs">
                <option>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-center items-center gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select {...register("district", { required: true })} defaultValue={district} name="district" className="select select-bordered w-full max-w-xs">
                <option>Select District</option>
                {dis?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select {...register("upazila", { required: true })} defaultValue={upazilla} name="upazila" className="select select-bordered w-full max-w-xs">
                <option>Select Upazila</option>
                {upazila?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#065af7] text-white font-bold text-xl">Update</button>
          </div>
        </form>
            
        </div>
    );
};

export default UpdateProfile;