/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {   
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.cloudinary.com",
                pathname: "**/v1/media/**"

            }
        ]
      },
};

export default nextConfig;