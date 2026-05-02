/**
 * API Serverless Vercel - Envío de emails desde formulario
 * Archivo: api/contact.js
 * 
 * Uso en formulario:
 * fetch('/api/contact', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ nombre, mensaje })
 * })
 */

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

  // Sanitización básica
  const nombreLimpio = nombre.substring(0, 100).trim();
  const mensajeLimpio = mensaje.substring(0, 5000).trim();

  try {
    // OPCIÓN 1: Usar Resend (recomendado, gratuito hasta 100 emails/día)
    // Instalar: npm install resend
    // Requerir API key en variables de entorno: RESEND_API_KEY
    
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const resultado = await resend.emails.send({
      from: 'noreply@dr-doodle.com',
      to: 'drgomezuro82@gmail.com',
      subject: `Nueva consulta de ${nombreLimpio}`,
      html: `
        <h2>Nueva consulta desde Dr. Doodle Landing</h2>
        <p><strong>Nombre:</strong> ${nombreLimpio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensajeLimpio.replace(/\n/g, '<br>')}</p>
        <p><em>Timestamp: ${new Date().toISOString()}</em></p>
      `
    });
    */

    // OPCIÓN 2: Usar SendGrid (alternativa)
    // OPCIÓN 3: Usar Mailgun (alternativa)
    
    // Por ahora, retornamos éxito simulado
    // En producción, descomentar una de las opciones arriba
    
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
