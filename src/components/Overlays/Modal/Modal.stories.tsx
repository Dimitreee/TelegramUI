import { useState } from 'react';

import { Decorator, Meta, StoryObj } from '@storybook/react';
import { Icon28Close } from 'icons/28/close';

import { Button, Placeholder } from 'components';
import { Modal, ModalProps } from './Modal';

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const DecoratorFullScreen: Decorator = (StoryComponent) => (
  <div style={{ height: '100vh' }}>
    <StoryComponent />
  </div>
);

export const Playground: Story = {
  args: {
    header: <Modal.Header>Only iOS header</Modal.Header>,
    trigger: <Button size="m">Open modal</Button>,
    children: (
      <Placeholder
        header="Title"
        description="Description"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    ),
  },
  decorators: [DecoratorFullScreen],
};

const PlaceholderForNestedModal = (props: ModalProps) => (
  <Placeholder
    header="Title"
    description="Description"
    action={<Modal {...props} nested><PlaceholderForNestedModal {...props} /></Modal>}
  >
    <img
      alt="Telegram sticker"
      src="https://xelene.me/telegram.gif"
      style={{ display: 'block', width: '144px', height: '144px' }}
    />
  </Placeholder>
);

export const NestedModals: Story = {
  args: Playground.args,
  render: (args) => (
    <Modal {...args}>
      <PlaceholderForNestedModal trigger={args.trigger} {...args} />
    </Modal>
  ),
  decorators: [DecoratorFullScreen],
};

export const WithCloseButton: Story = {
  args: {
    ...Playground.args,
    header: (
      <Modal.Header after={<Modal.Close><Icon28Close /></Modal.Close>}>
        Only iOS header
      </Modal.Header>
    ),
  },
  decorators: [DecoratorFullScreen],
};

export const SnapPoints: Story = {
  args: {
    ...Playground.args,
    snapPoints: [0.33, 0.66, 1],
    children: (
      <>
        <div style={{ height: '33vh', background: 'blue' }} />
        <div style={{ height: '33vh', background: 'green' }} />
        <div style={{ height: '33vh', background: 'bisque' }} />
      </>
    ),
  },
  decorators: [DecoratorFullScreen],
};

export const Controlled: Story = {
  args: {
    ...Playground.args,
    open: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open);

    const handleClose = () => {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    };

    return (
      <Placeholder
        header="This modal will be closed after 1000ms, click fetch"
        description="Click fetch"
        action={<Button size="m" onClick={() => setIsOpen(true)}>Open again</Button>}
      >
        <Modal
          {...args}
          trigger={undefined}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <Placeholder action={<Button size="m" onClick={handleClose}>Fetch data and close</Button>} />
        </Modal>
      </Placeholder>
    );
  },
  decorators: [DecoratorFullScreen],
};
