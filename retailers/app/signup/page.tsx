import ZuriscaleSignup from '@/components/auth/SignupForm'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

const supabase = createClient()

function page() {
  
  return (
    <div>
      <ZuriscaleSignup />
    </div>
  )
}

export default page