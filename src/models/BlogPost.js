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
    published: {
      // field: created_at,
      type: DataTypes.DATE,      
    },
    updated: {
      // field: updated_at,
      type: DataTypes.DATE,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    // }
    userId: {
      type: DataTypes.INTEGER,
    }
  }, {
    tablename: 'blog_posts',
    underscored: true,
    // timestamps: false,
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