import { HeroSection } from '@/components/home/hero-section';
import { TrustSection } from '@/components/home/trust-section';
import { ServicesSection } from '@/components/home/services-section';
import { ServiceSearch } from '@/components/home/service-search';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { ShowProblemSection } from '@/components/home/show-problem-section';
import { LocationServicesSection } from '@/components/home/location-services-section';
import { FurnitureTransformSection } from '@/components/home/furniture-transform-section';
import { HomeDecorationSection } from '@/components/home/home-decoration-section';
import { BeforeAfterShowcaseSection } from '@/components/home/before-after-showcase-section';
import { WhyChooseUsSection } from '@/components/home/why-choose-us-section';
import { QualityTrustSection } from '@/components/home/quality-trust-section';
import { ImpactSection } from '@/components/home/impact-section';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { CTASection } from '@/components/cta-section';
import { SectionHeading } from '@/components/section-heading';
import { testimonials } from '@/data/testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ServiceSearch />
      <HowItWorksSection />
      <ShowProblemSection />
      <LocationServicesSection />
      {/* <FurnitureTransformSection />
      <HomeDecorationSection />
      <BeforeAfterShowcaseSection /> */}
      <WhyChooseUsSection />
      <QualityTrustSection />

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-surface-50">
        <div className="container-wide">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Customers Say"
            description="Real feedback from homeowners who trust us with their homes."
          />
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <ImpactSection />
      <CTASection variant="dark" />
    </>
  );
}
