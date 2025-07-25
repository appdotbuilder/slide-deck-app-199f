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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-4xl w-full mx-auto p-8">
                    {/* Slide Counter */}
                    <div className="text-center mb-8">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {currentSlide + 1} / {slides.length}
                        </span>
                    </div>

                    {/* Slide Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-12 min-h-[400px] flex flex-col justify-center transition-all duration-300 ease-in-out transform">
                        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white animate-fade-in">
                            {currentSlideData.title}
                        </h1>

                        {currentSlideData.content && (
                            <div className="space-y-4 animate-fade-in">
                                {currentSlideData.content.map((item, index) => (
                                    <p key={index} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transform transition-all duration-300 ease-in-out hover:scale-105">
                                        • {item}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Special styling for slide 2 (Among Us themed) */}
                        {currentSlide === 1 && (
                            <div className="text-center mt-8">
                                <div className="text-6xl">📱</div>
                                <p className="text-red-500 font-bold text-xl mt-4">
                                    Sus
                                </p>
                            </div>
                        )}

                        {/* Special styling for slide 5 (command) */}
                        {currentSlide === 4 && (
                            <div className="mt-8 bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-center">
                                <span className="text-gray-500">$</span> npx @app.build/cli –template=laravel
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8">
                        <Button
                            onClick={goToPrevious}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </Button>

                        {/* Slide Indicators */}
                        <div className="flex space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
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
                            className="flex items-center gap-2"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Keyboard Navigation Hint */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Use arrow keys or click the buttons to navigate
                        </p>
                    </div>
                </div>
            </div>
    );
}