const handleControllerError = (res, error, status = 500) => {
    console.error(error);
    return res.status(status).json({
        error: "Lỗi bên phía server",
        message: error?.message || String(error)
    });
};

export default handleControllerError;
