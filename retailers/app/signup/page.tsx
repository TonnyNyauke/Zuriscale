import ZuriscaleSignup from '@/components/auth/SignupForm'
import { createClient } from '@/utils/supabase/server'
import React from 'react'
import { signup } from '../actions/signup'

const supabase = createClient()

function page() {
  return (
    <div>
      <ZuriscaleSignup signupAction = {signup}/>
    </div>
  )
}

export default page