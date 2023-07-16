const userModel = require('../models/userModel');

async function getUserName(req, res, next) {
    try {
      const userId = req.session.userId;
      const user = await userModel.findOne({_id: userId}).select({ firstName:1 }).lean();
      
      if (!user || !user.firstName) {
        // Возвращаем альтернативное значение, например, 'Unknown', если имя пользователя не определено
        return 'Unknown';
      }
      
      const username = user.firstName;
      return username;
    } catch(error) {
      // Обработка ошибки при запросе имени пользователя
      console.error('Error retrieving user name:', error);
      throw error; // Пробрасываем ошибку, чтобы она могла быть обработана в обработчике ошибок
    }
  }
  
  module.exports = getUserName;
  