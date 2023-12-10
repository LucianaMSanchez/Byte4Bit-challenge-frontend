import HomeComponent from '@/components/HomeComponent'
import { useAuthentication } from '@/utils/tokenAuth';

export default async function HomePage() {
  useAuthentication();
  return (
    <div>
      <HomeComponent />
    </div>
  )
}
