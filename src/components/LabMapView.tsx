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
          backgroundColor: '#F3E5C8',
          borderBottom: '2px solid #A88448',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
          backgroundImage: 'linear-gradient(135deg, #F5E8CE 0%, #E6D2AA 100%)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: '#652B19', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
            📜 {labConfig.name}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2C1E14', fontFamily: 'var(--font-display)', textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
            {labConfig.title}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#6B553B', fontWeight: '700', textTransform: 'uppercase' }}>
            Relics Charted
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: completedCount === totalCount ? '#1F3A2B' : '#2C1E14', fontFamily: 'var(--font-display)' }}>
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
          maxWidth: '640px',
          margin: '0 auto',
          aspectRatio: '4 / 3',
          minHeight: '440px',
          backgroundColor: '#16120B',
          overflow: 'hidden',
          border: '3px double #A88448',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.6)',
        }}
      >
        <ImageWithFallback
          src={labConfig.mapImage}
          alt={labConfig.title}
          fallbackTitle={`${labConfig.name} MAP`}
          fallbackIcon="🗺️"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              strokeWidth="1.5"
              strokeDasharray="3 1.5"
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
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(product)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: isSubmitted ? '#1F3A2B' : '#F3E5C8',
                  color: isSubmitted ? '#F3E5AB' : '#2C1E14',
                  border: `2px solid ${isSubmitted ? '#D4AF37' : '#A88448'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.6), 0 0 10px rgba(212,175,55,0.4)',
                  padding: 0,
                }}
              >
                {isSubmitted ? '📜' : product.icon}
              </motion.button>
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-serif)',
                  color: isSubmitted ? '#1F3A2B' : '#2C1E14',
                  backgroundColor: '#F3E5C8',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid #A88448',
                  marginTop: '4px',
                  pointerEvents: 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
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
          backgroundColor: '#F3E5C8',
          borderTop: '2px solid #A88448',
          padding: '0.85rem 1.25rem max(0.85rem, env(safe-area-inset-bottom))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(135deg, #F5E8CE 0%, #E6D2AA 100%)',
          boxShadow: '0 -4px 15px rgba(0,0,0,0.4)',
        }}
      >
        <button
          onClick={() => router.push('/labs')}
          style={{
            backgroundColor: '#F7EEDC',
            color: '#2C1E14',
            border: '1px solid #A88448',
            borderRadius: '4px',
            padding: '0.6rem 1.2rem',
            fontSize: '0.85rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            cursor: 'pointer',
            minHeight: '40px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          ← Return to Sectors Map
        </button>

        <div style={{ fontSize: '0.9rem', color: '#652B19', fontWeight: '700', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          Select a relic pin to evaluate 🗺️
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
