import useAuth from "../../../hooks/useAuth";

const Profile = () => {

    const {user} = useAuth();

    console.log(user);

    return (
        <div>
            {user.displayName}
        </div>
    );
};

export default Profile;