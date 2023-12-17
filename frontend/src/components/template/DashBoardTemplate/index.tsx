import Navbar from "@/components/organism/Navbar";

const DashBoardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashBoardTemplate;
