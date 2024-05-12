import Container from "../../Container";

const DecryptionPage = () => {
  return (
    <Container>
      <div className="border border-purple-300 p-20 shadow-2xl mt-14 mb-20 rounded-2xl">
        <h2 className="text-5xl text-center font-bold mb-14 text-purple-500">
          Decrypt your Message
        </h2>
        <form className="space-y-10">
          <div className="flex flex-col md:flex-row gap-10">
            <input
              type="text"
              placeholder="Spot Name"
              name="touristSpotName"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Country Name"
              name="countryName"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <input
              type="text"
              placeholder="Location"
              name="location"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              name="shortDescription"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <input
              type="number"
              placeholder="Average Cost ($USD)"
              name="averageCost"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Seasonality"
              name="seasonality"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <input
              type="text"
              placeholder="Travel Time"
              name="travelTime"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="Total Visitors Per Year"
              name="totalVisitorPerYear"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <input
              type="text"
              placeholder="User Name"
              name="name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              placeholder="User Email"
              name="email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Image URL"
              name="photo"
              className="input input-bordered w-full"
              required
            />
          </div>
          <input
            type="submit"
            value="Decrypt Message"
            className="btn btn-block text-xl font-bold text-white bg-purple-500 border-none"
            required
          />
        </form>
      </div>
    </Container>
  );
};

export default DecryptionPage;
