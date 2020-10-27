// Button.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ButtonIcon, { ButtonIconProps, ButtonIconSize } from './ButtonIcon';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Colors } from 'common/types';

export const Default: Story<ButtonIconProps> = () => <ButtonIcon />;

export const DefaultWithText: Story<ButtonIconProps> = () => (
  <ButtonIcon>Default with text</ButtonIcon>
);

export const CustomIcon: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} />
);

export const Transparent: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} isTransparent />
);

export const Small: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} size={ButtonIconSize.Small} />
);

export const Normal: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} />
);

export const Medium: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} size={ButtonIconSize.Medium} />
);

export const Large: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} size={ButtonIconSize.Large} />
);

export const Link: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} variant={Colors.Link}/>
);

export const Info: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} variant={Colors.Info}/>
);

export const Success: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} variant={Colors.Success}/>
);

export const Warning: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} variant={Colors.Warning}/>
);

export const Danger: Story<ButtonIconProps> = () => (
  <ButtonIcon icon={faCartPlus} variant={Colors.Danger}/>
);

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
} as Meta;
