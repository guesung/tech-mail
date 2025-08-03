import Logo from "@/public/logo.png";
import Image from "next/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TechBlogPosts";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={Logo} alt="TechMail" width={400} height={400} />
      </div>
    ),
    {
      ...size,
    }
  );
}
