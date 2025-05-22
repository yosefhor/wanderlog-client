import React from 'react';
import { Card, Button } from 'react-bootstrap';
import italy from '../italy.webp';
import japan from '../japan.webp';
import iceland from '../iceland.webp';

export default function TravelDestinations() {
    const destinations = [
        {
            name: 'Iceland',
            img: iceland,
            description: 'Explore waterfalls, glaciers and volcanoes in a land of fire and ice.',
            link: 'https://visiticeland.com',
        },
        {
            name: 'Japan',
            img: japan,
            description: 'A unique mix of tradition, temples, and futuristic cities.',
            link: 'https://www.japan.travel/en/',
        },
        {
            name: 'Italy',
            img: italy,
            description: 'Art, culture, and cuisine in the heart of Europe.',
            link: 'https://www.italia.it/en',
        },
    ];

    return (
        <div className="container my-5">
            <h2 className="mb-4">Top Travel Destinations</h2>
            <div className="row">
                {destinations.map((place, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={place.img} alt={place.name} />
                            <Card.Body>
                                <Card.Title>{place.name}</Card.Title>
                                <Card.Text>{place.description}</Card.Text>
                                <Button
                                    variant="primary"
                                    href={place.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn More
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};