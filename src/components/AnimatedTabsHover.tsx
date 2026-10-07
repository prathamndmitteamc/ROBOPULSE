import React from 'react';
import { AnimatedBackground } from '@/components/core/animated-background';

export interface AnimatedTabsHoverProps {
  tabs?: string[];
  activeTab?: string;
  onTabClick?: (tab: string) => void;
  className?: string;
  buttonClassName?: string;
}

export function AnimatedTabsHover({
  tabs = ['Home', 'About', 'Services', 'Contact'],
  activeTab,
  onTabClick,
  className = '',
  buttonClassName = '',
}: AnimatedTabsHoverProps = {}) {
  const TABS = tabs && tabs.length > 0 ? tabs : ['Home', 'About', 'Services', 'Contact'];

  return (
    <div className={`flex flex-row ${className}`}>
      <AnimatedBackground
        defaultValue={activeTab || TABS[0]}
        className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.3,
        }}
        enableHover
      >
        {TABS.map((tab, index) => (
          <button
            key={index}
            data-id={tab}
            type="button"
            onClick={() => onTabClick?.(tab)}
            className={`px-3.5 py-1.5 typo-nav font-medium transition-colors duration-200 ${
              buttonClassName ||
              'text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}
