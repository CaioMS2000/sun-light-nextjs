'use client'
import { z } from 'zod'
import {
	APIProvider,
	Map as MapComponent,
	useMap,
	AdvancedMarker,
	Pin,
} from '@vis.gl/react-google-maps'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import type { Marker } from '@googlemaps/markerclusterer'
import { useEffect, useState, useRef } from 'react'

const center = {
	//   lat: -16.715799249062005,
	//   lng: -49.2982311414151,
	lat: -16.715799,
	lng: -49.298231,
}
const googleMapsEnvSchema = z.object({
	NEXT_PUBLIC_MAP_ID: z.string().min(1),
	NEXT_PUBLIC_MAPS_API_KEY: z.string().min(1),
})
const envParse = googleMapsEnvSchema.safeParse({
	NEXT_PUBLIC_MAP_ID: process.env.NEXT_PUBLIC_MAP_ID,
	NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
})
const mapsAPIKey = envParse.data

export default function Intro() {
	if (!mapsAPIKey) {
		return (
			<div className="h-80 w-screen">
				<h1>Invalid Maps API Key</h1>
				<p>
					Please check your <code>.env</code> file and make sure you have a valid
					Google Maps API key.
				</p>
			</div>
		)
	}
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<APIProvider apiKey={mapsAPIKey.NEXT_PUBLIC_MAPS_API_KEY}>
				<MapComponent
					center={{ ...center }}
					//   zoom={20}
					defaultZoom={20}
					mapId={mapsAPIKey.NEXT_PUBLIC_MAP_ID}
				>
					<Markers
						points={[{ lat: center.lat, lng: center.lng, key: 'Sun Light' }]}
					/>
				</MapComponent>
			</APIProvider>
		</div>
	)
}

type Point = google.maps.LatLngLiteral & { key: string }
type Props = { points: Point[] }

const Markers = ({ points }: Props) => {
	const map = useMap()
	const [markers, setMarkers] = useState<{ [key: string]: Marker }>({})
	const clusterer = useRef<MarkerClusterer | null>(null)

	useEffect(() => {
		if (!map) return
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map })
		}
	}, [map])

	useEffect(() => {
		clusterer.current?.clearMarkers()
		clusterer.current?.addMarkers(Object.values(markers))
	}, [markers])

	const setMarkerRef = (marker: Marker | null, key: string) => {
		if (marker && markers[key]) return
		if (!marker && !markers[key]) return

		setMarkers(prev => {
			if (marker) {
				return { ...prev, [key]: marker }
			} else {
				const newMarkers = { ...prev }
				delete newMarkers[key]
				return newMarkers
			}
		})
	}

	return (
		<>
			{points.map(point => (
				<AdvancedMarker
					position={point}
					key={point.key}
					ref={marker => setMarkerRef(marker, point.key)}
				>
					<Pin />
				</AdvancedMarker>
			))}
		</>
	)
}
