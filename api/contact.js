/**
 * API Serverless Vercel - Envío de emails desde formulario
 * VERSIÓN SIMPLIFICADA (sin Resend por ahora)
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

  try {
    // Por ahora: respuesta exitosa simulada
    // Los emails se activan después
    
    return res.status(200).json({
      success: true,
      mensaje: 'Consulta recibida. Te responderé pronto por WhatsApp.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Error procesando tu consulta. Intenta de nuevo.',
      detalles: error.message
    });
  }
}
