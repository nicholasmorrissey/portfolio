import { Analytics } from "@vercel/analytics/next";
import Hero from "../components/Hero.tsx";

const Home = () => {
  return (
    <div>
      <Analytics />
      <Hero />
    </div>
  );
};

export default Home;
