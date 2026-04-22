# Deploy GitHub + Vercel

Project này là **TanStack Start**, nên không thiếu HTML. HTML sẽ được tạo ra khi build và export static.

## Cách deploy nhanh

1. Đẩy toàn bộ project này lên GitHub.
2. Import repo vào Vercel.
3. Vercel sẽ tự đọc file `vercel.json`.
4. Build command dùng sẵn: `npm run build:vercel`.
5. Thư mục output: `dist-static`.

## Domain riêng

Sau khi deploy xong trên Vercel:

1. Vào **Project Settings → Domains** trên Vercel.
2. Thêm domain bạn muốn dùng.
3. Trỏ DNS theo hướng dẫn của Vercel tại nhà cung cấp tên miền.
4. Khi DNS cập nhật xong, website sẽ chạy bằng domain riêng.

## Ghi chú

- Các route hiện đã được export tĩnh sẵn: `/`, `/crisis`, `/solutions`, `/action`.
- File `404.html` đã được tạo để hosting tĩnh xử lý trang không tồn tại.
- Nếu bạn muốn kiểm tra local sau khi build, chạy:

```bash
npm run build:vercel
npx serve dist-static
```