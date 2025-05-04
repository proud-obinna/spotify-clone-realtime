import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';
import { usePlayerStore } from '@/stores/usePlayerStore';

function HomePage() {

  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, FeaturedSongs, madeForYouSongs, trendingSongs } = useMusicStore();
  const {initializeQueue} = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if(madeForYouSongs.length > 0 && FeaturedSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...FeaturedSongs, ...madeForYouSongs, ...trendingSongs]
      initializeQueue(allSongs);
    }
  },[initializeQueue, madeForYouSongs, trendingSongs, FeaturedSongs]);

  return (
    <main className='overflow-hidden rounded-md h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl mb-6 font-bold'>Discover</h1>
          <FeaturedSection />
        

          <div className='space-y-8'>
            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} /> 
          </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
