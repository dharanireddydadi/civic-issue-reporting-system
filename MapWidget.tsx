import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Issue } from '../issues/IssueCard';

interface MapWidgetProps {
  issues: { id: string, lat: number, lng: number, severity: string }[];
  onMarkerClick: (issue: any) => void;
}

const severityColors = {
  'High': '#EF4444', // red-500
  'Medium': '#F59E0B', // amber-500
  'Low': '#10B981', // emerald-500
};

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const MapWidget: React.FC<MapWidgetProps> = ({ issues, onMarkerClick }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // In a real app, this key would be in a .env file.
        googleMapsApiKey: process.env.REACT_APP_API_KEY || ""
    });
    
    const mapCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates for demo

    if (!isLoaded) return <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-b-2xl">Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerClassName="w-full h-full rounded-b-2xl"
            center={mapCenter}
            zoom={13}
            options={{
                styles: mapStyles,
                disableDefaultUI: true,
                zoomControl: true,
            }}
        >
            {issues.map(issue => (
                <MarkerF 
                    key={issue.id} 
                    position={{ lat: issue.lat, lng: issue.lng }} 
                    onClick={() => onMarkerClick(issue)}
                    icon={{
                        // FIX: Cast window to any to access google.maps, as TypeScript isn't aware of the global `google` object from the Maps API script.
                        path: (window as any).google.maps.SymbolPath.CIRCLE,
                        fillColor: severityColors[issue.severity as keyof typeof severityColors] || '#6B7280',
                        fillOpacity: 0.9,
                        strokeColor: '#0b1020',
                        strokeWeight: 2,
                        scale: 8
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default MapWidget;