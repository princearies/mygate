# Gambar Produk (Mockup)

Letak gambar mockup produk dalam folder ini.

## Cara guna
1. Nama fail mesti sama dengan nilai `image` dalam `src/data/products.ts`
   - Contoh: `image: '/products/aku-anak-brunei.png'` → fail: `public/products/aku-anak-brunei.png`
2. Format disyorkan: **PNG atau JPG**, saiz **1000×1250px** (nisbah 4:5)
3. Kalau gambar tiada, katalog akan tunjuk emoji fallback (tak rosak).

## Kenapa simpan sini?
Supaya gambar produk KEKAL dalam projek ini — bukan bergantung pada server platform jual.
Walaupun Redbubble / Etsy / Shopee tutup akaun, katalog awak tetap lengkap.

## Backup design asal
Simpan juga fail design asal (.xcf / .psd / .png resolusi tinggi) dalam folder
`designs/` di root projek, supaya boleh guna semula di platform baru.
