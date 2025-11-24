'use client';

import React from 'react';

interface TermsOfServiceModalProps {
    open: boolean;
    onClose: () => void;
}

export default function TermsOfServiceModal({
    open,
    onClose,
}: TermsOfServiceModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-xl p-6 relative">

                {/* Close Button */}
                <h1
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                    ✕
                </h1>

                <h1 className="text-3xl font-bold mb-4 text-center">
                    Terms of Service
                </h1>

                <p className="text-gray-500 text-center text-sm mb-6">
                    Last Updated: 11/23/2025
                </p>

                <div className="space-y-6 text-gray-800 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                        <p>
                            By creating an account or using the Board Bums website
                            ("the Service"), you agree to abide by these Terms of Service and
                            our Privacy Policy. If you do not agree, you may not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. Information You Provide</h2>
                        <p className="mb-2">
                            By creating an account, you may provide personal information such as:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Email address</li>
                            <li>Username</li>
                            <li>Location data</li>
                            <li>Profile details</li>
                            <li>Game library information</li>
                            <li>Reviews and public posts</li>
                        </ul>
                        <p className="mt-3">
                            You consent to Board Bums storing and displaying this information in
                            appropriate public areas of the site such as profiles, game pages, and
                            reviews.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Use of Personal Information</h2>
                        <p className="mb-2">
                            Your information is used for:
                        </p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Displaying user profiles and game collections</li>
                            <li>Publishing reviews and ratings</li>
                            <li>Improving platform functionality</li>
                            <li>Enabling communication features</li>
                        </ul>
                        <p className="mt-3">
                            <strong>Board Bums does not sell personal information to third-party vendors.</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. User Responsibilities</h2>
                        <p>You agree not to misuse the platform or submit harmful content. You are responsible for safeguarding your account credentials.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">5. Content Ownership & Licensing</h2>
                        <p>
                            You own the content you submit but grant Board Bums a
                            non-exclusive, royalty-free license to display and distribute your content
                            within the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">6. Service Availability</h2>
                        <p>
                            Board Bums may update or temporarily suspend portions of the Service
                            for maintenance or improvements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                        <p>
                            Board Bums may suspend or terminate your account if you violate these
                            Terms. You may delete your account at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
                        <p>
                            The Service is provided “as is.” Board Bums is not responsible for data
                            loss, service interruptions, or unauthorized access due to compromised
                            credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
                        <p>
                            Board Bums may update these Terms. Continued use of the Service
                            indicates acceptance of the updated Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
                        <p>
                            For questions: <strong>support@boardbums.com</strong>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
