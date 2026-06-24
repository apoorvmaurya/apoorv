'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedSection from '@/components/ui/AnimatedSection';

// --- Reusable Code Snippets ---
const codeSnippets = {
    streaming: `// Reusable React Hook for SSE LLM Token Streaming
import { useState, useCallback } from 'react';

export function useLLMStream() {
  const [data, setData] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const stream = useCallback(async (url: string, body: any) => {
    setIsStreaming(true);
    setData('');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setData(prev => prev + chunk);
      }
    } catch (err) {
      console.error('LLM stream error:', err);
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { data, isStreaming, stream };
}`,
    agent: `// Type definition & state-machine for Agentic Workflows
export type AgentStep = {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  detail: string;
};

// Orchestrator executes step-by-step logic and checkpoints
export async function runAgentCycle(
  steps: AgentStep[],
  onUpdate: (updated: AgentStep[]) => void
) {
  const updated = [...steps];
  
  for (let i = 0; i < updated.length; i++) {
    updated[i].status = 'running';
    onUpdate([...updated]);
    
    // Simulate task execution / Human-in-the-Loop gates
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updated[i].status = 'success';
    onUpdate([...updated]);
  }
}`,
    vector: `// Pure TS Cosine Similarity Matcher for pgvector workflows
export function computeCosineSimilarity(str1: string, str2: string): number {
  const tokenize = (s: string) => s.toLowerCase().match(/\\w+/g) || [];
  const tokens1 = tokenize(str1);
  const tokens2 = tokenize(str2);
  
  const vocab = Array.from(new Set([...tokens1, ...tokens2]));
  const getVector = (tokens: string[]) => {
    const vec = new Array(vocab.length).fill(0);
    tokens.forEach(t => {
      const idx = vocab.indexOf(t);
      if (idx !== -1) vec[idx]++;
    });
    return vec;
  };
  
  const v1 = getVector(tokens1);
  const v2 = getVector(tokens2);
  
  let dotProduct = 0, mag1 = 0, mag2 = 0;
  for (let i = 0; i < vocab.length; i++) {
    dotProduct += v1[i] * v2[i];
    mag1 += v1[i] * v1[i];
    mag2 += v2[i] * v2[i];
  }
  
  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}`
};

// Document store for cosine similarity matcher
const vectorDocuments = [
    {
        id: 'doc-1',
        title: 'Work Experience: DevX Days & Pixelwand',
        text: 'Apoorv worked as a Full-Stack Developer Intern at DevX Days and Frontend Intern at Pixelwand building Next.js pipelines, SWR caching, and React components.'
    },
    {
        id: 'doc-2',
        title: 'Project: RetentIQ Multi-Agent SaaS',
        text: 'RetentIQ is a multi-agent customer churn-intelligence platform built on scikit-learn RandomForestClassifier, FastAPI, LangChain, Groq LLM, and Docker pipelines.'
    },
    {
        id: 'doc-3',
        title: 'Project: Planora Collaborative AI Platform',
        text: 'Planora is a real-time collaborative travel platform with a pgvector RAG AI layer grounding Llama 3.3 itinerary generation, using Supabase Realtime channels.'
    }
];

