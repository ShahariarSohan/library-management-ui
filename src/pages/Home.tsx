import { Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>This is home</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
