"use client";
// import Header from "./(home)/_components/main/header";
// import { NavBar } from "./(home)/_components/main/navbar";
// import StarsCanvas from "./(home)/_components/main/StarBackground";
// import Navbar from "./(home)/_components/main/navbar1";
const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="">
        {/* <StarsCanvas /> */}

        {children}
      </div>
    </>
  );
};

export default LandingLayout;
