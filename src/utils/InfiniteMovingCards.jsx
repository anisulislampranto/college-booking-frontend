"use client";

import AnimatedBg from "@/components/ui/AnimatedBg";
import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { WobbleCard } from "./WobbleCard";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed,
  pauseOnHover = true,
  className,
  type
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "250s");
      }
    }
  };

  return (
    (<div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {items?.map((item, idx) => (
          <AnimatedBg>
            <li
              className="w-[350px] max-w-full relative flex-shrink-0 px-8 py-6 md:w-[450px]"
              key={item._id}>
                <blockquote>

                  <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>

                    {
                      type === 'image' ? 
                        <>
                          <WobbleCard key={item._id} className=' relative h-56 w-full'>
                              <Image quality={70} className=' absolute object-cover rounded-md' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image}`} alt='img' fill />
                              <p className=' rounded-md absolute bottom-5 text-xl left-3 text-white capitalize backdrop-blur-md p-2'>{item.college?.name}</p>
                          </WobbleCard>
                        </>
                      : 
                      <>
                        <span
                          className="relative z-20 text-sm leading-[1.6] font-normal capitalize">
                          {item.reviewText}
                        </span>
                        <div className="relative z-20 mt-6 flex flex-row items-center">
                          <span className="flex flex-col gap-1">
                            <span className=" text-sm leading-[1.6]  font-normal capitalize">
                              {item.collegeId?.name}
                            </span>
                            <span className=" text-sm leading-[1.6] font-normal capitalize">
                              {item.userId?.name}
                            </span>
                          </span>
                        </div>
                      </>
                    }
                </blockquote>
            </li>
          </AnimatedBg>
        ))}
      </ul>
    </div>)
  );
};
