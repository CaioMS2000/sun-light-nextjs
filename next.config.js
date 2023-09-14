/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: "/projetos",
        destination: "/projects"
      },
      {
        source: "/energia-solar",
        destination: "/solarEnergy"
      },
      {
        source: "/contato",
        destination: "/contact"
      },
      {
        source: "/sobre",
        destination: "/about"
      },
    ]
  }
}

module.exports = nextConfig
