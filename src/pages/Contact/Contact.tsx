import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../../components/ContactForm/ContactForm';
import GoogleSearch from '../../components/GoogleSearch/GoogleSearch';
import {
  AdditionalWrapper,
  ContactContainer,
  ContactTitel,
  WrapperInfo,
  SocialContainerLink,
  TextContact,
  EmailSocialLink,
  LocationContainer,
  LocationLink,
} from './Contact.styled';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta
          name="description"
          content="Contact Pavlo Troph — inquiries, collaborations, and freelance/studio opportunities."
        />
      </Helmet>
      
      <AdditionalWrapper>
        <ContactContainer>
          <h1>Contact</h1>
          <GoogleSearch />
          <ContactTitel as="h2">Let's Talk</ContactTitel>
          <WrapperInfo>
            <SocialContainerLink>
              <TextContact>Contact</TextContact>
              <EmailSocialLink href="mailto:info@pavlotroph.com" aria-label="Send email to info@pavlotroph.com">
                info@pavlotroph.com
              </EmailSocialLink>
              <EmailSocialLink href="https://www.linkedin.com/in/pavlo-trofimenko/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                LinkedIn
              </EmailSocialLink>
              <EmailSocialLink href="https://t.me/pavlotroph" target="_blank" rel="noopener noreferrer" aria-label="Contact on Telegram">
                Telegram
              </EmailSocialLink>
              <EmailSocialLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram profile">
                Instagram
              </EmailSocialLink>
            </SocialContainerLink>
            <LocationContainer>
              <TextContact>Location</TextContact>
              <LocationLink
                href="https://maps.app.goo.gl/b7UCDY41c7FuzzFC6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Toronto, ON, CA
              </LocationLink>
            </LocationContainer>
          </WrapperInfo>
          <ContactForm />
        </ContactContainer>
      </AdditionalWrapper>
    </>
  );
};

export default Contact;
