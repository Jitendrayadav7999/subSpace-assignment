const {
  size,
  find,
  includes,
  lowerCase,
  uniqBy,
  isEqual,
  memoize,
} = require("lodash");

const blogStats = memoize((req, res) => {
  try {
    const { data } = req;
    const blogs = data.blogs;
    let titleSize = 0;
    let blogWithLongestTitle = null;
    let blogsWithPrivacyInTheTitle = 0;
    find(blogs, (blog) => {
      const newTitleSize = size(blog.title);
      if (titleSize < newTitleSize) {
        blogWithLongestTitle = blog.title;
        titleSize = newTitleSize;
      }
      if (includes(lowerCase(blog.title), "privacy")) {
        blogsWithPrivacyInTheTitle = blogsWithPrivacyInTheTitle + 1;
      }
    });
    const uniqBlogWithTitle = uniqBy(blogs, (blog) => lowerCase(blog.title));

    res.status(200).json({
      totalNumberOfBlogs: size(blogs),
      titleOfTheLongestBlog: blogWithLongestTitle,
      numberOfBlogsWithPrivacyInTheTitle: blogsWithPrivacyInTheTitle,
      uniqueBlogTitles: uniqBlogWithTitle,
    });
  } catch (error) {
    console.log("error = ===>", error);
    res.status(500).send({ status: false, error: error.message });
  }
});

const blogSearch =  (req, res) => {
  try {
    const { data } = req;
    const { query } = req.query;
    console.log(query);
    const searchBlogs = [];
    const blogs = data.blogs;
    find(blogs, (blog) => {
      if (includes(lowerCase(blog.title), lowerCase(query))) {
        searchBlogs.push(blog);
      }
    });
    res.status(200).json({
      data: searchBlogs,
    });
  } catch (error) {
    console.log("error = ===>", error);
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { blogStats, blogSearch };
