import { useLoaderData } from "react-router-dom";


const UpdateProfile = () => {
    const {name} = useLoaderData();
    console.log(name);

    return (
        <div>
            {/* {user._id} */}
            user Data
        </div>
    );
};

export default UpdateProfile;