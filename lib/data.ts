export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    status: 'Alpha' | 'Beta' | 'Prototype';
    author: string;
    image: string;
    link_github?: string;
    link_live?: string;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Neon Workflow',
        slug: 'neon-workflow',
        description: 'A revolutionary task management interface using spatial navigation to organize your daily priorities in 3D space.',
        status: 'Alpha',
        author: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop',
        link_live: '#',
    },
    {
        id: '2',
        title: 'Data Prism',
        slug: 'data-prism',
        description: 'Advanced data visualization tool that turns complex CSVs into interactive, explorable 3D prisms.',
        status: 'Prototype',
        author: 'Marcus Johnson',
        image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'Quantum Chat',
        slug: 'quantum-chat',
        description: 'Secure communication platform prototyped with post-quantum encryption algorithms for future-proof security.',
        status: 'Beta',
        author: 'Alex Rivera',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop',
        link_live: '#',
    },
    {
        id: '4',
        title: 'EcoTrace',
        slug: 'ecotrace',
        description: 'Supply chain transparency tool using blockchain to verify sustainable sourcing claims.',
        status: 'Alpha',
        author: 'Emily Zhang',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '5',
        title: 'HoloMeet',
        slug: 'holomeet',
        description: 'Next-gen video conferencing using detailed holographic projection for immersive remote presence.',
        status: 'Prototype',
        author: 'David Kim',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '6',
        title: 'Neural Tunes',
        slug: 'neural-tunes',
        description: 'AI-driven music generation that adapts in real-time to your biometric stress levels.',
        status: 'Alpha',
        author: 'Jessica Lee',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '7',
        title: 'Urban Flow',
        slug: 'urban-flow',
        description: 'Smart city dashboard visualizing traffic, energy usage, and air quality in a unified digital twin.',
        status: 'Beta',
        author: 'Michael Torres',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop',
    },
    {
        id: '8',
        title: 'Astro Lens',
        slug: 'astro-lens',
        description: 'AR app for stargazing that overlays constellation lore and satellite tracking on the night sky.',
        status: 'Prototype',
        author: 'Sophie Martin',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2613&auto=format&fit=crop',
    },
    {
        id: '9',
        title: 'CodeFlow',
        slug: 'codeflow',
        description: 'AI-powered code review assistant that learns your team\'s style and provides contextual suggestions.',
        status: 'Alpha',
        author: 'Ryan Cooper',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop',
        link_live: '#',
    },
    {
        id: '10',
        title: 'MindMap Pro',
        slug: 'mindmap-pro',
        description: 'Collaborative mind mapping tool with real-time AI summarization and branch auto-organization.',
        status: 'Beta',
        author: 'Laura Chen',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2673&auto=format&fit=crop',
        link_live: '#',
    },
    {
        id: '11',
        title: 'VoiceScribe',
        slug: 'voicescribe',
        description: 'Multi-language transcription service with speaker identification and sentiment analysis.',
        status: 'Prototype',
        author: 'James Wilson',
        image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '12',
        title: 'DataWeave',
        slug: 'dataweave',
        description: 'No-code data pipeline builder connecting APIs, databases, and analytics tools visually.',
        status: 'Alpha',
        author: 'Priya Sharma',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: '13',
        title: 'SecureVault',
        slug: 'securevault',
        description: 'Zero-knowledge password manager with biometric authentication and breach monitoring.',
        status: 'Beta',
        author: 'Daniel Kim',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop',
        link_live: '#',
    },
    {
        id: '14',
        title: 'FitTrack AI',
        slug: 'fittrack-ai',
        description: 'Personalized fitness coach using computer vision to analyze form and suggest workout improvements.',
        status: 'Prototype',
        author: 'Emma Rodriguez',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2675&auto=format&fit=crop',
    }
];
