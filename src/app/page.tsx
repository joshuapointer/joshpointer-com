"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FloatingPhone from "@/components/FloatingPhone";
import ContentView from "@/components/ContentView";
import { useWindowSize } from "@/hooks/useWindowSize";
import MobileView from "@/components/MobileView";
import Layout from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  const { width, height } = useWindowSize();
  const isPortrait = height > width;

  if (isPortrait) {
    return (
      <PageTransition>
        <MobileView />
      </PageTransition>
    );
  }

  return (
    <Layout>
      <ScrollProgress />
      <div className="fixed left-0 w-1/3 lg:w-2/5 h-screen">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <FloatingPhone />
          </Suspense>
        </Canvas>
      </div>
      <PageTransition>
        <div className="absolute right-0 w-2/3 lg:w-3/5 min-h-screen">
          <ContentView />
        </div>
      </PageTransition>
    </Layout>
  );
}
