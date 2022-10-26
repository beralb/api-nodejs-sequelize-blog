module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {
    tablename: 'blog_posts',
    underscored: true,

  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      // foreignKey: 'userId',
      foreignKey: 'user_id',
      as: 'users',
    })
    BlogPost.hasMany(models.PostCategory, {
      // foreignKey: 'postId',
      foreignKey: 'post_id',
      as: 'post_categories',
    })

  };

  return BlogPost;
};