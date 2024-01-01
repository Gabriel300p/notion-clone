import Banner from "@/assets/appBanner.png";
import TitleSection from "@/components/landing-page/TitleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <section>
      <div className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-in-One Collaboration and Productivity Platform"
        />
        <div className="bg-white p-[2px]  rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px] mt-6">
          <Button
            variant={"btn-secondary"}
            className="w-full rounded-xl p-6 text-2xl bg-background"
          >
            Get Notion Free
          </Button>
        </div>
        <div className="md:mt-[-90px] sm:w-full w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px]">
          <Image
            src={Banner}
            alt="Application Banner"
            width={750}
            height={750}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
