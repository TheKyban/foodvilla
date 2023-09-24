import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Error = () => {
    return (
        <>
            <Header />
            <div className="h-[92vh] flex items-center justify-center">
                <h1 className="text-center">Page not Found</h1>
            </div>
            <Footer />
        </>
    );
};

export default Error;
