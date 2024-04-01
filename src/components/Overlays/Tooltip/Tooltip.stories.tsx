import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { hideControls } from 'storybook/controls';

import { Button } from 'components/Blocks/Button/Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  argTypes: hideControls('ArrowIcon', 'targetRef', 'arrowProps', 'Component', 'customMiddlewares'),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    mode: 'light',
    targetRef: {
      current: null,
    },
  },
  render: (args) => {
    const ref = useRef(null);
    const [shown, setShown] = useState(true);

    return (
      <>
        <Button style={{ width: 100 }} ref={ref} onClick={() => setShown(!shown)}>
          {shown ? 'Hide' : 'Show'}
        </Button>
        {shown && (
          <Tooltip {...args} targetRef={ref}>
            Hold to record audio. Tap to switch to video.
          </Tooltip>
        )}
      </>
    );
  },
};

