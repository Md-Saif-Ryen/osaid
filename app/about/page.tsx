import RadialHomeMenu from "@/components/FloatingHomeMenu";
import MyAchievement from "../educational/cardFlip";
import PentagonPage from "../skills/pentagonPage";
import AboutMe from "./about-me";
// import FavouritesPage from "./favourites";
import PremiumHobbiesSection from "./PremiumHobbiesSection";

export default function About() {
  return (
    <>
    <RadialHomeMenu/>
      <AboutMe />
      {/* Hide on mobile, show on desktop */}
      <div className="hidden lg:block">
        <PentagonPage />
      </div>
      <PremiumHobbiesSection />
      {/* <FavouritesPage/> */}
    </>
  );
}
