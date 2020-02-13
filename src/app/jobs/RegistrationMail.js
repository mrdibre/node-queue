import Mail from "../../lib/Mail"

export default {
  key: 'RegistrationMail',
  async handle({ data }) {

    const { user } = data

    await Mail.sendMail({
      from: 'César Felipe <cesar.felp982@gmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas da DibreSeat :D`,
    })
  },
}