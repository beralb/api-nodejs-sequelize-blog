// module.exports = (sequelize, DataTypes) => {
//   const BlogPost = sequelize.define('BlogPost', {
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//     published: DataTypes.DATE,
//     updated: DataTypes.DATE,
//   }, {
//     tablename: 'blog_posts',
//     underscored: true,
//   });

//   BlogPost.associate = (models) => {
//     BlogPost.belongsTo(models.User, {
//       foreignKey: 'user_id',
//       as: 'users',
//     })
//   };

//   return BlogPost;
// };