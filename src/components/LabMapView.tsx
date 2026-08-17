'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { expeditionLabs, getSubmittedFeedbackForUser } from '@/lib/expeditionData';
import ImageWithFallback from './ImageWithFallback';
import ProductObservationModal from './ProductObservationModal';
import CertificateFragmentModal from './CertificateFragmentModal';
import { motion, AnimatePresence } from 'framer-motion';

const labProductsMap: Record<string, Array<{ id: string; name: string; icon: string; description?: string }>> = {
  a: [
    { id: 'a1', name: 'Trueconnect.jio', icon: '📶', description: 'Enterprise connectivity and high-speed network infrastructure.' },
    { id: 'a2', name: 'Drone', icon: '🚁', description: 'Autonomous aerial surveying and smart monitoring.' },
    { id: 'a3', name: 'Samsung Ecosystem', icon: '📱', description: 'Integrated multi-device mobile intelligence suite.' },
    { id: 'a4', name: 'IP CAMERA', icon: '📹', description: 'High-definition network surveillance system.' },
    { id: 'a5', name: '100 Billion Tech', icon: '💰', description: 'Fintech and large-scale digital transaction platform.' },
    { id: 'a6', name: 'VSCode', icon: '💻', description: 'Cloud IDE and developer productivity workspace.' },
    { id: 'a7', name: 'Temperature Calibrator', icon: '🌡️', description: 'Precision thermal sensor calibration device.' },
  ],
  c: [
    { id: 'c1', name: 'SimilaCure', icon: '💊', description: 'Biomedical diagnostic and drug matching system.' },
    { id: 'c2', name: 'Allotrak', icon: '📊', description: 'Resource allocation and telemetry dashboard.' },
    { id: 'c3', name: 'Reliance Samarth', icon: '🛍️', description: 'Retail supply chain & merchant platform.' },
    { id: 'c4', name: 'Video Door Phone', icon: '🚪', description: 'Smart door security and video intercom.' },
    { id: 'c5', name: 'Motherboard Full Setup Raw - 1', icon: '⚙️', description: 'Custom PCB design and hardware architecture.' },
    { id: 'c6', name: 'Dial Club', icon: '☎️', description: 'Smart voice communication suite.' },
    { id: 'c7', name: 'The Hobby Tribe', icon: '🌐', description: 'Interactive community learning platform.' },
    { id: 'c8', name: 'Copilot', icon: '🤖', description: 'AI assistant & automated workflow agent.' },
    { id: 'c9', name: 'IOT Monitoring', icon: '📡', description: 'Real-time telemetry sensor grid.' },
  ],
  d: [
    { id: 'd1', name: 'DND Services', icon: '🚫', description: 'Spam filtering and privacy management.' },
    { id: 'd2', name: 'Her Circle', icon: '♀️', description: 'Women empowerment and community network.' },
    { id: 'd3', name: 'Optimyz', icon: '📈', description: 'Performance optimization and predictive analytics.' },
    { id: 'd4', name: 'RDiscovery', icon: '🔬', description: 'Academic paper discovery & research engine.' },
    { id: 'd5', name: 'PaperPal', icon: '📝', description: 'AI writing assistant and grammar auditor.' },
    { id: 'd6', name: 'MDVR Camera Shivsahi', icon: '🚌', description: 'Vehicle dashcam & transport security recorder.' },
    { id: 'd7', name: 'Motherboard Full Setup Raw - 2', icon: '🛠️', description: 'Advanced circuit board & chip architecture.' },
    { id: 'd8', name: 'OSM', icon: '🗺️', description: 'Open mapping and spatial data infrastructure.' },
    { id: 'd9', name: 'Apple Ecosystem', icon: '🍏', description: 'Cross-device macOS and iOS development.' },
    { id: 'd10', name: 'EDQuest', icon: '🎓', description: 'Interactive STEM education portal.' },
  ],
};

interface LabMapViewProps {
  labId: string;
}

