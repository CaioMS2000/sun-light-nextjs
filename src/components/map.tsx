import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, useToast } from "@chakra-ui/react";

interface Props {
	mapsAPIKey: any;
  mapsAddress: string;
}

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: -16.715799249062005,
	lng: -49.2982311414151,
};

function Map({ mapsAPIKey, mapsAddress }: Props) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: mapsAPIKey,
	});
  const toast = useToast()

	return (
		<>
			<Box w={"100vw"} h={"80vh"} className={`MAP3`}>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={17}
					>
						<Marker
							position={center}
							options={{
								label: {
									text: "Sun Light",
									className: "map-marker",
								},
							}}
							onClick={(e) => {
								navigator.clipboard.writeText(`${mapsAddress}`);
                toast({
                  title: 'Endereço do Maps copiado',
                  status: "success", //info" | "warning" | "success" | "error" | "loading" | undefined
                  isClosable: true,
                });
							}}
						/>
					</GoogleMap>
				) : (
					<></>
				)}
			</Box>
		</>
	);
}

export default React.memo(Map);
