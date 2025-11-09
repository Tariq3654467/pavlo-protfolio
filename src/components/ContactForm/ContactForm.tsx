import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Button,
  FormContainer,
  FormGroup,
  Input,
  Success,
  Textarea,
} from './ContactForm.styled';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (!fullName || !email || !validateEmail(email)) {
      setError('Please fill out the required fields correctly.');
      return;
    }

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          full_name: fullName,
          email: email,
          subject: subject,
          message: message,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setError(null);
      setSubmitted(false);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      setSuccess(false);
    }
  };

  return (
    <FormContainer>
      {success && <Success>Your message has been sent successfully!</Success>}
      <form onSubmit={handleSubmit} id="contactus" aria-label="Contact form">
        <FormGroup>
          <label htmlFor="fullName" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            Full Name
          </label>
          <Input
            placeholder="Full Name (required)"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            $hasError={submitted && !fullName}
            id="fullName"
            name="fullName"
            required
            aria-required="true"
            aria-invalid={submitted && !fullName}
            aria-describedby={submitted && !fullName ? "fullName-error" : undefined}
          />
          {submitted && !fullName && (
            <span id="fullName-error" style={{ color: '#ff4444', fontSize: '12px', display: 'block', marginTop: '4px' }} role="alert">
              Full name is required
            </span>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Email (required)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            $hasError={submitted && (!email || !validateEmail(email))}
            id="email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={submitted && (!email || !validateEmail(email))}
            aria-describedby={submitted && (!email || !validateEmail(email)) ? "email-error" : undefined}
          />
          {submitted && (!email || !validateEmail(email)) && (
            <span id="email-error" style={{ color: '#ff4444', fontSize: '12px', display: 'block', marginTop: '4px' }} role="alert">
              Valid email is required
            </span>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor="subject" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            Subject
          </label>
          <Input
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            id="subject"
            name="subject"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="message" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            Message
          </label>
          <Textarea
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            id="message"
            name="message"
          />
        </FormGroup>
        <Button type="submit" aria-label="Submit contact form">Send a Message</Button>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
