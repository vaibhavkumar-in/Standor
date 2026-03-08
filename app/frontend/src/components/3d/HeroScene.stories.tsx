import type { Meta, StoryObj } from '@storybook/react';
import HeroScene from './HeroScene';

const meta = {
    title: '3D/HeroScene',
    component: HeroScene,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
            values: [{ name: 'dark', value: '#050505' }],
        },
    },
} satisfies Meta<typeof HeroScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
            {/* 
        The Scene is absolutely positioned at 120vw/vh inside a relative container. 
        It requires a dark background to blend its additive shader particles correctly.
      */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <h1 className="text-white text-5xl font-bold tracking-tighter">Hero Sculpture</h1>
            </div>
            <HeroScene />
        </div>
    ),
};
