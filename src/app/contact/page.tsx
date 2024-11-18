import MapComponent from '@/app/contact/components/map'
import NavHeader from '@/components/nav-header'
import FormSection from './components/form-section'

export default function Contact() {
  return (
    <>
      <div className="bg-light-grey">
        <NavHeader />
        <div className="flex h-[200px] items-end md:h-[400px]">
          <div className="w-96 pb-5 pl-6 md:w-[600px] md:pb-12 md:pl-24">
            <h1 className="mb-12 text-3xl md:text-6xl">Entre em contato</h1>
            <p className="text-sm">
              Nossa equipe está aqui para ajudá-lo em sua jornada rumo a um
              futuro energético sustentável e eficiente.
            </p>
          </div>
        </div>
      </div>

      <FormSection />

      <div className="mt-32 h-[500px] w-screen">
        <MapComponent />
      </div>
    </>
  )
}
