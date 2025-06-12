function contactForm(value) {
    
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
      <h2 style="color: #333;">📩 Nouveau message de : ${value.name}</h2>
      <p><strong>Email :</strong> ${value.email}</p>
      <p><strong>Objet :</strong> ${value.subject}</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #ccc;">
        <p style="white-space: pre-wrap;">${value.message}</p>
      </div>
      <p style="font-size: 12px; color: #777; margin-top: 30px;">
        Ce message a été envoyé depuis le formulaire de contact du site.
      </p>
    </div>
  `;
};

export default contactForm;