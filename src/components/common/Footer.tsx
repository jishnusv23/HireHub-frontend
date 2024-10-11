
import Logo from "@/assets/logos/HireHub-r.png";
import { FaArrowRight } from "react-icons/fa";
import HireHub from "./HireHub";

import { FooterForm } from "./FooterForm";
import { Input } from "../ui/Input";

export default function Footer() {
  return (
    <div className="px-5 lg:px-40 lg:py-10">
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:py-16">
          <h1 className="text-5xl font-bold">
            People are Saying About
            <HireHub />
          </h1>
          <p className="text-foregroundAccent py-5">
            Empowering seamless interviews and collaboration, anywhere in the
            world.
          </p>
          <h2 className="text-5xl">&quot;</h2>
          <p>
            HireHub has been a game-changer for me. It makes managing interviews
            effortless and has streamlined my process, saving me time and
            boosting productivity. Highly recommend! 😍
          </p>
          <p className="py-5 text-foregroundAccent">_Nahyan</p>
        </div>
        <FooterForm />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:py-20 py-5">
        <div className="py-5 col-span-2 grid grid-rows-3 gap-2 items-center justify-center lg:justify-start">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="HireHubLogo" width={30} height={30} />
            <h1 className="font-bold text-2xl">
              <HireHub />
            </h1>
          </div>
          <p className="text-center lg:text-left">Get Started</p>
          <div className="flex items-center space-x-2 justify-center lg:justify-start">
            <span>
              <Input
                type="text"
                placeholder="Enter your Mail"
                
                className="rounded-full text-muted-foreground border border-foreground w-60"
                />
            </span>
            <span>
              <FaArrowRight className="text-white bg-primary text-2xl font-bold rounded-full w-10 h-10" />
            </span>
          </div>
        </div>

        {/* Support and Company Sections Side by Side on Mobile */}
        <div className="col-span-2 lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 text-center lg:text-left gap-2">
          <div>
            <h5 className="font-bold">Support</h5>
            <p className="hover-text">Help Center</p>
            <p className="hover-text">Account Information</p>
            <p className="hover-text">About</p>
            <p className="hover-text">Call</p>
          </div>
          <div className="lg:hidden">
            <h5 className="font-bold">Company</h5>
            <p className="hover-text">Our Story</p>
            <p className="hover-text">Careers</p>
            <p className="hover-text">Blog</p>
            <p className="hover-text">Contact Us</p>
          </div>
        </div>

        {/* Other Sections */}
        <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
          <h5 className="font-bold">Company</h5>
          <p className="hover-text">Our Story</p>
          <p className="hover-text">Careers</p>
          <p className="hover-text">Blog</p>
          <p className="hover-text">Contact Us</p>
        </div>
        <div className=" hidden lg:block col-span-2 lg:col-span-1 text-center lg:text-left">
          <h5 className="font-bold">Resources</h5>
          <p className="hover-text">Documentation</p>
          <p className="hover-text">Community</p>
          <p className="hover-text">Developers</p>
          <p className="hover-text">Security</p>
        </div>
      </div>

      <div className="lg:flex justify-between pb-5">
        <p> © 2022 HireHub PVT LT. Copyright and rights reserved</p>
        <p>
          <span className="hover-text">Terms and Conditions</span> ·{" "}
          <span className="hover-text">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
