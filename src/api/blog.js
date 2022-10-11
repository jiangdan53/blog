import res from './res';
/**
 * 获取博客列表数据
 */
 export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
    return await res.get("/api/blog", {
      params: {
        page,
        limit,
        categoryid,
      },
    });
  }
  
  /**
   * 获取博客分类
   */
  export async function getBlogCategories() {
    return await res.get("/api/blogtype");
  }
  
  export async function getBlog(id) {
    return await res.get(`/api/blog/${id}`);
  }
  
  /**
   * 提交评论
   */
  export async function postComment(commentInfo) {
    return await res.post(`/api/comment`, commentInfo);
  }
  
  export async function getComments(blogid, page = 1, limit = 10) {
    return await res.get("/api/comment", {
      params: {
        blogid,
        page,
        limit,
      },
    });
  }