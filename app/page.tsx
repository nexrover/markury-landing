import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import WhyMarkury from '@/components/WhyMarkury'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <UseCases />
        <WhyMarkury />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
