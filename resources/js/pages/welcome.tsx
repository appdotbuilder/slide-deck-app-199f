import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    [key: string]: unknown;
}

interface Slide {
    title: string;
    content?: string[];
}

const slides: Slide[] = [
    {
        title: "Code is eating the world. Now computer can talk to us"
    },
    {
        title: "Imposter"
    },
    {
        title: "CodeGen is coming, also to Laravel",
        content: [
            "Different approaches: tab completion, agent mode, background agents, app builder platforms",
            "Different audiences: non/semi-technical vibe coders vs. AI-enabled developers",
            "Different use cases: prototyping, scaffolding, one-time (ephemeral) apps, personal apps"
        ]
    },
    {
        title: "Neon & CodeGen",
        content: [
            "Great primitives for agents: database branches, checkpoints, instant restore",
            "Biggest customers are app builder agent platforms",
            "app.build as a research project and reference implementation"
        ]
    },
    {
        title: "npx @app.build/cli –template=laravel"
    }
];

export default function Welcome(props: Props) {
    // Satisfy TypeScript requirements for Inertia.js props
    void props;
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                goToPrevious();
            } else if (event.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentSlideData = slides[currentSlide];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <div className="max-w-7xl w-full mx-auto">
                    {/* Slide Counter */}
                    <div className="text-center mb-6">
                        <span className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                            {currentSlide + 1} / {slides.length}
                        </span>
                    </div>

                    {/* Slide Content - Much Larger for Presenter Mode */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-16 min-h-[700px] flex flex-col justify-center transition-all duration-300 ease-in-out transform">
                        <h1 className="text-7xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in leading-tight">
                            {currentSlideData.title}
                        </h1>

                        {currentSlideData.content && (
                            <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
                                {currentSlideData.content.map((item, index) => (
                                    <p key={index} className="text-3xl text-gray-700 dark:text-gray-300 leading-relaxed transform transition-all duration-300 ease-in-out hover:scale-105 font-medium">
                                        • {item}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Special styling for slide 2 (Among Us themed) - Scaled Up */}
                        {currentSlide === 1 && (
                            <div className="text-center mt-16">
                                <div className="text-9xl mb-8">📱</div>
                                <p className="text-red-500 font-bold text-6xl mt-8">
                                    Sus
                                </p>
                            </div>
                        )}

                        {/* Special styling for slide 5 (command) - Scaled Up */}
                        {currentSlide === 4 && (
                            <div className="mt-16 bg-gray-900 text-green-400 p-12 rounded-2xl font-mono text-center max-w-5xl mx-auto">
                                <div className="text-4xl">
                                    <span className="text-gray-500">$</span> npx @app.build/cli –template=laravel
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation - Larger for Presenter Mode */}
                    <div className="flex justify-between items-center mt-12">
                        <Button
                            onClick={goToPrevious}
                            variant="outline"
                            size="lg"
                            className="flex items-center gap-3 text-xl px-8 py-4"
                        >
                            <ChevronLeft className="w-6 h-6" />
                            Previous
                        </Button>

                        {/* Slide Indicators - Larger */}
                        <div className="flex space-x-4">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-6 h-6 rounded-full transition-colors ${
                                        index === currentSlide
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                />
                            ))}
                        </div>

                        <Button
                            onClick={goToNext}
                            variant="outline"
                            size="lg"
                            className="flex items-center gap-3 text-xl px-8 py-4"
                        >
                            Next
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Keyboard Navigation Hint - Larger */}
                    <div className="text-center mt-8">
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Use arrow keys or click the buttons to navigate
                        </p>
                    </div>
                </div>
            </div>
    );
}