import { Aboutus } from '@/components/common/Aboutus'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/users/Header'

export const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-20 md:pt-30 px-5 lg:px-40">
        <Aboutus />
      </main>

      <Footer />
    </>
  );
}
