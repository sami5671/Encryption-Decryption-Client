import { Link } from "react-router-dom";
import banner from "../../assets/banenr4.jpg";
const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-80 md:h-96 lg:h-screen flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover object-center opacity-90"
        src={banner}
        alt="Banner"
      />

      <div className="absolute bg-slate-900 bg-opacity-60 w-full h-full rounded-md flex flex-col items-center justify-center">
        <div className="text-center lg:px-44">
          <h2 className="text-2xl lg:text-7xl mt-12 font-bold mb-4 text-white">
            Encrypt or Decrypt Your Data Securely!
          </h2>
          <p className="text-base sm:text-lg px-2 md:text-xl lg:text-2xl text-white">
            Protect your sensitive information using state-of-the-art encryption
            techniques. Join us to learn more about data security and privacy.
          </p>
        </div>
        <Link to="/encryptionPage">
          <button className="text-black font-bold text-xl hover:bg-purple-500 hover:text-white mt-12 rounded-full px-12 py-3 bg-white">
            Start Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
