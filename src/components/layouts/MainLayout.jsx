import { Outlet } from "react-router-dom";
import Nav from "./Nav"; 
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet /> 
      </main>
      <section className="padding bg-black">
        <Footer />
      </section>
    </>
  );
};

export default MainLayout;
