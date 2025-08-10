import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

export default function AppNavbar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expanded={expanded} expand="lg" bg="light" className="border-bottom border-2 border-black">
            <Container>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : 'expanded')}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to="/dashboard">
                            <Nav.Link onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/TravelInfo">
                            <Nav.Link onClick={() => setExpanded(false)}>Travel Info</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/travelDestinations">
                            <Nav.Link onClick={() => setExpanded(false)}>Travel Destinations</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
