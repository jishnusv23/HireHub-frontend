import React from "react";
import Logo from "@/assets/logos/HireHub-r.png";
import InputWithIcon from "../customs/InputWithIcon";
import { FiMail } from "react-icons/fi";
import HireHub from "./HireHub";

import { FooterForm } from "./FooterForm";

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
        <div className="py-5 col-span-2 grid grid-rows-3 gap-2">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="HireHubLogo" width={30} height={30} />
            <h1 className="font-bold text-2xl">
              <HireHub />
            </h1>
          </div>
          <p>Get Started</p>
          <InputWithIcon icon={<FiMail />} placeholder="Enter your Mail" />
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-rows-5">
          <h5 className="font-bold">Support</h5>
          <p className="hover-text">Help Center</p>
          <p className="hover-text">Account Information</p>
          <p className="hover-text">About</p>
          <p className="hover-text">Call</p>
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-rows-5">
          <h5 className="font-bold">Support</h5>
          <p className="hover-text">Help Center</p>
          <p className="hover-text">Account Information</p>
          <p className="hover-text">About</p>
          <p className="hover-text">Call</p>
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-rows-5">
          <h5 className="font-bold">Support</h5>
          <p className="hover-text">Help Center</p>
          <p className="hover-text">Account Information</p>
          <p className="hover-text">About</p>
          <p className="hover-text">Call</p>
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
