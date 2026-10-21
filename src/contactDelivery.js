export function isContactConfigured(config) {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}

export async function sendEnquiry(values, config, request = fetch) {
  if (!isContactConfigured(config)) throw new Error("not-configured");
  if (values.website) throw new Error("invalid-submission");
  if (
    !values.name?.trim() ||
    !values.message?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || "")
  ) {
    throw new Error("invalid-submission");
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await request(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          template_params: {
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone?.trim() || "Not provided",
            suburb: values.suburb?.trim() || "Not provided",
            service: values.service || "General enquiry",
            message: values.message.trim(),
          },
        }),
      },
    );
    if (!response.ok) throw new Error("delivery-failed");
  } finally {
    clearTimeout(timeout);
  }
}
