import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function TermsAndConditions({ showTerms, handleClose }) {

  return (
    <Modal show={showTerms} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className=' text-black'>
        <h6>1. Acceptance of Terms</h6>
        <p>Using this website constitutes full acceptance of the terms and conditions outlined below. If you do not agree to these terms, please do not use the website.</p>

        <h6>2. Use of the Website</h6>
        <p>The website is intended for personal and non-commercial use only. The use of the website's content and services is at the user's sole responsibility. It is prohibited to use the website for illegal or unauthorized purposes.</p>

        <h6>3. Account Creation</h6>
        <p>Users interested in accessing certain services on the website are required to register and create an account. You must provide accurate, current, and complete information during registration. You are solely responsible for maintaining the confidentiality of your login credentials.</p>

        <h6>4. User Content</h6>
        <p>The website allows users to upload content such as photos, texts, and travel plans. Uploading content that infringes copyrights, violates third-party rights, or contains offensive or illegal material is strictly prohibited.</p>

        <h6>5. Privacy</h6>
        <p>Any personal information you provide to the website will be used in accordance with our privacy policy. We are committed to protecting your privacy and will not share your information with third parties without your consent, except as outlined in the policy.</p>

        <h6>6. Limitation of Liability</h6>
        <p>The website provides information and tools for personal use only. We are not responsible for errors, inaccuracies, or damages resulting from using the website. Full responsibility for the use of the content and services lies with the user.</p>

        <h6>7. Changes to Terms</h6>
        <p>We reserve the right to change and update these terms at any time. The latest update date will be displayed at the top of the page. Continued use of the website constitutes acceptance of the updated terms.</p>

        <h6>8. Contact Us</h6>
        <p>For questions or inquiries, please contact us via email at <a href='mailto:yossefhorvitz@gmail.com'>yossefhorvitz@gmail.com</a> or through the contact form on the website.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>close</Button>
      </Modal.Footer>
    </Modal>
  )
}