export default function LabMapView({ labId }: LabMapViewProps) {
  const router = useRouter();
  const { user } = useUser();
  const userEmail = user?.email || '';

  const labConfig = expeditionLabs[labId] || expeditionLabs['a'];
  const products = labProductsMap[labId] || labProductsMap['a'];

  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; icon: string; description?: string } | null>(null);
  const [showFragmentModal, setShowFragmentModal] = useState(false);

  useEffect(() => {
    if (userEmail) {
      const submitted = getSubmittedFeedbackForUser(userEmail);
      setSubmittedIds(submitted);
    }
  }, [userEmail]);

  const handleProductSubmitSuccess = (productId: string) => {
    const updatedSubmitted = [...new Set([...submittedIds, productId])];
    setSubmittedIds(updatedSubmitted);
    setSelectedProduct(null);

    const labProductIds = products.map((p) => p.id);
    const labCompleteNow = labProductIds.every((pid) => updatedSubmitted.includes(pid));

    if (labCompleteNow) {
      setTimeout(() => {
        setShowFragmentModal(true);
      }, 600);
    }
  };

  const completedCount = products.filter((p) => submittedIds.includes(p.id)).length;
  const totalCount = products.length;

  const completedPoints: Array<{ x: number; y: number }> = [];
  products.forEach((p) => {
    if (submittedIds.includes(p.id)) {
      const coord = labConfig.checkpoints[p.id] || { x: 50, y: 50 };
      completedPoints.push(coord);
    }
  });

  const svgPathD = completedPoints.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0c0e10',
        color: '#F4ECD8',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Map Header Overlay */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#0D1520',
          borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#D4AF37', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '1.5px' }}>
            🧭 SECTOR MAP // {labConfig.name}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#F8F1E1', fontFamily: 'var(--font-display)', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {labConfig.title}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#9E8B6B', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            RELICS CHARTED
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: completedCount === totalCount ? '#4ADE80' : '#D4AF37', fontFamily: 'var(--font-display)' }}>
            {completedCount} / {totalCount}
          </div>
        </div>
      </div>

      {/* Main Expedition Map Canvas Container */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          aspectRatio: '4 / 3',
          minHeight: '460px',
          backgroundColor: '#070C12',
          overflow: 'hidden',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '10px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.8)',
        }}
      >
        <ImageWithFallback
          src={labConfig.mapImage}
          alt={labConfig.title}
          fallbackTitle={`${labConfig.name} MAP`}
          fallbackIcon="🗺️"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
        />

        {/* Dark Vignette Frame Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.6)',
            zIndex: 5,
          }}
        />

        {/* Golden SVG Route Lines Overlay */}
        {completedPoints.length > 1 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <motion.path
              d={svgPathD}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeDasharray="3 2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </svg>
        )}

        {/* Checkpoint Pins Overlay */}
        {products.map((product) => {
          const coord = labConfig.checkpoints[product.id] || { x: 50, y: 50 };
          const isSubmitted = submittedIds.includes(product.id);

          return (
            <div
              key={product.id}
              style={{
                position: 'absolute',
                left: `${coord.x}%`,
                top: `${coord.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
              }}
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(product)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: isSubmitted ? 'rgba(31, 58, 43, 0.95)' : 'rgba(13, 21, 32, 0.9)',
                  color: isSubmitted ? '#4ADE80' : '#D4AF37',
                  border: `2px solid ${isSubmitted ? '#4ADE80' : '#D4AF37'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: isSubmitted 
                    ? '0 0 15px rgba(74, 222, 128, 0.6), 0 4px 10px rgba(0,0,0,0.8)' 
                    : '0 0 15px rgba(212, 175, 55, 0.5), 0 4px 10px rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(4px)',
                  padding: 0,
                }}
              >
                {isSubmitted ? '✓' : product.icon}
              </motion.button>

              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.5px',
                  color: isSubmitted ? '#86EFAC' : '#F3E5AB',
                  backgroundColor: 'rgba(10, 16, 26, 0.88)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${isSubmitted ? 'rgba(74, 222, 128, 0.4)' : 'rgba(212, 175, 55, 0.4)'}`,
                  marginTop: '5px',
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {product.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 40,
          backgroundColor: '#0D1520',
          borderTop: '1px solid rgba(212, 175, 55, 0.4)',
          padding: '0.85rem 1.25rem max(0.85rem, env(safe-area-inset-bottom))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <button
          onClick={() => router.push('/labs')}
          style={{
            backgroundColor: 'rgba(212, 175, 55, 0.12)',
            color: '#F3E5AB',
            border: '1px solid #D4AF37',
            borderRadius: '4px',
            padding: '0.6rem 1.2rem',
            fontSize: '0.85rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            cursor: 'pointer',
            minHeight: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          ← Sector Map
        </button>

        <div style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
          ✦ Select any pin to log telemetry ✦
        </div>
      </div>

      {/* Product Discovery / Feedback Form Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductObservationModal
            product={selectedProduct}
            isSubmitted={submittedIds.includes(selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onSuccess={() => handleProductSubmitSuccess(selectedProduct.id)}
          />
        )}
      </AnimatePresence>

      {/* Lab Fragment Recovery Modal */}
      <AnimatePresence>
        {showFragmentModal && (
          <CertificateFragmentModal
            lab={labConfig}
            onClose={() => {
              setShowFragmentModal(false);
              router.push('/labs');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
