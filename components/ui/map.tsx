import React, { Suspense, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Dynamically import react-leaflet components
const MapComponent = ({ lat, lng }: { lat: number; lng: number }) => {
    const [MapContainer, setMapContainer] = useState<any>(null);
    const [TileLayer, setTileLayer] = useState<any>(null);
    const [Marker, setMarker] = useState<any>(null);
    const [Popup, setPopup] = useState<any>(null);

    useEffect(() => {
        // Dynamically import the components
        import('react-leaflet').then((module) => {
            setMapContainer(module.MapContainer);
            setTileLayer(module.TileLayer);
            setMarker(module.Marker);
            setPopup(module.Popup);
        });
    }, []);

    if (!MapContainer || !TileLayer || !Marker || !Popup) {
        return <div className="h-[300px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">Loading map...</div>;
    }

    return (
        <div className="h-[300px] w-full rounded-lg overflow-hidden">
            <MapContainer
                center={[lat, lng]}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[lat, lng]}>
                    <Popup>Alert Location</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;