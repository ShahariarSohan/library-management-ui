import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Home;
