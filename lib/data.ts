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
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbc7c?q=80&w=2670&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1614728853913-1e2203357642?q=80&w=2670&auto=format&fit=crop',
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
    }
];
