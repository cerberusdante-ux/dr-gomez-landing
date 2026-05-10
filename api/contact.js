import { Resend } from 'resend';

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, mensaje } = req.body;

  // Validación
  if (!nombre || !mensaje) {
    return res.status(400).json({ error: 'Nombre y mensaje son requeridos' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const resultado = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'drgomezuro82@gmail.com',
      subject: `Nueva consulta de ${nombre}`,
      html: `
        <h2>Nueva consulta desde Dr. Gómez Landing</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
        <p><em>Timestamp: ${new Date().toISOString()}</em></p>
        <hr>
        <p style="color: #666; font-size: 12px;">Este email fue enviado desde tu landing page.</p>
      `
    });

    return res.status(200).json({
      success: true,
      mensaje: 'Consulta recibida. Te responderé pronto.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({
      error: 'Error procesando tu consulta. Intenta de nuevo.',
      detalles: error.message
    });
  }
}
