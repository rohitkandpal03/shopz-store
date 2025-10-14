import loader from "@/assets/loader.gif";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[vw]">
      <Image src={loader} width={150} height={150} alt={"Loading..."} />
    </div>
  );
};

export default LoadingPage;
