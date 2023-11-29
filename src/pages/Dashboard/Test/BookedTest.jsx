import { useLoaderData } from "react-router-dom";


const BookedTest = () => {
    const {_id} = useLoaderData();
    console.log(_id);
    return (
        <div>
            bookeed
        </div>
    );
};

export default BookedTest;