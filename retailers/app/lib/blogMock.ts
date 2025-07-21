//lib/blogMock.ts
import { Article } from "../types/types";

export const blogData: { articles: Article[] } = {
  articles: [
    {
      id: "customer-retention-fashion-retail",
      title: "Why Keeping Your Customers is the Lifeline Your Fashion Business Needs Right Now",
      description: "Stop the customer bleed. Discover how Kenyan retailers like you are surviving tough times by focusing on loyal customers instead of chasing new ones.",
      content: `
        <p class="mb-4">Look, I know how it is. Another slow Tuesday at your boutique. Rent's due next week. That shipment of Ankara fabrics still hasn't cleared customs. And where are the customers? It feels like you're pouring money into ads just to keep the lights on.</p>
        
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <p class="font-bold">Here's the hard truth nobody tells you:</p>
          <p>Your survival isn't in finding new customers - it's in keeping the ones you already have. Ask Mama Njuguna who runs that small shop near Gikomba. Last year, she nearly closed. Today? She's planning to open a second location. How?</p>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">The Silent Killer of Kenyan Fashion Shops</h2>
        
        <p class="mb-4">Remember that good customer - let's call her Wanjiru? The one who used to buy KES 15,000 worth of kitenge every month? When she stopped coming, did you:</p>
        
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="bg-red-50 p-4 rounded-lg border border-red-200 flex-1">
            <h4 class="font-bold text-red-800 mb-1">Panic and spend more on ads?</h4>
            <p class="text-red-700">Throwing good money after disappearing customers</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg border border-green-200 flex-1">
            <h4 class="font-bold text-green-800 mb-1">Or find out why she left?</h4>
            <p class="text-green-700">Discovering she switched to a shop that remembers her birthday</p>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Why Your Best Customers Vanish</h2>
        <p class="mb-4">From talking to hundreds of shop owners like you:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-bold mb-1">"You forgot me"</h4>
            <p>That customer who bought three dresses last month? You haven't contacted her since</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-bold mb-1">"You don't know me"</h4>
            <p>Sending promos for men's suits to a woman who only buys skirts</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-bold mb-1">"Why should I return?"</h4>
            <p>No special treatment for loyal customers</p>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">How WhatsApp Saved Grace's Shop in Kisumu</h2>
        <p class="mb-4">Grace was where you are now. Then she tried this:</p>
        
        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
          <p>Instead of blasting "SALE!!!" to everyone, she started sending:</p>
          <ul class="list-disc pl-5 space-y-1 mt-2">
            <li>"Hi Esther! Remember that blue dress you bought? We just got matching heels"</li>
            <li>"VIP access only: New Kitenge collection before we open tomorrow"</li>
            <li>"Special for you: 15% off because we value your loyalty"</li>
          </ul>
          <div class="mt-4 p-3 bg-white rounded-lg">
            <p class="font-bold text-center">Results in 3 months:</p>
            <div class="flex justify-between mt-2">
              <div class="text-center">
                <p class="text-2xl font-bold">67%</p>
                <p>Repeat customers</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold">KES 45k</p>
                <p>Avg. spend</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold">89%</p>
                <p>Revenue boost</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Your Action Plan (Start Today)</h2>
        <ol class="list-decimal pl-5 space-y-4 mb-6">
          <li>
            <h4 class="font-bold">Track what matters with Zuriscale</h4>
            <p>Forget notebooks. Zuriscale automatically records customer names, purchases, and numbers for you.</p>
          </li>
          <li>
            <h4 class="font-bold">Send automatic thank-yous</h4>
            <p>Set up Zuriscale to send "Asante for trusting us with your style!" messages after every purchase.</p>
          </li>
          <li>
            <h4 class="font-bold">Find VIPs instantly</h4>
            <p>Zuriscale's dashboard highlights your top spenders automatically - no manual calculations needed.</p>
          </li>
          <li>
            <h4 class="font-bold">Automate win-back campaigns</h4>
            <p>Zuriscale messages quiet customers for you: "We miss you! Here's 10% off your next purchase."</p>
          </li>
        </ol>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="italic">"Last month, using these exact steps, my Thika shop saw 40% more repeat customers. Not ads. Not discounts. Just remembering people."</p>
          <p class="mt-2 text-right">- Karimi, Fashions R Us</p>
        </div>
      `,
      author: {
        name: "Tonny Nyauke",
        bio: "Tonny grew up helping at his mother's Kibra dress shop. After 15 years in retail, he now helps struggling shop owners survive tough markets.",
        avatar: "/photos/nyauke.jpg"
      },
      coverImage: "/photos/retention.jpg",
      readTime: 7,
      publishedAt: "2025-06-15T10:00:00Z",
      featured: true,
      tags: ["Customer Retention", "Fashion Retail", "WhatsApp Marketing", "Kenya Business"]
    },
    {
      id: "whatsapp-marketing-fashion-kenya",
      title: "WhatsApp Marketing That Doesn't Feel Like Spam: Real Talk for Kenyan Shop Owners",
      description: "Stop annoying customers and start building relationships. Practical WhatsApp strategies that work in our Kenyan context.",
      content: `
        <p class="mb-4">Your phone buzzes. Another WhatsApp promo from that furniture shop. Delete. We've all been there - both as business owners and customers.</p>
        
        <p class="mb-4">Now ask yourself honestly: Are your customers deleting YOUR messages too?</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <p class="font-bold">The truth?</p>
          <p>WhatsApp can be your best salesperson or your fastest route to being blocked. Here's how to get it right.</p>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">What Works in Real Kenyan Shops</h2>
        
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div class="border border-green-200 rounded-lg p-4 bg-green-50">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <p class="text-gray-800"><span class="font-bold">[10:15 AM]</span> Habari Susan! Remember that green dress you liked? We just got matching earrings. Want me to set them aside?</p>
            </div>
            <p class="mt-2 text-sm">→ Susan bought 3 items that afternoon</p>
          </div>
          
          <div class="border border-green-200 rounded-lg p-4 bg-green-50 mt-4">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <p class="text-gray-800"><span class="font-bold">[4:30 PM]</span> James, your favorite brand just arrived. Come see before we open tomorrow? (VIP access only)</p>
            </div>
            <p class="mt-2 text-sm">→ James came first thing in the morning</p>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">What Makes Customers Block You</h2>
        
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div class="border border-red-200 rounded-lg p-4 bg-red-50">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <p class="text-gray-800"><span class="font-bold">[8:45 PM]</span> MEGA SALE!!! EVERYTHING MUST GO!!!</p>
            </div>
            <p class="mt-2 text-red-700">→ Feels desperate. Customers lose trust</p>
          </div>
          
          <div class="border border-red-200 rounded-lg p-4 bg-red-50 mt-4">
            <div class="bg-white p-3 rounded-lg shadow-sm">
              <p class="text-gray-800"><span class="font-bold">[Sunday 11 AM]</span> New arrivals! Come now for best selection!</p>
            </div>
            <p class="mt-2 text-red-700">→ Church time. Respect Kenyan rhythms</p>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Simple System That Works</h2>
        <div class="overflow-x-auto mb-6">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2 text-left">When</th>
                <th class="border border-gray-300 p-2 text-left">What to Send</th>
                <th class="border border-gray-300 p-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-2">After purchase</td>
                <td class="border border-gray-300 p-2">Thank you + care tip</td>
                <td class="border border-gray-300 p-2">"Asante! Handwash that blouse in cold water"</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-2">2 weeks later</td>
                <td class="border border-gray-300 p-2">Style suggestion</td>
                <td class="border border-gray-300 p-2">"That skirt would look great with our new tops"</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">After 1 month</td>
                <td class="border border-gray-300 p-2">Exclusive offer</td>
                <td class="border border-gray-300 p-2">"VIP discount just for you this week"</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="font-bold">Pro Tip from Wambui in Nakuru:</p> 
          <p>"Before sending any message, ask: 'Would I send this to my sister?' If not, don't hit send."</p>
        </div>
      `,
      author: {
        name: "Sarah Mwangi",
        bio: "Sarah helped her family's struggling Thika boutique survive COVID using WhatsApp. Now she teaches other shop owners to do the same.",
        avatar: "/api/placeholder/64/64"
      },
      coverImage: "/photos/whatsapp.jpg",
      readTime: 5,
      publishedAt: "2025-06-10T14:00:00Z",
      featured: false,
      tags: ["WhatsApp Marketing", "Digital Marketing", "Customer Communication"]
    },
    {
      id: "seasonal-fashion-retail-strategies",
      title: "Surviving Kenya's Seasons: Practical Stocking Tips When Money is Tight",
      description: "Stop guessing next season's trends. Learn how smart Kenyan shop owners plan inventory to match our unique seasons and cultural calendar.",
      content: `
        <p class="mb-4">Remember last April? The long rains came, and you were stuck with 50 linen dresses nobody wanted while customers asked for raincoats you didn't have.</p>
        
        <p class="mb-4">Seasonal mistakes can break small shops. But get it right, and you turn weather patterns into profit.</p>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Kenya's Real Fashion Calendar</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 class="font-bold text-lg mb-2">Wedding Season</h3>
            <p class="font-medium text-blue-800 mb-2">June-August & Dec-Jan</p>
            <p class="mb-2"><strong>What sells:</strong> Men's suits, women's formal kitenge</p>
            <p><strong>Smart move:</strong> Partner with local wedding planners</p>
          </div>
          <div class="border border-green-200 rounded-lg p-4 bg-green-50">
            <h3 class="font-bold text-lg mb-2">School Rush</h3>
            <p class="font-medium text-green-800 mb-2">Jan/Apr/Sep</p>
            <p class="mb-2"><strong>What sells:</strong> Socks, ties, school bags</p>
            <p><strong>Smart move:</strong> Bundle uniform essentials</p>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Weather-Proof Your Stock</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <h4 class="font-bold text-lg mb-2">Long Rains (Mar-May)</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>Waterproof shoes (affordable range)</li>
              <li>Light jackets (not heavy coats)</li>
              <li><strong>Savvy tip:</strong> Buy umbrellas wholesale from Industrial Area</li>
            </ul>
          </div>
          <div class="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 class="font-bold text-lg mb-2">Dry Heat (Feb/Mar)</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>Light cotton and linen</li>
              <li>Sun hats and UV-protective wear</li>
              <li><strong>Savvy tip:</strong> Display near entrance with "Beat the Heat" sign</li>
            </ul>
          </div>
        </div>
        
        <h2 class="text-xl font-bold mt-6 mb-4">Never Miss These Kenyan Events</h2>
        <div class="overflow-x-auto mb-6">
          <table class="min-w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2 text-left">Event</th>
                <th class="border border-gray-300 p-2 text-left">When</th>
                <th class="border border-gray-300 p-2 text-left">Stock Smart</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-2">Eid</td>
                <td class="border border-gray-300 p-2">Variable</td>
                <td class="border border-gray-300 p-2">Modest dresses & headscarves</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-2">Jamhuri Day</td>
                <td class="border border-gray-300 p-2">December</td>
                <td class="border border-gray-300 p-2">Black/red/green accessories</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2">Ruracio</td>
                <td class="border border-gray-300 p-2">Year-round</td>
                <td class="border border-gray-300 p-2">Traditional engagement outfits</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-teal-50 p-4 rounded-lg border border-teal-200 mb-6">
          <h3 class="font-bold text-lg text-teal-800 mb-2">Real Shop Owner Story</h3>
          <p>"Last April, I spent KES 20,000 on umbrellas instead of summer dresses. Sold all 100 pieces in 2 weeks at 45% profit. That money saved my business during the dry spell."</p>
          <p class="mt-2 text-right">- David, Nairobi CBD</p>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <p class="font-bold">Your Next Step:</p> 
          <p>Get the school holiday calendar from nearby schools. Stock up 2 weeks before term ends.</p>
        </div>
      `,
      author: {
        name: "James Ochieng",
        bio: "James managed stock for his family's 30-year-old Kisumu shop. He knows firsthand how seasonal planning makes or breaks small businesses.",
        avatar: "/api/placeholder/64/64"
      },
      coverImage: "/photos/strategies.jpg",
      readTime: 6,
      publishedAt: "2025-06-05T09:00:00Z",
      featured: false,
      tags: ["Seasonal Planning", "Inventory Management", "Fashion Retail"]
    }
  ]
};