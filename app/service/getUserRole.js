const userModel = require('../models/userModel');


async function getUserRole(req, res, next) {
  try {
    const userId = req.session.userId;
    const userRole = await userModel.findOne({_id: userId}).select({ role: 1 }).lean();

    if (!userRole || !userRole.role) {
      // Возвращаем альтернативное значение, например, 'Unknown', если роль не определена
      return 'Unknown';
    }

    return userRole.role;
  } catch(error) {
    // Обработка ошибки при запросе роли пользователя
    console.error('Error retrieving user role:', error);
    throw error; // Пробрасываем ошибку, чтобы она могла быть обработана в обработчике ошибок
  }
}

module.exports = getUserRole;