export default function Playground() {
    const [activeTab, setActiveTab] = useState<'streaming' | 'agent' | 'vector'>('streaming');
    const [copied, setCopied] = useState(false);

    // LLM Stream States
    const [streamText, setStreamText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const streamTargetText = "To build a robust Multi-Agent system, we orchestrate specialized nodes—such as a Planner, Searcher, and Synthesizer—via a structured state graph. Using libraries like LangGraph or LangChain, each node executes its task asynchronously, communicating through a shared thread state. By embedding Human-in-the-Loop checkpoints, we pause execution for authorization before executing high-risk tool calls (e.g. database updates or Stripe webhooks). This guarantees absolute reliability in enterprise production environments.";

    // Agent Visualizer States
    const [agentSteps, setAgentSteps] = useState<any[]>([
        { id: '1', name: 'Query Analyzer', status: 'idle', detail: 'Classifying user intent & routing request' },
        { id: '2', name: 'Semantic Searcher', status: 'idle', detail: 'Retrieving relevant embedding vectors from pgvector' },
        { id: '3', name: 'Reasoning Engine', status: 'idle', detail: 'Synthesizing response utilizing Llama 3.3 & scikit-learn' },
        { id: '4', name: 'Human Validator', status: 'idle', detail: 'Awaiting operator approval checkpoint' }
    ]);
    const [isAgentRunning, setIsAgentRunning] = useState(false);

    // Vector Matcher States
    const [searchQuery, setSearchQuery] = useState('Next.js and LangChain pipelines');
    const [similarities, setSimilarities] = useState<any[]>([]);

    // Handler to copy code
    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simulate LLM streaming token-by-token
    const startStreamingSimulation = () => {
        if (isStreaming) return;
        setIsStreaming(true);
        setStreamText('');
        
        let index = 0;
        const words = streamTargetText.split(' ');
        
        const interval = setInterval(() => {
            if (index < words.length) {
                setStreamText(prev => prev + (prev ? ' ' : '') + words[index]);
                index++;
            } else {
                clearInterval(interval);
                setIsStreaming(false);
            }
        }, 60);
    };

    // Run Agent visualizer cycle
    const runAgentSimulation = async () => {
        if (isAgentRunning) return;
        setIsAgentRunning(true);
        
        // Reset steps
        const resetSteps = agentSteps.map(s => ({ ...s, status: 'idle' }));
        setAgentSteps(resetSteps);
        
        for (let i = 0; i < resetSteps.length; i++) {
            resetSteps[i].status = 'running';
            setAgentSteps([...resetSteps]);
            
            // Wait for simulated task execution
            await new Promise(resolve => setTimeout(resolve, 1400));
            
            resetSteps[i].status = 'success';
            setAgentSteps([...resetSteps]);
        }
        
        setIsAgentRunning(false);
    };

    // Compute live cosine similarity between search query and doc text
    const runVectorSimilarity = () => {
        const tokenize = (s: string) => s.toLowerCase().match(/\w+/g) || [];
        const qTokens = tokenize(searchQuery);
        
        const calculated = vectorDocuments.map(doc => {
            const docTokens = tokenize(doc.text);
            const vocab = Array.from(new Set([...qTokens, ...docTokens]));
            
            const getVector = (tokens: string[]) => {
                const vec = new Array(vocab.length).fill(0);
                tokens.forEach(t => {
                    const idx = vocab.indexOf(t);
                    if (idx !== -1) vec[idx]++;
                });
                return vec;
            };
            
            const v1 = getVector(qTokens);
            const v2 = getVector(docTokens);
            
            let dotProduct = 0, mag1 = 0, mag2 = 0;
            for (let i = 0; i < vocab.length; i++) {
                dotProduct += v1[i] * v2[i];
                mag1 += v1[i] * v1[i];
                mag2 += v2[i] * v2[i];
            }
            
            const score = mag1 === 0 || mag2 === 0 ? 0 : dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
            return {
                id: doc.id,
                title: doc.title,
                text: doc.text,
                score: Math.round(score * 100)
            };
        });

        // Sort by score descending
        calculated.sort((a, b) => b.score - a.score);
        setSimilarities(calculated);
    };

    // Compute live cosine similarity when query changes
    useEffect(() => {
        runVectorSimilarity();
    }, [searchQuery]);

    // Format helper to display mock syntax highlighting in code block
    const renderCodeBlock = (code: string) => {
        return code.split('\n').map((line, idx) => {
            let styled = line
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            if (styled.trim().startsWith('//')) {
                styled = `<span class="text-gray-500 italic">${styled}</span>`;
            } else {
                // 1. Extract strings to prevent double replacement
                const strings: string[] = [];
                styled = styled.replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, (match) => {
                    strings.push(match);
                    return `___STR_PLACEHOLDER_${strings.length - 1}___`;
                });

                // 2. Highlight keywords and types
                styled = styled.replace(/\b(const|let|var|function|return|import|export|from|async|await|type|for|if|new|while|try|catch|finally)\b/g, '<span class="text-accent-purple font-semibold">$1</span>');
                styled = styled.replace(/\b(string|number|boolean|any|AgentStep|void)\b/g, '<span class="text-accent-cyan font-medium">$1</span>');

                // 3. Restore strings, highlighted
                strings.forEach((str, i) => {
                    styled = styled.replace(`___STR_PLACEHOLDER_${i}___`, `<span class="text-emerald-400 font-normal">${str}</span>`);
                });
            }

            return (
                <div key={idx} className="flex items-start font-mono text-xs leading-6 py-0.5">
                    <span className="w-8 select-none text-right pr-3 opacity-30 text-xs shrink-0">{idx + 1}</span>
                    <span className="whitespace-pre overflow-x-auto scrollbar-none font-mono text-xs text-gray-200" dangerouslySetInnerHTML={{ __html: styled }} />
                </div>
            );
        });
    };

    return (
        <section id="playground" className="py-20 bg-background relative overflow-hidden">
            {/* Design Tokens - Grid & Glow */}
            <div className="absolute inset-0 cyber-grid opacity-10" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <Badge variant="primary" className="mb-3">Reusable AI Engineering Showcase</Badge>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
                            AI Engineering Lab
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
                            Curated Agentic UX design patterns and clean mathematical algorithms optimized for real-time production AI pipelines.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Panel: Tabs & Live Preview */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 relative z-20">
                            <button
                                onClick={() => setActiveTab('streaming')}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    activeTab === 'streaming'
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-md'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                LLM Streaming
                            </button>
                            <button
                                onClick={() => setActiveTab('agent')}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    activeTab === 'agent'
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-md'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Agent Orchestration
                            </button>
                            <button
                                onClick={() => setActiveTab('vector')}
                                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    activeTab === 'vector'
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-md'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Vector Matcher
                            </button>
                        </div>

                        {/* Interactive Sandbox Wrapper */}
                        <Card className="min-h-[400px] flex flex-col justify-between border-white/10 relative z-20">
                            <AnimatePresence mode="wait">
                                {activeTab === 'streaming' && (
                                    <motion.div
                                        key="streaming"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 flex-grow flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-heading font-bold text-white">Token Streaming Simulation</h3>
                                                <Badge variant="primary" className="animate-pulse">Active Stream Ready</Badge>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-4">
                                                Simulates chunk-based text streaming generated via Server-Sent Events (SSE) direct to the UI.
                                            </p>
                                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-sm min-h-[160px] text-gray-200 relative overflow-hidden leading-relaxed">
                                                {streamText}
                                                {isStreaming && (
                                                    <motion.span
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{ duration: 0.8, repeat: Infinity }}
                                                        className="inline-block w-2 h-4 bg-accent-cyan ml-1 align-middle"
                                                    />
                                                )}
                                                {!streamText && !isStreaming && (
                                                    <span className="text-gray-500 italic">Click the button below to initialize the LLM generation pipeline...</span>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            onClick={startStreamingSimulation}
                                            disabled={isStreaming}
                                            className="w-full mt-4"
                                        >
                                            {isStreaming ? 'Streaming LLM Output...' : 'Run Generation Stream'}
                                        </Button>
                                    </motion.div>
                                )}

                                {activeTab === 'agent' && (
                                    <motion.div
                                        key="agent"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 flex-grow flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-heading font-bold text-white">Multi-Agent Step Orchestrator</h3>
                                                <Badge variant="accent">State Machine</Badge>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-4">
                                                Tracks agent node state changes with built-in Human-in-the-Loop gate verification.
                                            </p>

                                            <div className="space-y-3">
                                                {agentSteps.map((step) => (
                                                    <div
                                                        key={step.id}
                                                        className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                                                            step.status === 'running'
                                                                ? 'bg-primary-950/20 border-primary-500/30'
                                                                : step.status === 'success'
                                                                ? 'bg-emerald-950/10 border-emerald-500/20'
                                                                : 'bg-white/5 border-white/5'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                step.status === 'running' ? 'bg-primary-500 animate-ping' :
                                                                step.status === 'success' ? 'bg-emerald-500' : 'bg-gray-600'
                                                            }`} />
                                                            <div>
                                                                <p className="text-sm font-semibold text-white">{step.name}</p>
                                                                <p className="text-xs text-gray-400">{step.detail}</p>
                                                            </div>
                                                        </div>

                                                        {step.status === 'running' && (
                                                            <span className="text-xs text-primary-400 font-medium animate-pulse">Running...</span>
                                                        )}
                                                        {step.status === 'success' && (
                                                            <span className="text-xs text-emerald-400 font-medium">✓ Completed</span>
                                                        )}
                                                        {step.status === 'idle' && (
                                                            <span className="text-xs text-gray-500">Idle</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            onClick={runAgentSimulation}
                                            disabled={isAgentRunning}
                                            className="w-full mt-4"
                                        >
                                            {isAgentRunning ? 'Running Orchestration Cycle...' : 'Run Agent Cycle'}
                                        </Button>
                                    </motion.div>
                                )}

                                {activeTab === 'vector' && (
                                    <motion.div
                                        key="vector"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4 flex-grow flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-heading font-bold text-white">Live Cosine Similarity Matcher</h3>
                                                <Badge variant="outline" className="border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10">pgvector RAG</Badge>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-4">
                                                Type any sentence below. Calculates a live cosine similarity match against portfolio docs.
                                            </p>

                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    placeholder="Type query (e.g. Next.js, FastAPI, DevX)"
                                                />

                                                <div className="space-y-2 mt-4">
                                                    {similarities.map((doc) => (
                                                        <div key={doc.id} className="p-3 bg-white/5 border border-white/5 rounded-lg space-y-1">
                                                            <div className="flex justify-between text-xs">
                                                                <span className="font-semibold text-gray-200">{doc.title}</span>
                                                                <span className={`font-mono font-bold \${
                                                                    doc.score > 30 ? 'text-accent-cyan' : 'text-gray-400'
                                                                }`}>{doc.score}% similarity</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-500"
                                                                    style={{ width: `\${doc.score}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </div>

                    {/* Right Panel: Reusable Code Block */}
                    <div className="lg:col-span-6">
                        <Card variant="strong" className="p-0 sm:p-0 border-white/15 overflow-hidden flex flex-col justify-between h-auto lg:h-[456px] relative z-20 min-h-0" data-lenis-prevent>
                            {/* Code Header */}
                            <div className="bg-white/5 px-4 py-3 flex justify-between items-center border-b border-white/5 select-none">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono ml-4">
                                        {activeTab === 'streaming' && 'useLLMStream.ts'}
                                        {activeTab === 'agent' && 'agentOrchestrator.ts'}
                                        {activeTab === 'vector' && 'cosineSimilarity.ts'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none"
                                >
                                    {copied ? (
                                        <>
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-emerald-400 font-semibold">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2" />
                                            </svg>
                                            <span>Copy Code</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Code Snippet Body */}
                            <div className="flex-grow p-4 overflow-y-visible overflow-x-auto lg:overflow-y-auto bg-black/50 font-mono text-gray-300 leading-relaxed text-xs scrollbar-thin min-h-0" data-lenis-prevent>
                                <div className="min-w-full">
                                    {renderCodeBlock(codeSnippets[activeTab])}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
