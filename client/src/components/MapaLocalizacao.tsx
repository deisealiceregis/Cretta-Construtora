import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { COMPANY_INFO } from '@/const';

// Coordenadas da CRETTA Construtora em Balneário Camboriú - SC
// Rua Tailândia, 491 - Bairro Nações
const CRETTA_COORDINATES: [number, number] = [-26.9897, -48.6297];

export default function MapaLocalizacao() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    if (!mapContainer.current) return;

    // Criar mapa
    map.current = L.map(mapContainer.current).setView(CRETTA_COORDINATES, 15);

    // Adicionar tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Criar marcador customizado
    const markerIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Adicionar marcador com popup
    const popupContent = `
      <div style="font-size: 14px; color: #000; min-width: 200px;">
        <h3 style="font-weight: bold; color: #2D5F4F; margin-bottom: 8px;">
          CRETTA Construtora
        </h3>
        <p style="color: #333; margin-bottom: 4px;">
          <strong>Endereço:</strong>
        </p>
        <p style="color: #666; font-size: 12px; margin-bottom: 8px;">
          ${COMPANY_INFO.address}<br />
          ${COMPANY_INFO.neighborhood}<br />
          ${COMPANY_INFO.city}<br />
          CEP: ${COMPANY_INFO.cep}
        </p>
        <p style="color: #333; margin-bottom: 4px;">
          <strong>Telefone:</strong>
        </p>
        <p style="color: #666; font-size: 12px; margin-bottom: 8px;">
          <a 
            href="tel:${COMPANY_INFO.phone1}" 
            style="color: #4CAF50; text-decoration: underline;"
          >
            ${COMPANY_INFO.phone1}
          </a>
        </p>
        <p style="color: #333; margin-bottom: 4px;">
          <strong>Email:</strong>
        </p>
        <p style="color: #666; font-size: 12px;">
          <a 
            href="mailto:${COMPANY_INFO.email}" 
            style="color: #4CAF50; text-decoration: underline;"
          >
            ${COMPANY_INFO.email}
          </a>
        </p>
      </div>
    `;

    L.marker(CRETTA_COORDINATES, { icon: markerIcon })
      .addTo(map.current)
      .bindPopup(popupContent, { maxWidth: 300 })
      .openPopup();

    return () => {
      // Cleanup não necessário para este caso
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-96 rounded-lg overflow-hidden shadow-md border border-border"
      style={{ zIndex: 1 }}
    />
  );
}
