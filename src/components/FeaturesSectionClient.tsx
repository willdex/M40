'use client'

import { useState } from 'react'
import FeaturesSection from './FeaturesSection'
import EfficiencyModal from './EfficiencyModal'

interface EfficiencyItem {
  id: string
  icon: string
  title: string
  shortDesc: string
  detailDesc: string
  image: string
  ctaText: string
  ctaLink: string
}

interface FeaturesSectionClientProps {
  items: EfficiencyItem[]
}

export default function FeaturesSectionClient({ items }: FeaturesSectionClientProps) {
  const [selectedItem, setSelectedItem] = useState<EfficiencyItem | null>(null)

  return (
    <>
      <FeaturesSection 
        items={items} 
        onItemClick={setSelectedItem}
      />
      <EfficiencyModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  )
}
