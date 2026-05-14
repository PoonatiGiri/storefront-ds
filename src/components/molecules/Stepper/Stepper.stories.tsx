import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper } from './Stepper';
import type { StepperOrientation } from './Stepper';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'] satisfies StepperOrientation[],
    },
    currentStep: { control: { type: 'number', min: 0, max: 3 } },
  },
  decorators: [(Story) => <div className="w-full max-w-2xl"><Story /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const checkoutSteps = [
  { label: 'Cart', description: 'Review items' },
  { label: 'Shipping', description: 'Address & method' },
  { label: 'Payment', description: 'Card or bank' },
  { label: 'Confirm', description: 'Place the order' },
];

export const Default: Story = {
  args: { steps: checkoutSteps, currentStep: 1, orientation: 'horizontal' },
};

export const AllVariants: Story = {
  args: { steps: checkoutSteps, currentStep: 1 },
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs text-neutral-500 mb-3">Horizontal</p>
        <Stepper steps={checkoutSteps} currentStep={1} />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-3">Vertical</p>
        <div className="max-w-sm">
          <Stepper steps={checkoutSteps} currentStep={1} orientation="vertical" />
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { steps: checkoutSteps, currentStep: 1 },
  render: () => (
    <div className="flex flex-col gap-10">
      <Stepper
        steps={[
          { label: 'One' },
          { label: 'Two' },
          { label: 'Three' },
        ]}
        currentStep={1}
      />
      <Stepper steps={checkoutSteps} currentStep={2} />
    </div>
  ),
};

export const AllStates: Story = {
  args: { steps: checkoutSteps, currentStep: 0 },
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs text-neutral-500 mb-3">Start</p>
        <Stepper steps={checkoutSteps} currentStep={0} />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-3">Middle</p>
        <Stepper steps={checkoutSteps} currentStep={2} />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-3">Complete</p>
        <Stepper steps={checkoutSteps} currentStep={4} />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  args: { steps: checkoutSteps, currentStep: 0 },
  render: () => {
    function Inner() {
      const [step, setStep] = useState(0);
      return (
        <div className="flex flex-col gap-6">
          <Stepper
            steps={checkoutSteps}
            currentStep={step}
            onStepClick={(i) => setStep(i)}
          />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button
              onClick={() => setStep((s) => Math.min(checkoutSteps.length, s + 1))}
              disabled={step >= checkoutSteps.length}
            >
              {step >= checkoutSteps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      );
    }
    return <Inner />;
  },
};
