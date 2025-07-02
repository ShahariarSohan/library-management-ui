

const Banner = () => {
    return (
      <div className="relative">
        <div className="text-white text-center absolute space-y-2 md:space-y-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="text-3xl md:text-7xl  font-bold">Book Ocean</h1>
          <p className="md:text-2xl font-semibold">We are here for book lovers</p>
        </div>
        <img className="w-full" src="./banner.png" alt="" />
      </div>
    );
};

export default Banner;