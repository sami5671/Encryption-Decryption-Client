import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { imageUpload } from "../../Api/utils";
import toast from "react-hot-toast";
import Container from "../../Container";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { saveUser } from "../../Api/auth";

const Register = () => {
  const [uploadButtonText, setUploadButtonText] = useState(
    "Upload Profile Picture"
  );

  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    gitHubSign,
  } = UseAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      const imageData = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, imageData?.data?.display_url);
      await saveUser(result?.user);

      navigate(from, { replace: true });
      setUploadButtonText("Upload Profile Picture");
      toast.success("SignUp Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      await saveUser(result?.user);

      navigate(from, { replace: true });
      toast.success("SignUp Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };
  const handleGitHubSignIn = async () => {
    try {
      const result = await gitHubSign();
      await saveUser(result?.user);

      navigate(from, { replace: true });
      toast.success("SignUp Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/tqMJbwk/log.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <Container>
        <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-12 mt-12 mb-12">
          {/* for Signup */}
          <div className="lg:w-[880px]">
            <div className="flex justify-center items-center min-h-screen">
              <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900 bg-white bg-opacity-90">
                <div className="mb-8">
                  <h1 className="my-3 text-4xl font-bold bg-gradient-to-br from-purple-600 to-green-200 text-transparent bg-clip-text">
                    Sign Up
                  </h1>
                  <p className="text-sm text-gray-400">
                    Welcome to Encrypto Message
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  noValidate=""
                  className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name Here"
                        className="lg:w-[400px] px-3 py-2 border rounded-md border-gray-300 focus:outline-purple-500 bg-gray-200 text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter Your Email Here"
                        className="lg:w-[400px] px-3 py-2 border rounded-md border-gray-300 focus:outline-purple-500 bg-gray-200 text-gray-900"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm mb-2">
                          Password
                        </label>
                      </div>
                      <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        id="password"
                        required
                        placeholder="*******"
                        className="lg:w-[400px] px-3 py-2 border rounded-md border-gray-300 focus:outline-purple-500 bg-gray-200 text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="bg-white w-full m-auto rounded-lg">
                    <div className="file_upload px-5 py-3 relative border-4 border-dotted border-black rounded-lg">
                      <div className="flex flex-col w-max mx-auto text-center">
                        <label>
                          <input
                            onChange={(e) =>
                              handleImageChange(e.target.files[0])
                            }
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            hidden
                          />
                          <div className="bg-purple-800 hover:animate-pulse text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-purple-700">
                            {uploadButtonText}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    {loading ? (
                      <button
                        type="submit"
                        className="bg-purple-800 lg:w-[400px] rounded-md py-3 text-white flex items-center justify-center"
                      >
                        <ImSpinner9 className="animate-spin" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-purple-800 lg:w-[400px] rounded-md py-3 text-white hover:bg-purple-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* for image */}
          <div className="">
            {/* <img
              // src="https://i.ibb.co/vsnxDhT/login.jpg"
              alt=""
              className="lg:w-[800px] lg:h-[340px]"
            /> */}
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-2xl font-semibold text-white">
                SignUp with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>
            <div
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 text-white border-rounded cursor-pointer hover:bg-black hover:text-white"
            >
              <FcGoogle size={32} />
              <p>Continue with Google</p>
            </div>
            <div
              onClick={handleGitHubSignIn}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 text-white border-rounded cursor-pointer hover:bg-black hover:text-white"
            >
              <FaGithub size={32} />
              <p>Continue with GitHub</p>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="hover:underline hover:text-purple-500 text-gray-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
