"use client";
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import ContactUs from "../../components/(AboutPageComponents)/ContactUs";

export default function FrontPage() {
  return (
    <MainLayout>
        <ContactUs />
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="flex items-center justify-center gap-6 py-12">
                <a href="https://www.linkedin.com/company/izsit">
                    <Image src="/icons/linkedin.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="https://www.instagram.com/izsit_ai">
                    <Image src="/icons/insta.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="https://www.youtube.com/@izsit_ai">
                    <Image src="/icons/youtube.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="https://x.com/izsit_ai">
                    <Image src="/icons/x.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="#">
                    <Image src="/icons/discord.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="#">
                    <Image src="/icons/facebook.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
                <a href="#">
                    <Image src="/icons/email.png" alt="star" width="200" height="200" className="rounded-md w-10" />
                </a>
            </div>
        </div>
    </MainLayout>
  );
}
