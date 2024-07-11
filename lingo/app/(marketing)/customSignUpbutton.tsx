import React from 'react';

import { SignUpButton } from '@clerk/nextjs';

interface CustomSignUpButtonProps extends React.ComponentProps<typeof SignUpButton> {
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
}

const CustomSignUpButton: React.FC<CustomSignUpButtonProps> = ({
  ...props
}) => {
  // You might need to handle these URLs in your logic here if SignUpButton does not support them directly
  return <SignUpButton {...props} />;
};

export default CustomSignUpButton;
