"use client";
import Button from "../../components/(common)/Button/Button";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Accordion from "../../components/(common)/Accordian/Accordian";
import { CREATORs, FAQs, WHYIZSIT } from "../../../utils/constants";
import Header from "../../components/(HeaderAndFooter)/Header";

export default function LandingPage() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div className="bg-gray-900">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div data-aos="fade-up" className="header-title-section py-4">
          <div className="flex flex-wrap font-white justify-between items-center">
              <div>
                  <h1 className="font-rajdhani text-5xl leading-[1.25] text-primary mb-8">
                      The Future of Storytelling
                  </h1>
                  <p className="text-white text-xl mb-8">AI-Powered Films, Series, Interactive Stories & Inifinte Worlds</p>
                  <Button
                    typography="Watch Now"
                    onClick={() => console.log("Primary clicked")}
                    icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
                  />
              </div>
              <div className="relative w-96 h-52">
                <iframe
                  src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="auto"
                  title="JW Player Video"
                  style={{
                    position: "absolute",
                    borderRadius: "1rem",
                  }}
                  allowFullScreen
                ></iframe>
              </div>
          </div>
        </div>
        
        <div data-aos="fade-up" className="text-primary text-4xl text-center py-4">Your choices, Your world, Your story</div>
        
        <div data-aos="fade-up" className="mb-24">
          <div className="flex items-center justify-between py-8">
            <div className="relative w-96 h-52">
              <iframe
                src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                title="JW Player Video"
                style={{
                  position: "absolute",
                  borderRadius: "1rem",
                }}
                allowFullScreen
              ></iframe>
            </div>
            <div className="relative w-96 h-52">
              <iframe
                src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                title="JW Player Video"
                style={{
                  position: "absolute",
                  borderRadius: "1rem",
                }}
                allowFullScreen
              ></iframe>
            </div>
            <div className="relative w-96 h-52">
              <iframe
                src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                title="JW Player Video"
                style={{
                  position: "absolute",
                  borderRadius: "1rem",
                }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="flex flex-wrap font-white justify-between items-center">
            <div>
              <h1 className="tracking-tighter text-3xl text-primary mb-8">
                The First Platform Where Stories Evolve With You
              </h1>
              <p className="text-white mb-8 max-w-[470px] text-lg">
                Stream bold AI films, binge series, dive into interactive narratives, or explore infinite real-time generated worlds - where <b>your choices shape the story.</b>
              </p>
            </div>
            <div className="relative w-96 h-52">
              <iframe
                src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                title="JW Player Video"
                style={{
                  position: "absolute",
                  borderRadius: "1rem",
                }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="relative p-[2px] bg-gradient-to-b from-gray-500 to-gray-900 rounded-[16px] mb-32">
          <div className="absolute w-16 h-[2px] top-0 left-10 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="bg-gray-900 rounded-[14px] pb-6">
            <p className="text-primary text-2xl text-center py-6">How It Works</p>
            <div className="flex justify-around px-4">
              <div className="text-white">
                <p className="text-white text-center text-xl mb-6">For Viewers</p>
                <div className="flex flex-col gap-4 mb-8 text-lg">
                  <p>→ Stream cutting-edge films & series</p>
                  <p>→ Explore dynamic narratives & choose your path</p>
                  <p>→ Get recommendations via Izsit Chat</p>
                </div>
                <Button
                  typography="Watch Now"
                  className="mx-auto"
                  icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
                ></Button>
              </div>
              <div className="relative w-[1px]">
                <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-bounce-y"></div>
              </div>
              <div className="text-white">
                <p className="text-white text-center text-xl mb-6">For Creators</p>
                <div className="flex flex-col gap-4 mb-8 text-lg">
                  <p>→ Upload films, build branching stories, or launch a universe</p>
                  <p>→ Earn through ads, referrals & equity in you IP</p>
                  <p>→ Reach audiences across TV, mobile & web</p>
                </div>
                <Button 
                  typography="Join as Creator"
                  buttonType="secondary"
                  className="mx-auto"
                  icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
                ></Button>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="mb-24">
          <div className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-primary text-2xl">Ranked #17 out of 2 Million Startups on F6S</p>
          </div>
          <div className="flex items-center gap-5 py-8 justify-around">
            <div className="px-8 flex-shrink-0">
              <Image src="/images/company-trophy.png" width={600} height={500} alt="trophy" className="h-20 w-auto"/>
            </div>
            <p className="text-white text-lg">
              <span className="text-xl text-primary">IZSIT</span> is reimagining the way we consume and create stories.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" className="relative mb-24">
          <div className="fade-in" className="absolute right-10 -top-24 opacity-25">
            <Image src="/images/ceo.png" width="600" height="600" className="w-96" alt="app-store-logo" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-primary text-2xl">CEO of the Year</p>
          </div>
          <div className="flex items-center gap-60 py-2 text-lg">
            <div className="text-white pt-6 w-full max-w-96">
              <p className="mb-2">Innovation, impact and vision.</p>
              <p><span className="text-primary text-xl">IZSIT</span> is building a creative revolution</p>
            </div>
            <div className="px-8 flex-grow flex flex-col items-center">
              <p className="text-2xl text-primary mb-6">
                CEO of the Year - France 2024
              </p>
              <p className="text-white text-lg">
                Awarded by <a href="#">CEO Review</a>
              </p>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="flex items-center justify-between gap-12 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="text-primary text-2xl">Available Everywhere</p>
            </div>
            <p className="text-white pt-8 pb-16 w-full text-lg">Watch on your favorite devices</p>
          </div>
          <div className="flex items-center gap-8 w-full max-w-[450px]">
            <a href="#">
              <Image src="/icons/app-store.svg" width="20" height="20" className="w-14" alt="app-store-logo" />
            </a>
            <a href="#">
              <Image src="/icons/google-play.svg" width="20" height="20" className="w-10" alt="app-store-logo" />
            </a>
            <a href="#">
              <Image src="/icons/roku.svg" width="20" height="20" className="w-10" alt="app-store-logo" />
            </a>
            <a href="#">
              <Image src="/icons/fire-tv.svg" width="20" height="20" className="w-10" alt="app-store-logo" />
            </a>
            <a href="#">
              <Image src="/icons/android-tv.svg" width="20" height="20" className="w-10" alt="app-store-logo" />
            </a>
          </div>
        </div>

        <div data-aos="fade-up" className="flex items-center justify-between gap-24">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="text-primary text-2xl">See the Revolution</p>
            </div>
            <p className="text-white pt-8 pb-16 text-lg">
              Imagine a world where every story is alive.<br/>
              (Visual of user entering a branching narrative, mobile + TV mockup of the interface)
            </p>
          </div>
          <div className="flex items-center gap-6 w-full max-w-[450px]">
            <Image src="/images/mobile-tv.png" width="300" height="300" className="w-96" alt="app-store-logo" />
          </div>
        </div>

        <div className="relative py-8 mb-8">
          <div data-aos="fade-up" className="flex items-center max-w-[600px] justify-between mx-auto mb-6">
            <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-primary py-8 text-2xl text-center">Why IZSIT</p>
            <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <div data-aos="fade-up" className="grid grid-cols-3 gap-x-8 gap-y-4">
            {/* <div className="relative p-[1px] bg-gradient-to-r from-black to-primary rounded-[4px] overflow-hidden text-white">
              <div className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] bg-gray-900 rounded-[3px]"></div>
              <div className="absolute w-20 h-12 top-2 left-2 bg-primary/80" style={{ filter: "blur(40px)" }}></div>
              <div className="relative p-6 text-center rounded-[3px]">
                AI-Generated Films & Series
              </div>
            </div> */}
            {
              WHYIZSIT.map((item, index) => (
                <div key={index} className="border border-primary rounded-md p-6 text-center text-white">
                  {item}
                </div>
              ))
            }
          </div>
        </div>

        <div data-aos="fade-up" className="mb-24">
          <div className="flex items-center max-w-[600px] justify-between mx-auto mb-8">
            <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-primary py-8 text-2xl text-center">What Creators Say</p>
            <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <div>
            <Carousel
              autoPlay={true}
              autoPlaySpeed={3000}
              infinite={true}
              responsive={responsive}
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            >
              {
                CREATORs.map((creator, index) => (
                  <div key={index} className="text-white p-2 mr-8">
                    <p className="mb-6 min-h-12">{creator.content}</p>
                    <div className="flex items-center gap-4">
                      <Image src={creator.avatar} alt="profile" width="200" height="200" className="rounded-full w-16" />
                      <div className="flex-grow">
                        <p className="text-xl font-bold">{creator.name}</p>
                        <p className="text-sm">{creator.role}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image src="/icons/star-filled.svg" alt="star" width="200" height="200" className="rounded-full w-4" />
                        <Image src="/icons/star-filled.svg" alt="star" width="200" height="200" className="rounded-full w-4" />
                        <Image src="/icons/star-filled.svg" alt="star" width="200" height="200" className="rounded-full w-4" />
                        <Image src="/icons/star-filled.svg" alt="star" width="200" height="200" className="rounded-full w-4" />
                        <Image src="/icons/star-filled.svg" alt="star" width="200" height="200" className="rounded-full w-4" />
                      </div>
                    </div>
                  </div>
                ))
              }
            </Carousel>
          </div>
        </div>

        <div data-aos="fade-up" className="mb-24">
          <div className="flex items-center justify-around mb-8">
            <p className="text-5xl text-primary">What You'll Love</p>
            <div className="relative text-white flex text-lg flex-col gap-2 py-8">
              <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p>- Instant access to dynamic AI content</p>
              <p>- Story evolution based on your input</p>
              <p>- Ownership & monetization for creators</p>
              <p>- A personalized journey every time you press play</p>
            </div>
          </div>
          <div className="flex items-center justify-around">
            <Button
              buttonType="primary"
              typography="Start Watching"
              icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
              className="mx-auto"
            ></Button>
            <Button
              buttonType="secondary"
              typography="Submit Your Story"
              icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
              className="mx-auto"
            ></Button>
          </div>
        </div>

        <div data-aos="fade-up" className="flex mb-24 justify-between gap-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="text-primary text-2xl">About IZSIT</p>
            </div>
            <div className="flex gap-5 py-8 justify-around">
              <div>
                <p className="pl-12 pb-12 flex-grow text-3xl font-bold text-primary">We are not just another streaming platform</p>
                <div className="text-white text-lg text-right">
                  <p className="mb-4"><b>IZSIT</b> is where storytelling, AI, and user agency collide.</p>
                  <p>Wheather you're a viewr or a creator, you don't jsut watch stories - you shape them.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 flex-shrink-0">
            <div className="relative mb-8">
              <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="text-primary text-2xl py-6">In the Press</p>
            </div>
            <div className="pl-24">
              <Image src="/images/press.png" width={600} height={500} alt="trophy" className="w-40 h-auto"/>
            </div>
          </div>
        </div>

        <div>
          <div data-aos="fade-up" className="flex items-center gap-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-primary text-2xl">FAQs</p>
          </div>
          <div className="flex gap-64 py-8">
            <div className="flex-shrink-0">
              <div className="text-white text-2xl">
                <p data-aos="fade-up" className="mb-4">Questions?</p>
                <p data-aos="fade-up">We have Answers.</p>
              </div>
            </div>
            <div data-aos="fade-up" className="flex-grow">
              <Accordion items={FAQs} />
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="flex justify-around items-center mb-8">
          <Button
            buttonType="secondary"
            typography="Watch Now"
            icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
            className="mx-auto"
          ></Button>
          <Button
            buttonType="secondary"
            typography="Join the Creator"
            icon={<Image src="/icons/arrow.svg" width="20" height="20" className="w-6" alt="arrow-icon" />}
            className="mx-auto"
          ></Button>
        </div>
        <div className="flex items-center justify-center gap-6 py-12">
          <Image src="/icons/linkedin.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/insta.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/discord.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/facebook.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/youtube.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/x.png" alt="star" width="200" height="200" className="rounded-md w-10" />
          <Image src="/icons/email.png" alt="star" width="200" height="200" className="rounded-md w-10" />
        </div>
      </div>
    </div>
  );
}
