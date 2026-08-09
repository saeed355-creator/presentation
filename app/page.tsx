import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemFlow from '@/components/ProblemFlow';
import BeforeAfter from '@/components/BeforeAfter';
import PromptGenerator from '@/components/PromptGenerator';
import AIWorkflow from '@/components/AIWorkflow';
import StoryEngine from '@/components/StoryEngine';
import FeatureCard from '@/components/FeatureCard';
import LiveDemoGenerator from '@/components/LiveDemoGenerator';
import TargetUsers from '@/components/TargetUsers';
import TemplateCard from '@/components/TemplateCard';
import PricingCard from '@/components/PricingCard';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function PublicLandingPage() {
  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F4F4F0] text-[#111111] selection:bg-[#111111]/90 selection:text-white">
      <Navbar />
      <Hero />
      <ProblemFlow />
      <BeforeAfter />
      <PromptGenerator />
      <AIWorkflow />
      <StoryEngine />
      <FeatureCard />
      <TemplateCard />
      <LiveDemoGenerator />
      <TargetUsers />
      <PricingCard />
      <FinalCTA />
      <Footer />
    </main>
  );
}
