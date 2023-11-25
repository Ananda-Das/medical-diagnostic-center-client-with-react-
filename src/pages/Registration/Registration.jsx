import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const [dis, setDis] = useState();
  const [upazila, setUpazila] = useState();
  const axiosPublic = useAxiosPublic();
  const { createuser, updateUserProfile } = useContext(AuthContext);

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
    formState: { errors },
  } = useForm();

  //handle submit
  //   const handleSubmit = e =>{
  //     e.preventDefault();
  //     const form = e.target;
  //     const name = form.name.value;
  //     const email = form.email.value;
  //     const bloodgrp = form.bloodgrp.value;
  //     const district = form.district.value;
  //     const upazila = form.upazila.value;
  //     const password = form.password.value;
  //     const cpass = form.cpass.value;

  //     const user = {name, email, bloodgrp, district, upazila, password, cpass};
  //     console.log(user);

  //   }
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

    //send in server
    createuser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // console.log("user profile info updated");
          //create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            bloodgrp: data.bloodgrp,
            district: data.district,
            upazila: data.upazila,
            status: "Active",
            role: "user",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
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
          // reset();
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <h1 className="mx-auto mt-5 text-5xl text-center font-extrabold uppercase">Register</h1>

      {/* form-start */}
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
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered bg-[#F2F2F2]"
            />
            {errors.email && <span className="text-red-500">Email field is required</span>}
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
              <span className="label-text">Blood Group</span>
            </label>
            <select {...register("bloodgrp", { required: true })} name="bloodgrp" className="select select-bordered w-full max-w-xs">
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
            {errors.bloodgrp && <span className="text-red-500">Blood Group field is required</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select {...register("district", { required: true })} name="district" className="select select-bordered w-full max-w-xs">
              <option>Select District</option>
              {dis?.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            {errors.district && <span className="text-red-500">District field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select {...register("upazila", { required: true })} name="upazila" className="select select-bordered w-full max-w-xs">
              <option>Select Upazila</option>
              {upazila?.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            {errors.upazila && <span className="text-red-500">Upazila field is required</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              //   type={showPassword ? "text" : "password"}
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered relative bg-[#F2F2F2]"
              {...register("password", { required: true })}
            />
            {/* <span
              className="absolute lg:left-[930px] left-[362px] lg:bottom-[140px] bottom-[23px]   text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span> */}
            {errors.password && <span className="text-red-500">Upazila field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              //   type={showPassword ? "text" : "password"}
              type="password"
              placeholder="Confirm Password"
              name="cpass"
              className="input input-bordered relative bg-[#F2F2F2]"
              {...register("cpass", { required: true })}
            />
            {/* <span
              className="absolute lg:left-[930px] left-[362px] lg:bottom-[140px] bottom-[23px]   text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span> */}
            {errors.cpass && <span className="text-red-500">Upazila field is required</span>}
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#065af7] text-white font-bold text-xl">Register</button>
        </div>
      </form>

      {/* {registerError && <p className="text-red-700 text-center font-bold">{registerError}</p>}
        {success && <p className="text-green-600">{success}</p>} */}
      <p className="text-center">
        Already have an Account ?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Registration;
