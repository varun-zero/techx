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
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
            {labConfig.name}
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--foreground)' }}>
            {labConfig.title}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            Evaluations Submitted
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: completedCount === totalCount ? '#22c55e' : 'var(--foreground)' }}>
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
          backgroundColor: '#f1f5f9',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
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
              stroke="#2563eb"
              strokeWidth="1.2"
              strokeDasharray="2 1"
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
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isSubmitted ? '#22c55e' : '#ffffff',
                  color: isSubmitted ? '#ffffff' : '#0f172a',
                  border: `2px solid ${isSubmitted ? '#16a34a' : '#2563eb'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
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
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: isSubmitted ? '#166534' : '#0f172a',
                  backgroundColor: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  marginTop: '3px',
                  pointerEvents: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-color)',
          padding: '0.75rem 1.25rem max(0.75rem, env(safe-area-inset-bottom))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => router.push('/labs')}
          style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '0.6rem 1.2rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '40px',
          }}
        >
          ← Back to Labs
        </button>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
          Click any product pin to evaluate 📝
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
