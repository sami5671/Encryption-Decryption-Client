import Container from "../../Container";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-hot-toast";
import { saveUser } from "../../Api/auth";
import UseAuth from "../../Hooks/UseAuth";

const Login = () => {
  //================================================================

  // ===============================================================
  const { signIn, signInWithGoogle, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // User Login
      const result = await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
      // ----------------------------------------------------------------
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  //---------------- handle Google Sign In --------------------
  const handleGoogleSignIn = async () => {
    try {
      // user registration with google
      const result = await signInWithGoogle();

      // save user data in database
      const dbResponse = await saveUser(result?.user);

      navigate(from, { replace: true });
      toast.success("Login Successful");
      // ----------------------------------------------------------------
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <>
      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
          <div className="">
            <div className="min-h-screen shadow-xl ">
              <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900">
                <div className="mb-8">
                  <h1 className="my-3 text-4xl font-bold bg-gradient-to-br from-purple-600 to-green-400 text-transparent bg-clip-text">
                    Welcome To <br /> Encrypto Message
                  </h1>
                  <p className="text-sm text-gray-400">
                    Sign in to access your account
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  noValidate=""
                  action=""
                  className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                  <div className="space-y-4">
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
                        className="lg:w-[370px] px-3 py-2 border rounded-md border-gray-300 focus:outline-purple-500 bg-gray-200 text-gray-900"
                        data-temp-mail-org="0"
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
                        autoComplete="current-password"
                        id="password"
                        required
                        placeholder="@#(UIN!1"
                        className="lg:w-[370px] px-3 py-2 border rounded-md border-gray-300 focus:outline-purple-500 bg-gray-200 text-gray-900"
                      />
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
                        className="bg-purple-800 w-full rounded-md py-3 text-white hover:bg-purple-700"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>
                <div className="space-y-1">
                  <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
                    Forgot password?
                  </button>
                </div>
                <div className="flex items-center pt-4 space-x-1">
                  <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                  <p className="px-3 text-sm dark:text-gray-400 font-semibold">
                    Login with social accounts
                  </p>
                  <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>
                <div
                  onClick={handleGoogleSignIn}
                  className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer hover:bg-black hover:text-white"
                >
                  <FcGoogle size={32} />

                  <p>Continue with Google</p>
                </div>
                <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer hover:bg-black hover:text-white">
                  <FaGithub size={32} />

                  <p>Continue with GitHub</p>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="hover:underline hover:text-purple-500 text-gray-600"
                  >
                    Sign Up
                  </Link>
                </p>
                <p>
                  <span className="text-[12px] mr-1">For Help:</span>
                  <span className="text-slate-500 text-[10px] font-bold underline">
                    samialam5671@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
