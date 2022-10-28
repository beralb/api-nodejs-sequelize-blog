module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    // post_id: {
      postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // category_id: {
      categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'category_id',
      otherKey: 'post_id',
      // as: 'blogPosts',
      // foreignKey: 'categoryId',
      // otherKey: 'postId',
      through: PostCategory,
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      // as: 'categories',
      // foreignKey: 'postId',
      // otherKey: 'categoryId',
      through: PostCategory,
    });
  }

  return PostCategory;
}