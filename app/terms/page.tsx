import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"

export const metadata = {
    title: 'Terms of Service - BeauraAI',
    description: 'Read the terms and conditions for using BeauraAI services.',
}

export default function TermsOfServicePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SiteHeader />
            <main className="flex-1 container mx-auto px-4 py-12 md:py-24 lg:py-32">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Terms of Service</h1>
                <div className="prose prose-lg max-w-none mx-auto p-8  rounded-lg">
                    <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        Welcome to BeauraAI. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these Terms of Service carefully before using BeauraAI.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using BeauraAI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">2. Use of Services</h2>
                    <p>
                        You may use BeauraAI for lawful purposes only. You agree not to:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Use the service to violate any law or regulation</li>
                        <li>Infringe on the rights of others</li>
                        <li>Transmit any harmful or malicious code</li>
                        <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                        <li>Use the service in any way that could damage or impair its functionality</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-800">3. User Accounts</h2>
                    <p>
                        To access certain features of BeauraAI, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">4. Intellectual Property</h2>
                    <p>
                        The content, features, and functionality of BeauraAI are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">5. Payment and Subscription</h2>
                    <p>
                        Certain features of BeauraAI may require payment. By subscribing to a paid plan, you agree to pay all fees associated with the plan. We reserve the right to change our prices at any time.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">6. Limitation of Liability</h2>
                    <p>
                        BeauraAI and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">7. Modifications to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes. Your continued use of BeauraAI after changes are posted constitutes your acceptance of the modified terms.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">8. Termination</h2>
                    <p>
                        We may terminate or suspend your account and access to BeauraAI at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">9. Governing Law</h2>
                    <p>
                        These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">10. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <p>
                        BeauraAI<br />
                        Email: <a href="mailto:legal@beaura.ai" className="text-blue-600">legal@beaura.ai</a><br />
                        Address: 123 AI Street, Tech City, TC 12345
                    </p>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
