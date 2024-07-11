import React from 'react';

import { SignInButton} from '@clerk/nextjs';


interface CustomSignInButtonProps extends React.ComponentProps<typeof SignInButton> {
    afterSignInUrl?: string;
    afterSignUpUrl?: string;
  }
  
  const CustomSignInButton: React.FC<CustomSignInButtonProps> = ({
    ...props
  }) => {
    return <SignInButton {...props} />;
  };
  
  export default CustomSignInButton;