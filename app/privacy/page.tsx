import { FC } from 'react';
import { SiteFooter } from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata = {
    title: 'Privacy Policy - BeauraAI',
    description: 'Learn about how BeauraAI protects your privacy and handles your personal information.',
};

const PrivacyPolicyPage: FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1 container mx-auto px-10 py-12 md:py-24 lg:py-32">
                <h1 className="text-4xl font-extrabold mb-8 text-center">Privacy Policy</h1>
                <div className="prose max-w-none">
                    <p className="text-gray-600 text-sm text-right">Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At BeauraAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                    </p>
                    <h2 className="text-2xl font-bold mt-8">Information We Collect</h2>
                    <p>
                        We collect information that you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Personal information (e.g., name, email address)</li>
                        <li>Profile information (e.g., profile picture)</li>
                        <li>Usage data (e.g., AI transformations, style preferences)</li>
                        <li>Payment information (for paid plans)</li>
                    </ul>
                    <h2 className="text-2xl font-bold mt-8">How We Use Your Information</h2>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send you technical notices, updates, security alerts, and support messages</li>
                        <li>Respond to your comments, questions, and requests</li>
                        <li>Personalize and improve your experience</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                    </ul>
                    <h2 className="text-2xl font-bold mt-8">Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                    </p>
                    <h2 className="text-2xl font-bold mt-8">Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.
                    </p>
                    <h2 className="text-2xl font-bold mt-8">Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                    </p>
                    <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <p>
                        BeauraAI<br />
                        Email: <a href="mailto:privacy@beaura.ai" className="text-blue-600 underline">privacy@beaura.ai</a><br />
                        Address: 123 AI Street, Tech City, TC 12345
                    </p>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
};

export default PrivacyPolicyPage;
