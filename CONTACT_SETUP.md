# Activate contact enquiries

The contact page is at /#/contact. Phone, email and social links already work.
The form stays disabled until the three EmailJS public identifiers are configured.
No live emails have been sent or delivery verified yet.

## 1. Connect EmailJS

Create an account at https://dashboard.emailjs.com/ and choose a plan you approve.
In Email Services, connect the mailbox you want to send from using EmailJS's sign-in
flow. Do not paste your Gmail password into the website or this chat.
Save the service ID.

## 2. Create the main enquiry template

To Email: dnlprojects.nsw@gmail.com (fixed in the dashboard, not a visitor variable)
From Name: DNL Projects website
From Email: use the connected service's default address
Reply-To: {{email}}
Subject: Website enquiry — {{service}} — {{name}}

Body (plain text, or insert these as escaped text in the template editor):

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Suburb: {{suburb}}
Service: {{service}}

Message:
{{message}}

Save the template ID. Use escaped variables, not raw HTML interpolation.

## 3. Create and link the acknowledgement template

To Email: {{email}}
From Name: DNL Projects
From Email: use the connected service's default address
Reply-To: dnlprojects.nsw@gmail.com
Subject: Thanks for contacting DNL Projects

Hi {{name}},

Thank you for submitting your enquiry to DNL Projects.
This is an automatic acknowledgement, not a confirmation that your message has
been personally read or that a booking has been made.

We will review your enquiry and get back to you.
If you need to speak with us, call 0450 843 823.

Thanks,
DNL Projects
dnlprojects.nsw@gmail.com

In the MAIN template's Auto-Reply tab, select this acknowledgement template and
save. The website submits only the main template; EmailJS sends its linked reply.
Do not include the visitor's message in the reply, to avoid reflecting arbitrary
content to other email addresses. Each auto-reply consumes additional quota.
Check your chosen plan's current limits and monitor Email History.

## 4. Configure the website

Copy .env.example to .env.local in this project and fill in:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_main_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

Only these PUBLIC identifiers belong in Vite configuration. No private keys or
mailbox passwords. Restart the development server, and rebuild before deployment.
On a hosting service, configure the same variables in its build environment.

## 5. Verify before launch

- Confirm the main template recipient is fixed to dnlprojects.nsw@gmail.com.
- Confirm the auto-reply is linked before enabling the form.
- Configure the website origin allowlist if your plan supports it.
- Submit one test enquiry using an email address you control.
- Check that the enquiry arrives in your business inbox and the acknowledgement
  arrives in the test visitor's inbox, including spam folders.
- Use Reply in the business inbox and confirm it addresses the test visitor.
- Check both email records in EmailJS Email History. API acceptance does not prove
  inbox placement or personal reading.
- Check your provider's spam protection and quota controls before public launch.
  The form includes a honeypot and duplicate-submit protection; these are not
  substitutes for provider-side abuse controls. EmailJS supports reCAPTCHA v2 if
  stronger protection is needed; that requires additional widget integration.

If a request fails or times out, the form keeps the message and shows direct
contact alternatives. A timeout can happen after acceptance, so it asks visitors
to check their inbox before retrying. No failure acknowledgement is promised:
when the email service cannot send, it cannot reliably send an error email either.

Official references:

- https://www.emailjs.com/docs/rest-api/send/
- https://www.emailjs.com/docs/user-guide/auto-reply/
- https://www.emailjs.com/docs/tutorial/prepare-auto-reply-template/
