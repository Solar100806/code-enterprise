<!-- export const getAllPosts = async (req, res) => {
    try {
        const { _limit, _sort, _order, _page } = req.query;

        const rawLimit = parseInt(_limit, 10);
        const limit =
            !Number.isNaN(rawLimit) && rawLimit > 0 ? rawLimit : undefined; // Nếu không có limit thì undefined

        const rawPage = parseInt(_page, 10);
        const page = !Number.isNaN(rawPage) && rawPage > 0 ? rawPage : 1; // Mặc định là trang 1

        let query = Post.find();

        if (_sort) {
            const order = String(_order || "asc").toLowerCase() === "desc" ? -1 : 1;
            query = query.sort({ [_sort]: order });
        }

        if (limit) {
            query = query.limit(limit);
            query = query.skip((page - 1) * limit);

            const [posts, totalItems] = await Promise.all([
                query.exec(),
                Post.countDocuments(),
            ]);

            const totalPages = Math.ceil(totalItems / limit);

            return res.json({
                data: posts,
                pagination: {
                    page,
                    limit,
                    totalPages,
                    totalItems,
                },
            });
        }

        const posts = await query.exec();
        return res.json(posts);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Lỗi bên phía server", message: error.message });
    }
}; -->
