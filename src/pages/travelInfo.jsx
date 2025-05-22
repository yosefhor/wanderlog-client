import React from 'react';

export default function TravelInfo() {
    return (
        <div className="container my-5">
            <header className="text-center mb-5">
                <h1 className="display-4">Explore the World</h1>
                <p className="lead">Your guide for smart, safe and fun travel.</p>
            </header>

            {/* Section: Travel Tips */}
            <div className="mb-5">
                <h2>Top Travel Tips</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Always carry a copy of your passport and travel insurance.
                    </li>
                    <li className="list-group-item">
                        Learn basic phrases in the local language.
                    </li>
                    <li className="list-group-item">
                        Use apps like Google Maps offline — download areas in advance.
                    </li>
                    <li className="list-group-item">
                        Carry a power bank and universal adapter.
                    </li>
                    <li className="list-group-item">
                        Respect local customs and dress codes.
                    </li>
                </ul>
            </div>

            {/* Section: Essential Links */}
            <div className="mb-5">
                <h2>Useful Travel Links</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer">
                            Booking.com – Hotels & Accommodations
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="https://www.skyscanner.com" target="_blank" rel="noopener noreferrer">
                            Skyscanner – Flights & Car Rentals
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer">
                            TripAdvisor – Reviews & Travel Forums
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="https://www.trailforks.com" target="_blank" rel="noopener noreferrer">
                            Trailforks – Hiking & Biking Maps
                        </a>
                    </li>
                    <li className="list-group-item">
                        <a href="https://www.nationalgeographic.com/travel/" target="_blank" rel="noopener noreferrer">
                            National Geographic Travel
                        </a>
                    </li>
                </ul>
            </div>

            {/* Section: Packing Essentials */}
            <div className="mb-5">
                <h2>Packing Checklist</h2>
                <p>Before you leave, make sure you pack these essentials:</p>
                <ul>
                    <li>Valid passport and visas</li>
                    <li>Travel insurance documents</li>
                    <li>Medication and prescriptions</li>
                    <li>First aid kit</li>
                    <li>Power bank and adapters</li>
                    <li>Reusable water bottle</li>
                    <li>Lightweight rain jacket</li>
                    <li>Comfortable walking shoes</li>
                </ul>
            </div>

            {/* Section: Safety Advice */}
            <div className="mb-5">
                <h2>Safety Advice</h2>
                <p>
                    Always research your destination beforehand. Register with your embassy when traveling internationally. Avoid walking alone at night, and keep your valuables secure at all times. Trust your instincts — if something feels off, walk away.
                </p>
            </div>
        </div>
    );
};