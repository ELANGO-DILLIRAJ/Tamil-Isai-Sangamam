import HeroSplash from '@/components/HeroSplash';
import ChiefGuests from '@/components/ChiefGuests';
import SpecialGuests from '@/components/SpecialGuests';
import LineupGrid from '@/components/LineupGrid';
import TimeArc from '@/components/TimeArc';
import StadiumGuide from '@/components/StadiumGuide';

export default function HomePage() {
  return (
    <>
      <HeroSplash />
      <ChiefGuests />
      <SpecialGuests />
      <LineupGrid />
      <TimeArc />
      <StadiumGuide />
    </>
  );
}

