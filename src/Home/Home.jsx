import HeroSection from "../components/HeroSection/HeroSection";
import HeroServices from "../components/IconLayout/HeroServices";
import Specialisation from "../components/Sections/Specialisation/Specialisation";
import Offers from "../components/Sections/Offers/Offers";
import Specialists from "../components/Sections/Specialists/Specialists"

export default function Home() {
  return (
    <div >
      <div>
        <HeroSection />
      </div>
      <div> 
        <HeroServices />
      </div>
      <div>
        <Offers/>
      </div>
      <div>
        <Specialisation />
      </div>
      <div>
        <Specialists />
      </div>
    </div>
  );
}
