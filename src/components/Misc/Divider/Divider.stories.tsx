import type { Meta, StoryObj } from '@storybook/react';

import { Cell, List, Section } from 'components';
import { Divider } from './Divider';

const meta = {
  title: 'Misc/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <List style={{ background: 'var(--tgui--secondary_bg_color)' }}>
      <Section>
        <Cell>Divider is under</Cell>
        <Cell>Divider is above</Cell>
      </Section>
    </List>
  ),
} satisfies Story;
