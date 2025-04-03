"use client";

import React from "react";
import Footer from "@/components/footer";
import A from "@/components/home/A";
import B from "@/components/home/B";
import ApplicationComponent from "@/components/home/application-components-section";
import EmailSection from "@/components/home/email-section";
import FundamentalSection from "@/components/home/fundamental-section";
import HeroSection from "@/components/home/hero-section";
import UiComponentsSection from "@/components/home/ui-components-section";
import WebsiteComponent from "@/components/home/website-component-section";
import { cn } from "@/lib/utils";

export default function Home() {
  const [heroesHover, setHeroesHover] = React.useState(false);
  return (
    <div className="w-full overflow-x-hidden">
      <div className="border-stroke-decorative mx-auto box-border max-w-310 border-r border-l">
        <div className="relative">
          <div className="relative overflow-hidden pt-12 pb-20">
            <HeroSection />
            <div
              className="group hidden xl:block"
              onMouseOver={() => setHeroesHover(true)}
              onMouseLeave={() => setHeroesHover(false)}
            >
              <A
                className={cn(
                  "animate-float absolute top-10 right-25 scale-90 -skew-x-14 skew-y-5 duration-2500 group-hover:-skew-x-6 group-hover:skew-y-4 group-hover:duration-700",
                  {
                    "animation-pause": heroesHover,
                  },
                )}
              />
              <B
                className={cn(
                  "animate-float absolute top-32 -right-5 scale-90 -skew-x-14 skew-y-5 duration-2500 group-hover:-skew-x-6 group-hover:skew-y-4 group-hover:duration-700",
                  {
                    "animation-pause": heroesHover,
                  },
                )}
              />
            </div>
          </div>
          {/* For gradient background */}
          <div className="from-hero-fade-gradient-from to-hero-fade-gradient-to absolute bottom-0 -ml-396 w-[calc(100%+999rem)] bg-linear-to-b md:h-25 lg:h-50"></div>
        </div>
        <FundamentalSection />
        <UiComponentsSection />
        <ApplicationComponent />
        <WebsiteComponent />
        <EmailSection />
      </div>
      <Footer />
    </div>
  );
}
