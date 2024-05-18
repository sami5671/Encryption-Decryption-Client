import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="h-[250px] flex flex-col justify-center items-center">
      <ImSpinner2 size={100} color="purple" className="animate-spin" />
    </div>
  );
};

export default Loader;
