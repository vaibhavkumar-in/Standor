import type { Meta, StoryObj } from '@storybook/react';
import { SpotlightCard } from './SpotlightCard';

const meta = {
    title: 'UI/SpotlightCard',
    component: SpotlightCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [{ name: 'dark', value: '#050505' }],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SpotlightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <div className="p-8 w-80 h-64 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Hover me</h3>
                <p className="text-neutral-400 text-sm">
                    A radial gradient follows your mouse position to create a spotlight effect.
                </p>
            </div>
        ),
    },
};

export const CustomColor: Story = {
    args: {
        spotlightColor: 'rgba(14, 165, 164, 0.15)', // Teal accent
        children: (
            <div className="p-8 w-80 h-64 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Teal Spotlight</h3>
                <p className="text-neutral-400 text-sm">
                    You can pass any valid CSS color to the spotlight generator.
                </p>
            </div>
        ),
    },
};
