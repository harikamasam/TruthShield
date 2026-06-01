import { useEffect, useMemo, useState } from "react";
import { analyzeText } from "./api";
import AnalysisSequence from "./components/AnalysisSequence";
import AnalyzerInput from "./components/AnalyzerInput";
import BrowserExtensionMockup from "./components/BrowserExtensionMockup";
import ClaimVerificationReport from "./components/ClaimVerificationReport";
import ClaimTable from "./components/ClaimTable";
import FinalRecommendation from "./components/FinalRecommendation";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowTruthShieldThinks from "./components/HowTruthShieldThinks";
import LiveScanOverlay from "./components/LiveScanOverlay";
import ManipulationVisualizer from "./components/ManipulationVisualizer";
import Navbar from "./components/Navbar";
import RedFlags from "./components/RedFlags";
import ReportNarrativeHeader from "./components/ReportNarrativeHeader";
import RiskReport from "./components/RiskReport";
import SamplePresetGrid from "./components/SamplePresetGrid";
import SignalScoringSection from "./components/SignalScoringSection";
import SocialIntelPreview from "./components/SocialIntelPreview";
import StorytellingSection from "./components/StorytellingSection";
import SuspicionSection from "./components/SuspicionSection";
import TrendingNarrativeRisks from "./components/TrendingNarrativeRisks";
import TrustScoreCard from "./components/TrustScoreCard";

const sampleText =
  "BREAKING: Secret sources say a miracle vaccine cure is being hidden by corrupt officials. Everyone knows the mainstream media will not report this shocking truth. Share now before it is removed.";

const scanStages = [
  "Scanning narrative structure...",
  "Detecting emotional manipulation...",
  "Checking source credibility...",
  "Identifying propaganda framing...",
  "Estimating AI-generated probability...",
  "Running trust intelligence engine..."
];

export default function App() {
  const [text, setText] = useState(sampleText);
  const [report, setReport] = useState(null);
  const [pendingReport, setPendingReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const loadingStage = useMemo(() => {
    const index = Math.min(scanStages.length - 1, Math.floor((progress / 100) * scanStages.length));
    return scanStages[index];
  }, [progress]);

  useEffect(() => {
    if (!loading) {
      setProgress((current) => (current >= 100 ? 100 : 0));
      return undefined;
    }

    setProgress(8);
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.random() * 13 + 6, 94));
    }, 360);

    return () => window.clearInterval(timer);
  }, [loading]);

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setReport(null);
    setPendingReport(null);
    setProgress(8);
    try {
      const result = await analyzeText(text);
      setPendingReport(result);
      setProgress(100);
      window.setTimeout(() => {
        setReport(result);
        setPendingReport(null);
      }, 2200);
    } catch (err) {
      setError(err.message);
    } finally {
      window.setTimeout(() => setLoading(false), 2450);
    }
  }

  function fillSample(sample) {
    setText(sample);
    setReport(null);
    setPendingReport(null);
    setProgress(0);
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  }

  function loadDefaultSample() {
    fillSample(
      "BREAKING: Secret sources say doctors confirmed a miracle cure is being hidden by corrupt officials. Share now before the mainstream media removes it."
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-stone-50 text-neutral-950">
      <Navbar />
      <main>
        <Hero onAnalyzeClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })} />
        <StorytellingSection />
        <SamplePresetGrid onSelectSample={fillSample} />
        <section className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:py-24">
          <AnalyzerInput
            text={text}
            setText={setText}
            onAnalyze={handleAnalyze}
            loading={loading}
            error={error}
            onTrySample={loadDefaultSample}
          />
          <div className="grid gap-6">
            <TrustScoreCard report={report} loading={loading} progress={progress} />
            <AnalysisSequence loading={loading} progress={progress} stage={loadingStage} report={report || pendingReport} stages={scanStages} />
          </div>
        </section>
        <LiveScanOverlay loading={loading} progress={progress} stage={loadingStage} stages={pendingReport?.analysis_steps || scanStages} />

        {report && (
          <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-4 progressive-report lg:gap-12">
            <ReportNarrativeHeader report={report} />
            <ClaimVerificationReport report={report} />
            <RiskReport report={report} />
            <SuspicionSection report={report} />
            <ManipulationVisualizer report={report} />
            <SignalScoringSection report={report} />
            <HowTruthShieldThinks report={report} />
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
              <ClaimTable claims={report.key_claims} />
              <RedFlags flags={report.red_flags} />
            </div>
            <FinalRecommendation report={report} />
          </section>
        )}
        <TrendingNarrativeRisks />
        <BrowserExtensionMockup />
        <SocialIntelPreview onSelectSample={fillSample} />
      </main>
      <Footer />
    </div>
  );
}
