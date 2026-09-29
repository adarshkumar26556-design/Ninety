import React from 'react';

export const CancellationPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 bg-stone-50">
      <div className="section-container section-padding max-w-4xl mx-auto">
        <h1 className="section-title mb-8">Vilstay Cancellation & Refund Policy</h1>
        
        <div className="prose prose-stone max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
          <p className="text-stone-500 mb-8 italic">Detailed cancellation, modification, no-show, and refund terms.<br/>Effective Date: Immediate</p>

          <div className="space-y-8 text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">About Vilstay</h2>
              <p>Vilstay is a hospitality brand owned and operated by Adora Consultancy & Projects. This Cancellation & Refund Policy applies to reservations made through the Vilstay website, booking platform, customer care, direct booking channels, and participating Vilstay or partner properties.</p>
              <p className="mt-2">By confirming a reservation with Vilstay, the guest agrees to this policy and any additional property-specific cancellation terms communicated at the time of booking.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">1. Standard Cancellation Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Guests may cancel an eligible booking at least 24 hours before the scheduled check-in time.</li>
                <li>Eligible cancellations will be refunded after deducting the applicable cancellation charges.</li>
                <li>The exact cancellation charge may depend on the property, booking rate, promotional offer, payment method, season, and terms shown during booking.</li>
                <li>A cancellation request will be considered valid only after it is received and acknowledged by Vilstay or the respective property.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">2. Cancellations Within 24 Hours</h2>
              <p>Bookings cancelled within 24 hours of the scheduled check-in time may not be eligible for a refund. Any refund or adjustment in such cases will be at the sole discretion of Vilstay and the respective property, subject to availability, circumstances, and the booking conditions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">3. No-Show Policy</h2>
              <p>If the guest does not arrive on the confirmed check-in date and has not cancelled the booking in advance, the reservation will be treated as a no-show. The full booking amount may be charged and may be non-refundable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">4. Early Check-out and Unused Nights</h2>
              <p>If a guest checks out before the confirmed departure date, the unused nights are generally non-refundable. Any exception must be approved by the property management or Vilstay.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">5. Non-Refundable and Special-Rate Bookings</h2>
              <p>Bookings made under promotional rates, festival packages, peak-season rates, advance-purchase offers, long-weekend packages, group rates, special event rates, or any booking specifically marked as non-refundable may not be cancelled, modified, or refunded.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">6. Refund Processing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Eligible refunds will be initiated within 7 working days after cancellation approval.</li>
                <li>Refunds will normally be processed to the original payment method used for the booking.</li>
                <li>The guest's bank, card issuer, UPI provider, or payment gateway may require additional time to credit the refund after Vilstay has initiated it.</li>
                <li>Vilstay is not responsible for delays caused by banks, payment gateways, or third-party payment providers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">7. Possible Deductions</h2>
              <p>The following deductions may apply where relevant:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Cancellation charges</li>
                <li>Payment gateway charges</li>
                <li>Bank or transaction charges</li>
                <li>Applicable taxes or statutory deductions</li>
                <li>Property-specific administrative charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">8. Booking Modifications</h2>
              <p>Guests may request changes to booking dates, guest names, room type, number of guests, or stay duration. All changes are subject to availability, applicable rate differences, property approval, and any modification charges.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">9. Force Majeure</h2>
              <p>Vilstay and its partner properties will not be responsible for cancellation, delay, service interruption, or inability to provide accommodation due to circumstances beyond reasonable control, including natural disasters, floods, landslides, fire, war, civil unrest, government restrictions, epidemics, pandemics, transportation disruption, or utility failure. Rescheduling or refund decisions in such cases will depend on the property policy and the circumstances.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">10. Property-Specific Policies</h2>
              <p>Some properties may have cancellation and refund conditions different from this general policy. When a property-specific policy is displayed or communicated at the time of booking, that policy will prevail for the relevant reservation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">11. Contact for Cancellations and Refunds</h2>
              <p><strong>Adora Consultancy & Projects</strong><br/>
              Tower 2, Second Floor, HiLITE Business Park<br/>
              Door No. 2, 1149/I 100, Olavanna<br/>
              Kozhikode, Kerala – 673014</p>
              <ul className="mt-2 space-y-1">
                <li><strong>Company Website:</strong> <a href="http://adoragroup.in/" className="text-brand-600 hover:underline">adoragroup.in</a></li>
                <li><strong>Company Email:</strong> <a href="mailto:adoraclt@gmail.com" className="text-brand-600 hover:underline">adoraclt@gmail.com</a></li>
                <li><strong>Company Phone:</strong> 9656584947</li>
                <li><strong>Customer Care:</strong> 9947584947</li>
                <li><strong>Customer Care & Complaints:</strong> <a href="mailto:vilstaygo@gmail.com" className="text-brand-600 hover:underline">vilstaygo@gmail.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">12. Acceptance and Amendments</h2>
              <p>By making a booking through Vilstay, the guest confirms that they have read, understood, and accepted this Cancellation & Refund Policy. Vilstay reserves the right to update or amend this policy at any time. The latest published version will apply to future bookings.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
