

const getMenuFrontEnd = (role = 'USER_ROLE') => {
    let menu;
  
    if (role === 'ADMIN_ROLE') {
      menu = [
        {
          titulo: 'Achecars',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Sobre nosotros', url: '/' },
            { titulo: 'Redes Sociales', url: 'redes-sociales' },
            { titulo: 'Cita', url: 'cita' },
            { titulo: 'Grafica', url: 'grafica' },
            { titulo: 'ProgressBar', url: 'progress' },
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Citas', url: 'citas' },
          ]
        },
      ];
    } else {
      menu = [
        {
          titulo: 'Achecars',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Sobre nosotros', url: '/' },
            { titulo: 'Redes Sociales', url: 'redes-sociales' },
            { titulo: 'Cita', url: 'cita' },
            { titulo: 'Grafica', url: 'grafica' },
            { titulo: 'ProgressBar', url: 'progress' },
          ]
        },
      ];
    }
  
    return menu;
}

module.exports = {
    getMenuFrontEnd
}