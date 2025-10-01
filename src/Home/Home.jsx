import HeroSection from "../components/HeroSection/HeroSection";
import HeroServices from "../components/IconLayout/HeroServices";
import Specialisation from "../components/Sections/Specialisation/Specialisation";
import Offers from "../components/Sections/Offers/Offers";
import Specialists from "../components/Sections/Specialists/Specialists";
import PatientCaring from "../components/Sections/PatientCaring/PatientCaring";
import Blogs from "../components/Sections/Blogs/Blogs";
import OurFamilies from "../components/Sections/OurFamilies/OurFamilies";
import FAQs from "../components/Sections/FAQs/FAQs";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div>
        <HeroServices />
      </div>
      <div>
        <Offers />
      </div>
      <div>
        <Specialisation />
      </div>
      <div>
        <Specialists />
      </div>
      <div>
        <PatientCaring />
      </div>
      <div>
        <Blogs />
      </div>
      <div>
        <OurFamilies />
      </div>
      <div>
        <FAQs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
