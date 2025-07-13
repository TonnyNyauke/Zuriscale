import ZuriscaleSignup from '@/components/auth/SignupForm'
import React from 'react'
import { signupAction } from '@/app/actions/signup'

function page() {
  return (
    <div>
      <ZuriscaleSignup signupAction={signupAction}/>
    </div>
  )
}

export default page