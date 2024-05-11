import axiosSecure from ".";

// save user info into the database
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};
