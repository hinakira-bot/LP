import React, { useState, useEffect } from 'react';
import { LivePreview } from './components/Preview/LivePreview';
import { DEFAULT_DATA } from './data/defaultData';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Viewer crashed:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-10 text-red-600 bg-white">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
                    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                        {this.state.error && this.state.error.toString()}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export const ViewerApp = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [debugInfo, setDebugInfo] = useState("");

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                console.log("Fetching config.json...");
                const response = await fetch('./config.json');
                if (!response.ok) {
                    throw new Error(`Config fetch failed: ${response.status} ${response.statusText}`);
                }
                const configData = await response.json();
                console.log("Config loaded:", configData);
                setData({ ...DEFAULT_DATA, ...configData });
            } catch (err) {
                console.warn("Falling back to DEFAULT_DATA", err);
                // We show this debug info quietly on the screen just in case
                setDebugInfo(`Config load error: ${err.message}. Using default data.`);
                setData(DEFAULT_DATA);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p>Loading Viewer...</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="w-full min-h-screen bg-white">
                {debugInfo && <div className="fixed top-0 left-0 bg-yellow-100 text-yellow-800 text-xs p-1 z-50 opacity-75 hover:opacity-100">{debugInfo}</div>}
                <LivePreview data={data} viewMode="desktop" activeSectionId={null} />
            </div>
        </ErrorBoundary>
    );
};
