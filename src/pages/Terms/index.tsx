import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 bg-stone-50">
      <div className="section-container section-padding max-w-4xl mx-auto">
        <h1 className="section-title mb-8">Vilstay Terms & Conditions</h1>
        
        <div className="prose prose-stone max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
          <p className="text-stone-500 mb-8 italic">Detailed terms governing bookings, stays, payments, property use, and customer responsibilities.<br/>Effective Date: Immediate</p>

          <div className="space-y-8 text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">1. Introduction</h2>
              <p>Welcome to Vilstay, a hospitality brand and booking service owned and operated by Adora Consultancy & Projects. These Terms & Conditions govern access to and use of Vilstay's website, booking platform, customer support, direct booking channels, and accommodation services.</p>
              <p className="mt-2">By accessing our website, making a reservation, communicating with Vilstay, or staying at a Vilstay or partner property, you agree to be bound by these Terms & Conditions, the Privacy Policy, the Cancellation & Refund Policy, and any property-specific rules.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">2. Company Information</h2>
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
              <h2 className="text-xl font-bold text-stone-900 mb-3">3. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vilstay</strong> means the hospitality brand operated by Adora Consultancy & Projects.</li>
                <li><strong>Company</strong> means Adora Consultancy & Projects.</li>
                <li><strong>Guest</strong> means the person making a booking and every person included in or staying under that booking.</li>
                <li><strong>Property</strong> means any hotel, resort, villa, homestay, apartment, serviced apartment, or other accommodation listed, managed, marketed, or booked through Vilstay.</li>
                <li><strong>Booking</strong> means a confirmed accommodation reservation.</li>
                <li><strong>Platform</strong> means the Vilstay website, booking page, mobile interface, social media booking channel, customer care, or other authorized booking channel.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">4. Eligibility to Book</h2>
              <p>A guest making a booking must be legally capable of entering into a contract and must provide accurate information. The person making the booking is responsible for all guests included in the reservation and for ensuring their compliance with these terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">5. Booking Confirmation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>A booking is confirmed only after successful payment, receipt of an advance, or written confirmation from Vilstay or the property.</li>
                <li>A booking enquiry, payment attempt, provisional hold, or verbal discussion does not by itself guarantee confirmation.</li>
                <li>Guests must verify the property name, room type, dates, number of guests, inclusions, and total amount shown in the confirmation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">6. Right to Refuse or Cancel a Booking</h2>
              <p>Vilstay may refuse, suspend, or cancel a booking in cases including suspected fraud, payment failure, incorrect pricing, technical error, duplicate reservation, property unavailability, unlawful purpose, guest misconduct, inaccurate information, or breach of these terms. Where appropriate, any eligible refund will be processed under the Cancellation & Refund Policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">7. Rates and Pricing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Rates may change based on season, demand, occupancy, room type, events, public holidays, promotional campaigns, and dynamic pricing.</li>
                <li>A displayed rate is not guaranteed until the booking is confirmed.</li>
                <li>Taxes, service charges, extra-person charges, deposits, meal charges, or other applicable fees may be added where disclosed.</li>
                <li>Obvious pricing or technical errors may be corrected even after a booking request is submitted.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">8. Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Payments may be accepted through UPI, debit card, credit card, net banking, payment gateway, bank transfer, wallet, cash, or another approved method. Bookings may remain unconfirmed until payment is verified.</li>
                <li>Guests must not use unauthorized, fraudulent, or disputed payment methods. Vilstay may request proof of payment or identity before confirming a booking.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">9. Check-in and Check-out</h2>
              <p>Unless otherwise specified by the property:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Standard Check-in:</strong> 1:00 PM</li>
                <li><strong>Standard Check-out:</strong> 11:00 AM</li>
              </ul>
              <p className="mt-2">Early check-in and late check-out are subject to availability and may involve additional charges. Continued occupation after check-out time may be charged as an additional night.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">10. Identification and Guest Registration</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All guests may be required to present valid government-issued photo identification at check-in.</li>
                <li>International guests may be required to provide passport, visa, and other details required by law.</li>
                <li>The property may refuse check-in if valid identification is not provided.</li>
                <li>The name on the booking should match the identification of the primary guest.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">11. Occupancy and Additional Guests</h2>
              <p>Room occupancy must not exceed the permitted number of guests. Additional guests, children, extra beds, or visitors may be subject to approval and extra charges. Undeclared guests may be refused entry or asked to leave.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">12. Guest Responsibilities</h2>
              <p>Guests agree to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Provide accurate booking and contact information</li>
                <li>Follow property rules, safety instructions, and local laws</li>
                <li>Respect staff, other guests, neighbors, and the local community</li>
                <li>Maintain cleanliness and use facilities responsibly</li>
                <li>Supervise children and dependent persons</li>
                <li>Avoid illegal, dangerous, disruptive, or nuisance-causing activity</li>
                <li>Pay all charges incurred during the stay</li>
                <li>Report damage, accidents, or safety concerns promptly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">13. Property Rules</h2>
              <p>Each property may apply additional rules regarding visitors, quiet hours, parking, smoking, pets, swimming pools, events, cooking, use of common areas, security deposits, and prohibited activities. Property-specific rules form part of these Terms & Conditions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">14. Prohibited Conduct</h2>
              <p>Guests must not use the property for illegal activity, unauthorized parties, commercial filming, nuisance, violence, harassment, possession of prohibited substances, damage, or any activity that threatens safety, security, reputation, or peaceful enjoyment.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">15. Damage, Loss, and Security Deposit</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Guests are responsible for damage, breakage, loss, theft, excessive cleaning, or misuse caused by them or their visitors.</li>
                <li>Repair, replacement, cleaning, or loss costs may be recovered from the guest.</li>
                <li>A refundable security deposit may be collected where required by the property.</li>
                <li>Refund of a security deposit may be withheld until inspection is completed and outstanding charges are settled.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">16. Personal Belongings</h2>
              <p>Guests are responsible for their personal belongings, valuables, vehicles, and documents. Vilstay and the property will not be liable for loss, theft, or damage except where liability cannot legally be excluded.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">17. Visitors</h2>
              <p>Visitors may be restricted or require registration, identification, and property approval. Guests are responsible for the behavior of their visitors. Visitors may not stay overnight without approval and payment of applicable charges.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">18. Children and Safety</h2>
              <p>Parents or guardians are responsible for children at all times, including in swimming pools, balconies, stairways, play areas, parking zones, and common spaces. Facilities must be used only under appropriate supervision.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">19. Special Requests</h2>
              <p>Special requests, including room location, view, floor, bed type, decoration, meals, accessibility, or early check-in, are subject to availability and are not guaranteed unless confirmed in writing.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">20. Booking Changes</h2>
              <p>Requests to change dates, guest names, stay duration, room type, or occupancy are subject to availability, applicable rate differences, property approval, and modification charges. Vilstay cannot guarantee that a requested change will be accepted.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">21. Cancellation, Refund, and No-Show</h2>
              <p>Cancellations, refunds, and no-show cases are governed by the separate Vilstay Cancellation & Refund Policy. Guests should review that policy before confirming a booking.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">22. Property Substitution or Relocation</h2>
              <p>In rare cases involving overbooking, emergency, maintenance, safety issues, or property unavailability, Vilstay may offer alternative accommodation of a reasonably comparable standard, rescheduling, or an eligible refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">23. Service Availability</h2>
              <p>Facilities such as Wi-Fi, electricity backup, hot water, swimming pool, television, air-conditioning, lift, parking, meals, and housekeeping may be temporarily unavailable due to maintenance, weather, utility failure, regulation, or circumstances beyond control. Reasonable efforts will be made to restore services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">24. Third-Party Services</h2>
              <p>Transport, food delivery, tours, activities, spa, salon, rentals, or other services provided by independent third parties are subject to their own terms. Vilstay is not responsible for third-party acts, omissions, pricing, safety, or service quality.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">25. Photos and Property Information</h2>
              <p>Vilstay makes reasonable efforts to present accurate descriptions and images. Minor differences may occur due to photography, lighting, furnishing changes, maintenance, seasonal conditions, or property updates. Such minor differences do not automatically entitle the guest to a refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">26. Complaints and Service Issues</h2>
              <p>Guests should report service issues during the stay so that the property or Vilstay has a reasonable opportunity to resolve them. Complaints raised only after check-out may be more difficult to verify.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">27. Privacy</h2>
              <p>Collection and use of personal information are governed by the separate Vilstay Privacy Policy, which forms part of these Terms & Conditions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">28. Intellectual Property</h2>
              <p>Vilstay's name, logo, website content, photographs, text, graphics, designs, software, and branding are owned by Adora Consultancy & Projects or used under licence. They may not be copied, reproduced, modified, published, or commercially used without written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">29. Fraud Prevention and Misuse</h2>
              <p>Vilstay may investigate suspected fraud, misuse, unauthorized transactions, fake bookings, chargeback abuse, false complaints, or manipulation of offers. Accounts, bookings, or access may be suspended or cancelled, and legal action may be taken where appropriate.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">30. Force Majeure</h2>
              <p>Vilstay and partner properties will not be liable for delay, cancellation, interruption, closure, or failure to provide services caused by events beyond reasonable control, including natural disasters, floods, landslides, fire, war, civil unrest, government orders, epidemics, pandemics, strikes, transportation disruption, utility failure, or network outage.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">31. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Vilstay will not be liable for indirect, incidental, special, punitive, or consequential loss arising from the use of the platform or a stay at a property. Where liability cannot be excluded, Vilstay's total liability relating to a booking will generally be limited to the amount paid for that booking.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">32. Indemnity</h2>
              <p>The guest agrees to compensate Vilstay, Adora Consultancy & Projects, and the relevant property for losses, claims, penalties, damages, or costs arising from the guest's unlawful conduct, breach of these terms, damage, misuse, or violation of third-party rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">33. Governing Law and Jurisdiction</h2>
              <p>These Terms & Conditions are governed by the laws of India. Any dispute arising from these terms or Vilstay services will be subject to the jurisdiction of the competent courts in Kozhikode, Kerala.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">34. Amendments</h2>
              <p>Vilstay may revise these Terms & Conditions at any time. The latest version published on the website or booking platform will apply to future use and future bookings.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">35. Severability</h2>
              <p>If any provision is found invalid or unenforceable, the remaining provisions will continue in effect.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 mb-3">36. Contact Information</h2>
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
              <h2 className="text-xl font-bold text-stone-900 mb-3">37. Acceptance</h2>
              <p>By accessing the Vilstay platform, making a booking, or using Vilstay services, you confirm that you have read, understood, and accepted these Terms & Conditions in full.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
