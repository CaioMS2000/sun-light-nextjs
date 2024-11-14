'use client'
import { z } from 'zod'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: -16.715799249062005,
  lng: -49.2982311414151,
}

const googleMapsKeySchema = z.string().min(1)

export default function MapComponent() {
  const envParse = googleMapsKeySchema.safeParse(
    process.env.NEXT_PUBLIC_MAPS_API_KEY
  )
  const isMapsKeyValid = envParse.success
  const mapsAPIKey = envParse.data ?? 'KEY-NOT-FOUND'
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapsAPIKey,
  })

  return (
    <>
      <div className="h-96 w-screen">
        {isLoaded && isMapsKeyValid ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
          >
            <Marker
              position={center}
              options={{
                label: {
                  text: 'Sun Light',
                  className: 'map-marker text-green-800',
                },
              }}
              onClick={e => {
                navigator.clipboard.writeText('')
              }}
            />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
