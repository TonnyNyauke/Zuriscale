import React from 'react'

function TheFooter() {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xl font-bold">Zuriscale</span>
              </div>
              <p className="text-gray-400">
                Helping Kenyan fashion retailers reach KES 1M in sales through customer retention and growth strategies.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <a href='https://wa.me/+254742065623' target='_blank' rel='noopener'>WhatsApp: +254 742 065 623</a>
                <p>Email: support@zuriscale.com</p>
                <p>Hours: 24/6 Support</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <p><a href="#features" className="hover:text-white">Features</a></p>
                <p><a href="#pricing" className="hover:text-white">Pricing</a></p>
                <p><a href="#" className="hover:text-white">Privacy Policy</a></p>
                <p><a href="#" className="hover:text-white">Terms of Service</a></p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zuriscale. All rights reserved. Made with ❤️ in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TheFooter