const crypto = require('crypto');
const User = require('../models/User');
const { sendResetPasswordEmail } = require('../services/emailService');
const Response = require('../utils/responseHandler');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return Response.error(res, 'Email bắt buộc', 400);

        const user = await User.findOne({ email });
        if (!user) return Response.error(res, 'Không tìm thấy user với email này', 404);

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 giờ
        await user.save();

        await sendResetPasswordEmail(email, token);
        return Response.success(res, null, 'Đã gửi email đặt lại mật khẩu');
    } catch (err) {
        console.error(err);
        return Response.error(res, 'Lỗi server', 500);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return Response.error(res, 'Token và mật khẩu mới bắt buộc', 400);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return Response.error(res, 'Token không hợp lệ hoặc đã hết hạn', 400);

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return Response.success(res, null, 'Đặt lại mật khẩu thành công');
    } catch (err) {
        console.error(err);
        return Response.error(res, 'Lỗi server', 500);
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        // req.user phải có (middleware auth phải đặt req.user)
        if (!req.user || !req.user.id) return Response.error(res, 'Unauthorized', 401);
        if (!req.file) return Response.error(res, 'Chưa có file upload', 400);

        const user = await User.findById(req.user.id);
        if (!user) return Response.error(res, 'User không tồn tại', 404);

        // lưu đường dẫn relative để serve static /uploads
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        return Response.success(res, { avatar: user.avatar }, 'Upload avatar thành công');
    } catch (err) {
        console.error(err);
        return Response.error(res, 'Lỗi upload', 500);
    }
};