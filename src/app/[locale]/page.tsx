import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BreadcrumbBar from '@/components/BreadcrumbBar';
import SafetySection from '@/components/SafetySection';
import Intro from '@/components/Intro';
import HistorySection from '@/components/HistorySection';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import SeasonsSection from '@/components/SeasonsSection';
import WeatherSection from '@/components/WeatherSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import VisitRoutesSection from '@/components/VisitRoutesSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import ResponsibilitySection from '@/components/ResponsibilitySection';
import MapEmbed from '@/components/MapEmbed';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BreadcrumbBar />
        <SafetySection />
        <Intro />
        <HistorySection />
        <BasicInfo />
        <HoursSection />
        <SeasonsSection />
        <WeatherSection />
        <FacilitiesSection />
        <TicketsSection />
        <TransportSection />
        <RouteSection />
        <VisitRoutesSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <ResponsibilitySection />
        <MapEmbed />
        <FaqSection />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
