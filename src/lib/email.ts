import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport ({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, //Solamente de ser true, cuando es para el puerto 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

//funcion para enviar correos
export const sendAppointmentEmailToLawyer = async  (
    lawyerEmail: string,
    customername: string,
    appointmentDate: string,
    appointmentTime: string,
    customerEmail: string
) => {
    try 
    {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: lawyerEmail,
            subject: `Nueva cita agendada - ${customername}`,
            html: `
                <h2>Nueva Cita Agendada</h2>
                <p>
                    <strong>
                        Cliente:
                    </strong>
                    ${customername}
                </p>            
                <p>
                    <strong>
                        Email del Cliente:
                    </strong>
                    ${customerEmail}
                </p>  
                <p>
                    <strong>
                        Fecha de la Cita:
                    </strong>
                    ${appointmentDate}
                </p>         
                <p>
                    <strong>
                        Hora de la Cita:
                    </strong>
                    ${appointmentTime}
                </p>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', result);
        return result;

    }catch(error)
    {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error('Error al enviar el correo:', errorMsg);
        throw error;
    }
};